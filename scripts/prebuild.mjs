import { execSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

try {
  require.resolve("tsx");
  require.resolve("satori");
  require.resolve("sharp");
} catch {
  console.log(
    "Skipping OG image generation (devDependencies not installed)"
  );
  process.exit(0);
}

execSync("npx tsx scripts/generate-og-images.mts", { stdio: "inherit" });
