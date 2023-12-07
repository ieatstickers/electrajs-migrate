#!/usr/bin/env node

(async () => {
  if (typeof module !== 'undefined' && module.exports)
  {
    console.log('Loading CommonJS module...');
    await import('../dist/migrate.cjs');
  }
  else
  {
    console.log('Loading ES module...');
    await import('../dist/migrate.mjs');
  }
})();
