
import React, { useState } from 'react';
import { GeneratedCode } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import CopyIcon from './icons/CopyIcon';

interface CodeBlockProps {
    title: string;
    language: string;
    code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, language, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-900 rounded-lg my-4">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-t-lg">
                <h4 className="font-mono text-sm text-purple-300">{title}</h4>
                <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <CopyIcon className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
                <code className={`language-${language} font-mono`}>{code}</code>
            </pre>
        </div>
    );
};

const InstructionsBlock: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="prose prose-invert prose-sm max-w-none bg-gray-900 rounded-lg p-6 my-4 border border-gray-700"
             dangerouslySetInnerHTML={{ __html: content.replace(/- /g, '<br/>- ').replace(/\n/g, '<br />') }}>
        </div>
    );
};


interface GeneratedCodeStepProps {
  code: GeneratedCode | null;
  onReset: () => void;
}

const GeneratedCodeStep: React.FC<GeneratedCodeStepProps> = ({ code, onReset }) => {
  if (!code) {
    return (
        <Card>
            <div className="text-center">
                <h2 className="text-xl font-bold">No code generated.</h2>
                <p className="text-gray-400 mt-2">There was an issue generating the code. Please go back and try again.</p>
                <Button onClick={onReset} className="mt-6">Start Over</Button>
            </div>
        </Card>
    );
  }

  const [activeTab, setActiveTab] = useState('lib.rs');

  return (
    <Card>
        <h2 className="text-2xl font-bold text-center mb-2">Generation Complete!</h2>
        <p className="text-center text-gray-400 mb-8">Your Solana smart contract code and deployment steps are ready.</p>

        <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button onClick={() => setActiveTab('lib.rs')} className={`${activeTab === 'lib.rs' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                    lib.rs
                </button>
                <button onClick={() => setActiveTab('Cargo.toml')} className={`${activeTab === 'Cargo.toml' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                    Cargo.toml
                </button>
                 <button onClick={() => setActiveTab('deployment')} className={`${activeTab === 'deployment' ? 'border-purple-400 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}>
                    Deployment
                </button>
            </nav>
        </div>
        
        <div className="mt-4">
            {activeTab === 'lib.rs' && <CodeBlock title="lib.rs" language="rust" code={code.libRs} />}
            {activeTab === 'Cargo.toml' && <CodeBlock title="Cargo.toml" language="toml" code={code.cargoToml} />}
            {activeTab === 'deployment' && <InstructionsBlock content={code.deploymentSteps} />}
        </div>
        
        <div className="mt-8 text-center">
            <Button onClick={onReset} variant="secondary">Create Another Token</Button>
        </div>
    </Card>
  );
};

export default GeneratedCodeStep;
