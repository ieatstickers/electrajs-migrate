
declare const __non_webpack_require__: typeof require;

async function getDirName(): Promise<string>
{
  if (typeof __dirname !== 'undefined') return __dirname;
  
  const path = await import('path');
  const { pathname } = new URL(import.meta.url);
  return path.dirname(pathname);
}

function isCommonJs(): boolean
{
  return typeof require !== 'undefined';
}

(async () => {
  const dirName = await getDirName();
  
  if (isCommonJs())
  {
    __non_webpack_require__(`${dirName + '/cjs/migrate.cjs'}`);
  }
  else
  {
    await import(/* webpackIgnore: true */ `${dirName + '/esm/migrate.mjs'}`);
  }
})();
