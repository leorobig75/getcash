
import React from 'react';
import { TokenConfig } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

interface TokenDetailsStepProps {
  config: TokenConfig;
  updateConfig: (newConfig: Partial<TokenConfig>) => void;
  onNext: () => void;
}

const TokenDetailsStep: React.FC<TokenDetailsStepProps> = ({ config, updateConfig, onNext }) => {
  
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig({ icon: file, iconPreview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
        <h2 className="text-2xl font-bold text-center mb-2">Step 1: Define Your Token</h2>
        <p className="text-center text-gray-400 mb-8">Start by providing the basic details for your new Solana token.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
                label="Token Name"
                id="token-name"
                value={config.name}
                onChange={(e) => updateConfig({ name: e.target.value })}
                placeholder="e.g., My Awesome Token"
            />
            <Input
                label="Token Symbol"
                id="token-symbol"
                value={config.symbol}
                onChange={(e) => updateConfig({ symbol: e.target.value })}
                placeholder="e.g., MAT"
                maxLength={10}
            />
            <Input
                label="Decimals"
                id="token-decimals"
                type="number"
                value={config.decimals}
                onChange={(e) => updateConfig({ decimals: parseInt(e.target.value, 10) || 0 })}
                min={0}
                max={18}
            />
            <Input
                label="Total Supply"
                id="token-supply"
                type="number"
                value={config.supply}
                onChange={(e) => updateConfig({ supply: parseInt(e.target.value, 10) || 0 })}
                min={1}
            />
        </div>

        <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Token Icon (Optional)</label>
            <div className="mt-2 flex items-center gap-4">
                {config.iconPreview ? (
                    <img src={config.iconPreview} alt="Icon Preview" className="h-16 w-16 rounded-full object-cover" />
                ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                <input id="token-icon" type="file" accept="image/png, image/jpeg, image/svg+xml" onChange={handleIconChange} className="hidden" />
                <label htmlFor="token-icon" className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
                    Upload Image
                </label>
            </div>
        </div>
        
        <div className="mt-8 flex justify-end">
            <Button onClick={onNext}>
                Next: Configure Hook
            </Button>
        </div>
    </Card>
  );
};

export default TokenDetailsStep;
