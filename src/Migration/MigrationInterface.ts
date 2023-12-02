import { MySql } from "./Database/MySql";

export interface MigrationInterface
{
  up(mysql: MySql): Promise<void>;
  
  down(mysql: MySql): Promise<void>;
}
