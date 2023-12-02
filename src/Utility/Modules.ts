
declare const __non_webpack_require__: typeof require;

export class Modules
{
  public static async import(path: string): Promise<any>
  {
    if (typeof require !== 'undefined')
    {
      console.log(`__non_webpack_require__('${path}')`);
      return __non_webpack_require__(`${path}`);
    }
    else
    {
      console.log(`await import(/* webpackIgnore: true */ '${path}')`);
      return await import(/* webpackIgnore: true */ `${path}`);
    }
  }
}
