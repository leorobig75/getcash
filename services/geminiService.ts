
import { GoogleGenAI } from "@google/genai";
import { TokenConfig, GeneratedCode } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function parseGeneratedCode(rawText: string): GeneratedCode {
  const libRsMatch = rawText.match(/```rust\n\/\/ lib.rs([\s\S]*?)```/);
  const cargoTomlMatch = rawText.match(/```toml\n# Cargo.toml([\s\S]*?)```/);
  const deploymentStepsMatch = rawText.match(/### Deployment and Usage Instructions([\s\S]*)/);

  const libRs = libRsMatch ? libRsMatch[1].trim() : "Could not parse lib.rs";
  const cargoToml = cargoTomlMatch ? cargoTomlMatch[1].trim() : "Could not parse Cargo.toml";
  const deploymentSteps = deploymentStepsMatch ? deploymentStepsMatch[1].trim() : "Could not parse deployment steps.";

  return { libRs, cargoToml, deploymentSteps };
}

export const generateSolanaHookCode = async (config: TokenConfig): Promise<GeneratedCode> => {
  const timeLockSeconds = config.timeLockValue * (
    config.timeLockUnit === 'days' ? 86400 :
    config.timeLockUnit === 'hours' ? 3600 : 60
  );

  const prompt = `
You are an expert Solana smart contract developer specializing in the Anchor framework.
Your task is to generate a complete Anchor program for a Solana 'Transfer Hook' and provide deployment instructions.

**User Requirements:**

*   **Token Name:** ${config.name}
*   **Token Symbol:** ${config.symbol}
*   **Royalty Fee:** A ${config.royaltyPercentage}% royalty fee on every transfer, sent to a predefined authority wallet.
*   **Resale Time-Lock:** A transfer is blocked if it occurs within ${config.timeLockValue} ${config.timeLockUnit} (${timeLockSeconds} seconds) of the previous transfer for the token account.

**Instructions:**

1.  **Generate 'lib.rs':** Write the complete Rust code for the 'lib.rs' file of an Anchor program.
    *   The program must implement a 'transfer_hook' instruction.
    *   The hook logic should enforce both the royalty and the time-lock.
    *   Use 'Clock::get()?.unix_timestamp' to check the time. Store the timestamp of the last transfer in an associated account.
    *   The royalty calculation should be robust.
    *   The code must be well-commented.
2.  **Generate 'Cargo.toml':** Provide the necessary 'Cargo.toml' configuration for this Anchor program.
3.  **Provide Deployment Instructions:** Write clear, step-by-step markdown instructions for a user to:
    *   Build the Anchor program.
    *   Deploy the program to Solana devnet.
    *   Initialize a new token mint using the SPL-Token CLI that uses the deployed program as its transfer hook. Include placeholder program IDs and account addresses where necessary.

**Output Format:**

Strictly follow this markdown format. Do not add any extra explanations before or after this structure.

\`\`\`rust
// lib.rs
// Rust code for lib.rs here
\`\`\`

\`\`\`toml
# Cargo.toml
# TOML content for Cargo.toml here
\`\`\`

### Deployment and Usage Instructions
- Step 1: ...
- Step 2: ...
- etc.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2
      }
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("Received an empty response from the AI model.");
    }
    
    return parseGeneratedCode(rawText);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate smart contract code. Please check your API key and try again.");
  }
};
