
export enum TimeUnit {
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
}

export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  icon: File | null;
  iconPreview: string | null;
  hookEnabled: boolean;
  royaltyPercentage: number;
  timeLockValue: number;
  timeLockUnit: TimeUnit;
}

export interface GeneratedCode {
  libRs: string;
  cargoToml: string;
  deploymentSteps: string;
}
