
import chalk from "chalk";

export class Log
{
  public static red(message: string): void
  {
    console.log(chalk.redBright(message));
  }
  
  public static blue(message: string): void
  {
    console.log(chalk.blueBright(message));
  }
  
  public static green(message: string): void
  {
    console.log(chalk.greenBright(message));
  }
  
  public static yellow(message: string): void
  {
    console.log(chalk.yellowBright(message));
  }
}
