
declare const __non_webpack_require__: typeof require;
import fs from "fs";

export class Modules
{
  public static async import(exportName: string, path: string): Promise<any>
  public static async import(path: string): Promise<any>
  public static async import(...args: Array<any>): Promise<any>
  {
    const [ firstArg, secondArg ] = args;
    const exportName = secondArg != null ? firstArg : null;
    const path = secondArg != null ? secondArg : firstArg;
    const module = await import(/* webpackIgnore: true */ `${path}`);
    if (exportName) return module[exportName];
    return module;
  }
  
  public static require(exportName: string, path: string): any
  public static require(path: string): any
  public static require(...args: Array<any>): any
  {
    const [ firstArg, secondArg ] = args;
    const exportName = secondArg != null ? firstArg : null;
    const path = secondArg != null ? secondArg : firstArg;
    const module = __non_webpack_require__(`${path}`);
    if (exportName) return module[exportName];
    return module;
  }
  
  public static async isCommonJS(): Promise<boolean>
  {
    const packageJsonPath = `${process.cwd()}/package.json`;
    let packageJson: { [key: string]: any };
    
    try
    {
      packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, { encoding: "utf-8" }));
    }
    catch (error)
    {
      throw new Error("Command must be run from the root of your project containing a valid package.json file.");
    }
    
    return packageJson.type !== "module";
  }
}
