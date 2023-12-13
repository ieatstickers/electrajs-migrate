export class Modules
{
  public static async import(exportName: string, path: string): Promise<any>
  public static async import(path: string): Promise<any>
  public static async import(...args: Array<any>): Promise<any>
  {
    const [ firstArg, secondArg ] = args;
    const exportName = secondArg != null ? firstArg : null;
    const path = secondArg != null ? secondArg : firstArg;
    // const module = await import(/* webpackIgnore: true */ `${path}`);
    const module = require(`${path}`);
    if (exportName) return module[exportName];
    return module;
  }
}
