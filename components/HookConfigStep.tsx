
import React from 'react';
import { TokenConfig, TimeUnit } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';

interface HookConfigStepProps {
  config: TokenConfig;
  updateConfig: (newConfig: Partial<TokenConfig>) => void;
  onBack: () => void;
  onNext: () => void;
}

const HookConfigStep: React.FC<HookConfigStepProps> = ({ config, updateConfig, onBack, onNext }) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-2">Step 2: Configure Transfer Hook</h2>
      <p className="text-center text-gray-400 mb-8">Define the rules for your token's resale time-lock and royalty fees.</p>

      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <label htmlFor="hook-enabled" className="font-medium text-lg text-white">Enable Transfer Hook</label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
                {/* FIX: Replaced style jsx with Tailwind CSS for toggle switch */}
                <input
                    type="checkbox"
                    name="hook-enabled"
                    id="hook-enabled"
                    checked={config.hookEnabled}
                    onChange={(e) => updateConfig({ hookEnabled: e.target.checked })}
                    className="peer absolute block w-7 h-7 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer left-0 transition-transform duration-200 ease-in checked:border-indigo-600 checked:translate-x-5"
                />
                <label htmlFor="hook-enabled" className="block overflow-hidden h-7 rounded-full bg-gray-600 cursor-pointer peer-checked:bg-indigo-600"></label>
            </div>
          </div>
        </div>

        {config.hookEnabled && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label htmlFor="royalty" className="block text-sm font-medium text-gray-300 mb-2">Royalty Fee on Resale (%)</label>
              <div className="relative">
                <Input
                  id="royalty"
                  type="number"
                  value={config.royaltyPercentage}
                  onChange={(e) => updateConfig({ royaltyPercentage: parseFloat(e.target.value) || 0 })}
                  min={0}
                  max={100}
                  className="pl-8"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 sm:text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">A percentage of each transfer amount sent to the treasury.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Resale Time-Lock</label>
              <div className="flex items-center gap-2">
                {/* FIX: Added required 'id' prop to Input component */}
                <Input
                  id="time-lock-value"
                  type="number"
                  value={config.timeLockValue}
                  onChange={(e) => updateConfig({ timeLockValue: parseInt(e.target.value, 10) || 0 })}
                  min={1}
                  className="w-1/2"
                />
                <select
                  value={config.timeLockUnit}
                  onChange={(e) => updateConfig({ timeLockUnit: e.target.value as TimeUnit })}
                  className="w-1/2 block bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value={TimeUnit.Minutes}>Minutes</option>
                  <option value={TimeUnit.Hours}>Hours</option>
                  <option value={TimeUnit.Days}>Days</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">Prevent token transfers for a set period after they are received.</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={onBack} variant="secondary">Back</Button>
        <Button onClick={onNext}>Next: Review</Button>
      </div>
    </Card>
  );
};

export default HookConfigStep;
