#!/usr/bin/env node

(async () => {
  let containsTsMigrations = false;

  try {
    const configImport = await import(`${process.cwd()}/migrate.config.js`);
    const config = configImport.default;
    const migrationsDirs = config.migrationDirs;
    const fs = await import("fs");

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
  {
    console.log('error', error.message);
  }

  if (containsTsMigrations)
  {
    console.log(`Running migrate-ts.js...`, { containsTsMigrations });
    await import("./migrate-ts.js");
  }
  else
  {
    console.log(`Running migrate-js.js...`, { containsTsMigrations });
    await import("./migrate-js.js");
  }

})();

