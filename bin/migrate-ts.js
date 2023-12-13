#!/usr/bin/env node

(async () => {
  const { spawnSync } = await import("child_process");
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
    throw new Error("Could not find a valid package.json. Command must be run from the root of your project with a valid package.json.");
  }

  const childProcess = spawnSync("migrate", process.argv.slice(2), {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_OPTIONS: [
        process.env["NODE_OPTIONS"],
        packageJson.type === "module" ? "--loader ts-node/esm" : "--require ts-node/register",
        "--no-warnings",
      ]
      .filter((item) => !!item)
      .join(" ")
    },
    windowsHide: true
  });

  process.exit(childProcess.status || 0);
})();
