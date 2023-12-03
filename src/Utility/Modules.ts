export class Modules
{
  public static async import(exportName: string, path: string): Promise<any>
  public static async import(path: string): Promise<any>
  public static async import(...args: Array<any>): Promise<any>
  {
    const [ firstArg, secondArg ] = args;
    const exportName = secondArg != null ? firstArg : 'default';
    const path = secondArg || firstArg;
    console.log(`Importing ${exportName} from ${path}`);
    const module = await import(/* webpackIgnore: true */ `${path}`);
    return module[exportName];
  }
}
