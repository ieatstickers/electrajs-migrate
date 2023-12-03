export class Modules
{
  public static async import(path: string): Promise<any>
  {
    console.log(`await import(/* webpackIgnore: true */ '${path}')`);
    return await import(/* webpackIgnore: true */ `${path}`);
  }
}
