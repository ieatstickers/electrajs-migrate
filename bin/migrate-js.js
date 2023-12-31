#!/usr/bin/env node

(async () => {
  const path = await import("path");
  const { promises: fs } = await import("fs");
  const packageJsonPath = path.join(process.cwd(), "package.json");
  let packageJson;

  try
  {
    packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: "utf8" }));
  }
  catch (error)
  {
    throw new Error("No package.json found. Command must be run from the root of your project.");
  }

  if (packageJson.type === "module")
  {
    process.env.MIGRATE_JS_MODULE_TYPE = 'mjs';
    await import("../dist/migrate.mjs");
    return;
  }

  process.env.MIGRATE_JS_MODULE_TYPE = 'cjs';
  await import("../dist/migrate.cjs");
})();
