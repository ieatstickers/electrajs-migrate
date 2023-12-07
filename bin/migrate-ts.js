#!/usr/bin/env node

(async () => {
  const { exec } = await import('child_process');

  if (typeof module !== 'undefined' && module.exports)
  {
    console.log('Loading CommonJS module...');
    exec('node -r ts-node/register ./migrate.js');
  }
  else
  {
    console.log('Loading ES module...');
    exec('node --loader ts-node/esm ./migrate.js');
    await import('../dist/migrate.mjs');
  }
})();
