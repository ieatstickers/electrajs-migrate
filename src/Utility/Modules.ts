
declare const __non_webpack_require__: typeof require;

export class Modules
{
  public static async import(path: string): Promise<any>
  {
    if (typeof require !== 'undefined')
    {
      return __non_webpack_require__(`${path}`);
    }
    else
    {
      return await import(/* webpackIgnore: true */ `${path}`);
    }
  }
}
