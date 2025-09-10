
import React from 'react';
import { TokenConfig } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Spinner from './ui/Spinner';

interface ReviewStepProps {
  config: TokenConfig;
  onBack: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ReviewItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-700">
        <dt className="text-gray-400">{label}</dt>
        <dd className="text-white font-medium text-right">{value}</dd>
    </div>
);


const ReviewStep: React.FC<ReviewStepProps> = ({ config, onBack, onGenerate, isLoading }) => {
  return (
    <Card>
        <h2 className="text-2xl font-bold text-center mb-2">Step 3: Review & Generate</h2>
        <p className="text-center text-gray-400 mb-8">Confirm your token and hook configuration. If everything is correct, generate the code.</p>

        <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-300 border-b border-purple-800 pb-2">Token Details</h3>
            <dl className="space-y-3">
                <ReviewItem label="Token Name" value={config.name} />
                <ReviewItem label="Symbol" value={config.symbol} />
                <ReviewItem label="Decimals" value={config.decimals} />
                <ReviewItem label="Total Supply" value={config.supply.toLocaleString()} />
                <ReviewItem label="Icon" value={config.icon ? 
                    <img src={config.iconPreview!} alt="icon" className="h-8 w-8 rounded-full inline-block"/> : 
                    <span className="text-gray-500">Not set</span>} 
                />
            </dl>

            <h3 className="text-lg font-semibold mb-4 mt-8 text-pink-300 border-b border-pink-800 pb-2">Transfer Hook Details</h3>
            {config.hookEnabled ? (
                <dl className="space-y-3">
                    <ReviewItem label="Status" value={<span className="text-green-400">Enabled</span>} />
                    <ReviewItem label="Royalty Fee" value={`${config.royaltyPercentage}%`} />
                    <ReviewItem 
                        label="Resale Time-Lock" 
                        value={`${config.timeLockValue} ${config.timeLockUnit}`} 
                    />
                </dl>
            ) : (
                <p className="text-gray-400">Transfer hook is disabled.</p>
            )}
        </div>

        <div className="mt-8 flex justify-between items-center">
            <Button onClick={onBack} variant="secondary" disabled={isLoading}>Back</Button>
            <Button onClick={onGenerate} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Spinner />
                        Generating Code...
                    </>
                ) : (
                    'Generate Smart Contract'
                )}
            </Button>
      </div>
    </Card>
  );
};

export default ReviewStep;
