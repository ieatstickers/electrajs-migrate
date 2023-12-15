
(async () => {
  let containsTsMigrations = false;

  try {
    // TODO: Generate path to migrate config
    const configPath = `${process.cwd()}/migrate.config.ts`;
    const fs = await import("fs");
    // TODO: Read config file
    const fileContents = await fs.promises.readFile(configPath, { encoding: "utf8" });
    const config = JSON.parse(fileContents);
    const migrationsDirs = config.migrationsDirs;

    for (const groupKey in migrationsDirs)
    {
      const { path } = migrationsDirs[groupKey];
      const migrationFiles = await fs.promises.readdir(path);
      const containsTsFiles = migrationFiles.some((file) => file.endsWith(".ts"));

      if (containsTsFiles)
      {
        containsTsMigrations = containsTsFiles;
        break;
      }
    }
  }
  catch (error)
  {}

  if (containsTsMigrations)
  {
    await import("./migrate-ts.js");
  }
  else
  {
    await import("./migrate.js");
  }

})();

