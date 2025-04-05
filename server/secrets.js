
import * as esc from "@pulumi/esc-sdk";
import dotenv from "dotenv";

dotenv.config();
async function getSecrets() {
  const orgName = process.env.ORG_NAME;
  const envName = process.env.ENV_NAME;
  const projectName = process.env.PROJECT_NAME;

  if (!orgName || !envName) {
    throw new Error("Organization name or environment name is missing.");
  }

  const config = new esc.Configuration({
    accessToken: process.env.PULUMI_ACCESS_TOKEN,
  });

  const client = new esc.EscApi(config);

  // ✅ CORRECT usage with an options object:
  const env = await client.openAndReadEnvironment(
    orgName,projectName, envName
  );

  if (!env || !env.values) {
    throw new Error(`❌ Failed to retrieve environment values for "${envName}"`);
  }

  return {
    huggingFaceKey: env.values.huggingface?.apiKey,
    githubToken: env.values.github?.token,
    jwtSecret: env.values.jwt?.secret,
  };
}


export default getSecrets;

// Test run
// (async () => {
//   const secrets = await getSecrets();
//   console.log("✅ Secrets Retrieved:", secrets);
// })();
