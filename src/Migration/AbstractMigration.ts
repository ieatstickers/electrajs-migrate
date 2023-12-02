import { MigrationInterface } from "./MigrationInterface";
import { MySql } from "./Database/MySql";

export abstract class AbstractMigration implements MigrationInterface
{
  public abstract up(mysql: MySql): Promise<void>;
  
  public abstract down(mysql: MySql): Promise<void>;
}
