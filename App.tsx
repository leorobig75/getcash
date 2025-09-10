
import React, { useState } from 'react';
import { TokenConfig, GeneratedCode, TimeUnit } from './types';
import { generateSolanaHookCode } from './services/geminiService';

import TokenDetailsStep from './components/TokenDetailsStep';
import HookConfigStep from './components/HookConfigStep';
import ReviewStep from './components/ReviewStep';
import GeneratedCodeStep from './components/GeneratedCodeStep';
import SolanaIcon from './components/icons/SolanaIcon';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);

  const [tokenConfig, setTokenConfig] = useState<TokenConfig>({
    name: 'My Solana Token',
    symbol: 'MST',
    decimals: 9,
    supply: 1000000,
    icon: null,
    iconPreview: null,
    hookEnabled: true,
    royaltyPercentage: 5,
    timeLockValue: 24,
    timeLockUnit: TimeUnit.Hours,
  });

  const updateConfig = (newConfig: Partial<TokenConfig>) => {
    setTokenConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleGenerateCode = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedCode(null);
    try {
      const code = await generateSolanaHookCode(tokenConfig);
      setGeneratedCode(code);
      setCurrentStep(4);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred while generating the code.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(1);
    setGeneratedCode(null);
    setError(null);
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TokenDetailsStep
            config={tokenConfig}
            updateConfig={updateConfig}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <HookConfigStep
            config={tokenConfig}
            updateConfig={updateConfig}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <ReviewStep
            config={tokenConfig}
            onBack={() => setCurrentStep(2)}
            onGenerate={handleGenerateCode}
            isLoading={isLoading}
          />
        );
      case 4:
        return <GeneratedCodeStep code={generatedCode} onReset={reset} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
             <SolanaIcon className="h-12 w-12" />
             <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Solana Token Hook Generator
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create a Solana token with a custom resale time-lock transfer hook. Define your token, configure the rules, and let AI generate the smart contract for you.
          </p>
        </header>
        
        <main>
            {renderStep()}
            {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini API. Generated code is for educational purposes and should be audited before production use.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
