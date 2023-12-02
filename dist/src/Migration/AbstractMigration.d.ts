import { MigrationInterface } from "./MigrationInterface";
import { MySql } from "./Database/MySql";
export declare abstract class AbstractMigration implements MigrationInterface {
    abstract up(mysql: MySql): Promise<void>;
    abstract down(mysql: MySql): Promise<void>;
}
