# @electra/migrate

A MySQL database migration package.

## Installation

Using npm:

```bash
npm install @electra/migrate
```

Using yarn:

```bash
yarn add @electra/migrate
```

## Usage


### 1. Add Configuration File

First you'll need to create a configuration file called `migrate.config.js` in the root of your project.

See below for a breakdown of the configuration options.

- `migrationDirs`
  - `[group: string]`: The key of this group of migrations.
    - `name: string`: The display name of the group. This is used as the group name for the migrations. 
    - `path: string`: The path to the directory containing the migration files for this group. 
    
- `migrationDatabase: string`: The name of the database to use for the migration table.

- `connections`
  - `[name: string]`: The key of each item in the connections object is used as the connection name.
    - `host: string`: The host of the database server.
    - `port: number`: The port of the database server.
    - `username: string`: The username to use when connecting.
    - `password: string`: The password to use when connecting.
    - `databases: Array<string>`: The names of the databases to use this connection with.

Example configuration file:

```js
// migrate.config.js

// Use "module.exports" if using commonjs modules in your project
export default {
  // Multiple groups of migrations can be defined to allow for modular organisation
  // Or you can just define a single group
  migrationDirs: {
    auth_module: {
      name: "Auth Module",
      path: "./modules/auth/migrations"
    },
    user_module: {
      name: "User Module",
      path: "./modules/user/migrations"
    }
  },
  // Configure which database to use for the migration table
  migrationDatabase: "app",
  // Connection details for each database connection
  connections: {
    app: {
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "password",
      databases: ["app"] // Connections can be reused across multiple databases
    }
  }
}
```

### 2. Define Migrations

Next you'll need to create migration files in the directories defined in your configuration file.

Migration files must be `.js` or `.ts` files named in the following format: `YYYY_MM_DD_HHMMSS_MigrationName.[js|ts]`.

```js
// 2023_12_06_194529_CreateUsersTable.js

// For use with commonjs: const { AbstractMigration } = require("@electra/migrate");
import { AbstractMigration } from "@electra/migrate";

// Use module.exports if using commonjs modules in your project
export class MigrationName extends AbstractMigration 
{
  // mysql is an instance of the MySql class
  async up(mysql) 
  {
    // Perform migration
    const table = mysql.database("app").create("users"); 
    table.id();
    table.string("name");
    table.string("email");
    table.string("password");
    table.datetime("created");
    table.datetime("updated");
  }

  async down(mysql) 
  {
    // Rollback migration
    mysql
      .database("app")
      .table("users")
      .drop();
  }
}
```

### 3. Use CLI Commands

The `@electra/migrate` package provides several CLI commands for working with migrations.

#### status

The `status` command will display the current status of all the migrations in your project, organised by group.

```bash
migrate status
```

See below for an example of the output based on the example configuration and migrations above. Any migrations within each group that haven't yet been run will appear in red, and any migrations that have been run will appear in green.

```bash
Auth Module
  * No migrations found *
User Module
  2023_12_06_194529_CreateUsersTable
```

#### run

As you would expect, the `run` command will run all migrations (that haven't already been run), in order of the datetime in the file name.

```bash
migrate run
```

Example output:

```bash
Successfully ran 4 migrations
```

#### run --rollback-on-error

The `run` command accepts a `--rollback-on-error` flag. If this flag is present, then in the event that any of the migrations fail, all migrations in the batch will be rolled back to ensure that you're not left in a state where some migrations have run and some haven't.

```bash
migrate run --rollback-on-error
```

#### rollback

@electra/migrate keeps track of which migrations are run in the same batch. If you execute the `run` command and there are multiple migrations that haven't yet been run, they will all be run in the same batch. This means that when you subsequently execute the `rollback` command, all migrations that were run in the last batch will be rolled back.

```bash
migrate rollback
```

Example output:

```bash
Successfully rolled back 4 migrations
```

#### help

The `help` command will display a list of all available commands.

```bash
migrate help
```

## CommonJS vs ES Modules

@electra/migrate supports both CommonJS and ES modules and will look at your project's package.json to decide which one to use. The following examples show how to configure your project for each.

### CommonJS

If the `type` property in your project's package.json isn't set or is set to `commonjs`, then @electra/migrate will use CommonJS modules.

Your migrate configuration file should be exported using `module.exports`:

```js
// migrate.config.js

module.exports = {
  // ...
}
```

Your migration files should be exported using `module.exports` and use `require` to import the `AbstractMigration` class:

```js
// 2023_12_06_194529_CreateUsersTable.js

const { AbstractMigration } = require("@electra/migrate");

module.exports = class CreateUsersTable extends AbstractMigration 
{
  async up(mysql)
  {
    // ...
  }
  
  async down(mysql)
  {
    // ...
  }
}
```

### ES Modules

If the `type` property in your project's package.json is set to `module`, then @electra/migrate will use ES modules.

Your migrate configuration file should be exported using `export default`:

```js
// migrate.config.js

export default {
  // ...
}
```

Your migration files should be exported using `export` and use `import` to import the `AbstractMigration` class:

```js
// 2023_12_06_194529_CreateUsersTable.js

import { AbstractMigration } from "@electra/migrate";

export class CreateUsersTable extends AbstractMigration 
{
  async up(mysql)
  {
    // ...
  }
  
  async down(mysql)
  {
    // ...
  }
}
```

### TypeScript

@electra/migrate supports writing migration files in TypeScript. The following examples show how to configure your project.

#### Dependencies

To use @electra/migrate with TypeScript, you'll need to install `typescript` and `ts-node`:

When using npm:

```bash
npm install typescript ts-node
```

When using yarn:

```bash
yarn add typescript ts-node
```

#### Configuration

As when using JavaScript migrations, your migrate configuration file should be exported using `module.exports` when using CommonJS modules, or `export default` when using ES modules.

CommonJS:
```js
// migrate.config.js

module.exports = {
  // ...
}
```

ES Modules:
```js
// migrate.config.js

export default {
  // ...
}
```

#### Migration Files

When using TypeScript, your migration files should be exported using `export` and use `import` to import the `AbstractMigration` class.

```typescript
// 2023_12_06_194529_CreateUsersTable.ts

import { AbstractMigration, MySql } from "@electra/migrate";

export class CreateUsersTable extends AbstractMigration 
{
  public async up(mysql: MySql)
  {
    // ...
  }
  
  public async down(mysql: MySql)
  {
    // ...
  }
}
```

#### tsconfig.json

Depending on whether you're using CommonJS or ES Modules in your project, you'll need to make sure your `tsconfig.json` configuration matches.

If you want @electra/migrate to use CommonJS modules, you'll need to set the `compilerOptions.module` key to `commonjs`.

```json
{
  "compilerOptions": {
    "module": "commonjs"
  }
}
```

Alternatively, if you can configure `ts-node` to use CommonJS, while setting your `compilerOptions.module` to something else if you need to.

```json
{
  "compilerOptions": {
    "module": "es6"
  },
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    }
  }
}
```

## Environment Specific Configuration

You can provide environment specific configuration by creating a configuration file for each environment. The name of the configuration file should be in the format `migrate.config.[environment].js` where `[environment]` is the name of the environment.

For example, if you have a `prod` environment, you can create a configuration file called `migrate.config.prod.js` and @electra/migrate will use that configuration when the `NODE_ENV` environment variable is set to `prod`.

The environment specific configuration will be merged with the base configuration, with the environment specific configuration taking precedence.

Alternatively, you can handle the environment specific configuration yourself from within your `migrate.config.js` file.

```js
// migrate.config.js

const baseConfig = {
  // ...
}

const envConfig = {
  prod: {
    // ...
  },
  qa: {
    // ...
  },
  dev: {
    // ...
  }
}

module.exports = {
  ...baseConfig,
  ...envConfig[process.env.NODE_ENV]
}
```

### API Reference

Table of contents:

- [MySql](#mysql)
  - [database](#database)
- [Database](#database-1)
  - [create](#create)
  - [table](#table)
- [Table](#table-1)
  - [id](#id)
  - [int](#int)
  - [tinyint](#tinyint)
  - [smallint](#smallint)
  - [mediumint](#mediumint)
  - [bigint](#bigint)
  - [decimal](#decimal)
  - [double](#double)
  - [string](#string)
  - [text](#text)
  - [tinytext](#tinytext)
  - [mediumtext](#mediumtext)
  - [longtext](#longtext)
  - [enum](#enum)
  - [date](#date)
  - [time](#time)
  - [datetime](#datetime)
  - [blob](#blob)
  - [tinyblob](#tinyblob)
  - [mediumblob](#mediumblob)
  - [longblob](#longblob)
  - [dropColumn](#dropcolumn)
  - [renameColumn](#renamecolumn)
  - [addIndex](#addindex)
  - [dropIndex](#dropindex)
  - [drop](#drop)
- [BlobColumn](#blobcolumn)
- [TinyBlobColumn](#tinyblobcolumn)
- [MediumBlobColumn](#mediumblobcolumn)
- [LongBlobColumn](#longblobcolumn)
- [DateColumn](#datecolumn)
- [DateTimeColumn](#datetimecolumn)
- [DecimalColumn](#decimalcolumn)
- [DoubleColumn](#doublecolumn)
- [EnumColumn](#enumcolumn)
- [IdColumn](#idcolumn)
- [IntColumn](#intcolumn)
- [TinyIntColumn](#tinyintcolumn)
- [SmallIntColumn](#smallintcolumn)
- [MediumIntColumn](#mediumintcolumn)
- [BigIntColumn](#bigintcolumn)
- [StringColumn](#stringcolumn)
- [TextColumn](#textcolumn)
- [TinyTextColumn](#tinytextcolumn)
- [MediumTextColumn](#mediumtextcolumn)
- [LongTextColumn](#longtextcolumn)
- [TimeColumn](#timecolumn)

## MySql

An instance of the `MySql` class is passed to the `up` and `down` methods of each migration. It provides methods for interacting with all databases and tables using the connections defined in the configuration file.

### database

The `database` method is used to select a database to interact with. If the database does not exist, it will be created. If a specific connection name is passed as a second parameter, that connection will be used. If no connection name is passed, the connection defined in the configuration file for the database will be used.

#### Parameters

- `name: string`: The name of the database to select
- `connectionName?: string`: The name of the connection to use

#### Returns

- An instance of the `Database` class

#### Example

```typescript
mysql.database("app")
```

## Database

The `Database` class is returned by the `database` method of the `MySql` class. It represents a single database in the MySql instance and provides methods for interacting with the database and its tables.

### create

The `create` method is used to create a new table in the database and returns an instance of the `Table` class. 

#### Parameters
- `name: string`: The name of the table to create

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql.database("app").create("users")
```

### table

The `table` method is used to select an existing table in the database and returns an instance of the `Table` class.

#### Parameters
- `name: string`: The name of the table to select

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql.database("app").table("users")
```

## Table

The `Table` class is returned by the `create` and `table` methods of the `Database` class. It represents a single table in the database and provides methods for interacting with the table and its columns.

### id

The `id` method is used to create an auto-incrementing primary key column.

#### Parameters
- `name?: string`: The name of the column. If no name is provided, the column will be named `id`.

#### Returns
- An instance of the `IdColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.id();
```

### int

The `int` method is used to create an `INT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("age");
```

### tinyint

The `tinyint` method is used to create an `TINYINT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `TinyIntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.tinyint("age");
```

### smallint

The `smallint` method is used to create an `SMALLINT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `SmallIntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.smallint("age");
```

### mediumint

The `mediumint` method is used to create an `MEDIUMINT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `MediumIntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.mediumint("age");
```

### bigint

The `bigint` method is used to create an `BIGINT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `BigIntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.bigint("age");
```

### decimal

The `decimal` method is used to create a column with type `DECIMAL`. By default, the column type will be `DECIMAL(8, 2)` but this can be changed using the `precision` and `scale` parameters.

#### Parameters
- `name: string`: The name of the column
- `precision?: boolean`: The number of digits in the number. Defaults to `8`.
- `scale?: boolean`: The number of digits to the right of the decimal point. Defaults to `2`.

#### Returns
- An instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.decimal("balance", 10, 2);
```

### double

The `double` method is used to create a column with type `DOUBLE`. By default, the column type will be `DOUBLE` with no `precision` or `scale` but this can be changed using the `precision` and `scale` arguments. Please note that using `precision` and `scale` with the `DOUBLE` column type has been deprecated in MySQL itself and is not recommended, however it has been provided for backwards compatibility. It's also worth noting that when using the `precision` and `scale` options with a `DOUBLE` column, they are for display purposes only and don't actually add additional constraints to the column.

#### Parameters
- `name: string`: The name of the column
- `precision?: boolean`: The number of digits in the number. Defaults to `undefined`.
- `scale?: boolean`: The number of digits to the right of the decimal point. Defaults to `undefined`.

#### Returns
- An instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.double("balance");
```

### string

The `string` method is used to create a `VARCHAR` column. By default, the column type will be `VARCHAR(255)` but the length can be changed using the `length` argument.

#### Parameters
- `name: string`: The name of the column
- `length?: boolean`: The length of the column. Defaults to `255`.

#### Returns
- An instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.string("name", 200);
```

### text

The `text` method is used to create a `TEXT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `TextColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.text("content");
```

### tinytext

The `tinytext` method is used to create a `TINYTEXT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `TinyTextColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.tinytext("content");
```

### mediumtext

The `mediumtext` method is used to create a `MEDIUMTEXT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `MediumTextColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.mediumtext("content");
```

### longtext

The `longtext` method is used to create a `LONGTEXT` column.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `LongTextColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.longtext("content");
```

### enum

The `enum` method is used to create a column with type `ENUM`.

#### Parameters
- `name: string`: The name of the column
- `values: Array<string>`: The possible values of the column

#### Returns
- An instance of the `EnumColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.enum("role", ["admin", "user"]);
```

### date

The `date` method is used to create a column with type `DATE`.

#### Parameters

- `name: string`: The name of the column

#### Returns

- An instance of the `DateColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.date("created");
```

### time

The `time` method is used to create a column with type `TIME`.

#### Parameters

- `name: string`: The name of the column

#### Returns
- An instance of the `TimeColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.time("start");
```

### datetime

The `datetime` method is used to create a column with type `DATETIME`.

#### Parameters
- `name: string`: The name of the column

#### Returns
- An instance of the `DateTimeColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.datetime("created");
```

### blob

The `blob` method is used to create a blob column.

#### Parameters

- `name: string`: The name of the column

#### Returns
- An instance of the `BlobColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.blob("avatar");
```

### tinyblob

The `tinyblob` method is used to create a `TINYBLOB` column.

#### Parameters

- `name: string`: The name of the column

#### Returns
- An instance of the `TinyBlobColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.tinyblob("avatar");
```

### mediumblob

The `mediumblob` method is used to create a `MEDIUMBLOB` column.

#### Parameters

- `name: string`: The name of the column

#### Returns
- An instance of the `MediumBlobColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.mediumblob("avatar");
```

### longblob

The `longblob` method is used to create a `LONGBLOB` column.

#### Parameters

- `name: string`: The name of the column

#### Returns
- An instance of the `LongBlobColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.longblob("avatar");
```

### renameColumn

This one is pretty self-explanatory.

#### Parameters

- `currentName: string`: The current name of the column
- `newName: string`: The new name of the column

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .renameColumn("name", "fullName")
```

### dropColumn

The `dropColumn` method is used to drop a column from the table.

#### Parameters

- `name: string`: The name of the column to drop

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .dropColumn("fullName")
```

### addIndex

The `addIndex` method is used to add an index to a table.

#### Parameters

- `columnNames: Array<string>`: The names of the columns to add the index to
- `name?: string`: The name of the index
- `type?: IndexDefinitionTypeEnum`: The type of index to add. Defaults to `IndexDefinitionTypeEnum.INDEX`.

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .addIndex(["columnName"])
```

### dropIndex

The `dropIndex` method is used to drop an index from a column in the table. There are two ways to use this method:

#### Drop an index by name

#### Parameters

- `name: string`: The name of the index

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .dropIndex("index_name")
```

#### Drop an index by columns

#### Parameters

- `columnNames: Array<string>`: The names of the columns that the index is on

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .dropIndex(["columnName"])
```
### drop

The `drop` method is used to drop the table from the database.

#### Parameters

- `name: string`: The name of the column

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .drop()
```

## BlobColumn

The `BlobColumn` class is returned by the `blob` method of the `Table` class. It represents a `BLOB` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether or not the column can be null.

#### Parameters
- `nullable?: boolean`: Whether or not the column can be null. Defaults to `true`.

#### Returns
- The same instance of the `BlobColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.blob().nullable();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters
- `columnName: string`: The name of the column that this column should appear after

#### Returns
- The same instance of the `BlobColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.blob().nullable().after("name");
```

## TinyBlobColumn

The `TinyBlobColumn` class is returned by the `tinyblob` method of the `Table` class. It represents a `TINYBLOB` column in the table and provides all the same methods as the `BlobColumn` class.

## MediumBlobColumn

The `MediumBlobColumn` class is returned by the `mediumblob` method of the `Table` class. It represents a `MEDIUMBLOB` column in the table and provides all the same methods as the `BlobColumn` class.

## LongBlobColumn

The `LongBlobColumn` class is returned by the `longblob` method of the `Table` class. It represents a `LONGBLOB` column in the table and provides all the same methods as the `BlobColumn` class.

## DateColumn

A `DateColumn` class instance is returned by the `date` method of the `Table` class. It represents a `DATE` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters
- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns
- The same instance of the `DateColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.date("deleted").nullable();
```

### default

The `default` method is used to set the default value of the column.

#### Parameters
- `value: string`: The default value of the column (must be in the format YYYY-MM-DD)

#### Returns
- The same instance of the `DateColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.date("deleted").nullable().default("2020-01-01");
```

### dropDefault

The `dropDefault` method is used to drop the default value of the column, if one has been set.

#### Returns

- The same instance of the `DateColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.date("deleted").dropDefault();
```

### index

The `index` method is used to add an index to the column. A name for the index will be generated automatically.

#### Returns

- The same instance of the `DateColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.date("deleted").index();
```

### dropIndex

The `dropIndex` method is used to drop the index from the column.

#### Returns

- The same instance of the `DateColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.date("deleted").dropIndex();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `DateColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.date("deleted").nullable().after("name");
```

## DateTimeColumn

A `DateTimeColumn` class instance is returned by the `datetime` method of the `Table` class. It represents a `DATETIME` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters

- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns

- The same instance of the `DateTimeColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.datetime("deleted").nullable();
```

### default

The `default` method is used to set the default value of the column.

#### Parameters

- `value: string`: The default value of the column (must be in the format YYYY-MM-DD HH:MM:SS)

#### Returns

- The same instance of the `DateTimeColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.datetime("deleted").default("2020-01-01 12:00:00");
```

### dropDefault

The `dropDefault` method is used to drop the default value of the column, if one has been set.

#### Returns

- The same instance of the `DateTimeColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.datetime("deleted").dropDefault();
```

### index

The `index` method is used to add an index to the column. A name for the index will be generated automatically.

#### Returns

- The same instance of the `DateTimeColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.datetime("deleted").index();
```

### dropIndex

The `dropIndex` method is used to drop the index from the column.

#### Returns

- The same instance of the `DateTimeColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.datetime("deleted").dropIndex();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `DateTimeColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.datetime("deleted").nullable().after("name");
```

## DecimalColumn

A `DecimalColumn` class instance is returned by the `decimal` method of the `Table` class. It represents a `DECIMAL` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters

- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.decimal("balance").nullable();
```

### default

The `default` method is used to set the default value of the column.

#### Parameters

- `value: string`: The default value of the column

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.decimal("balance").default("0.00");
```

### dropDefault

The `dropDefault` method is used to drop the default value of the column, if one has been set.

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.decimal("balance").dropDefault();
```

### index

The `index` method is used to add an index to the column. A name for the index will be generated automatically.

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.decimal("balance").index();
```

### dropIndex

The `dropIndex` method is used to drop the index from the column.

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.decimal("balance").dropIndex();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.decimal("balance").nullable().after("name");
```

### unsigned

The `unsigned` method is used to set whether the column can be negative.

#### Parameters

- `unsigned?: boolean`: Whether the column can be negative. Defaults to `true`.

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.decimal("balance").unsigned();
```

### zeroFill

The `zeroFill` method is used to set whether the column should be zero filled.

#### Parameters

- `zeroFill?: boolean`: Whether the column should be zero filled. Defaults to `true`.

#### Returns

- The same instance of the `DecimalColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.decimal("balance").zeroFill();
```

## DoubleColumn

A `DoubleColumn` class instance is returned by the `double` method of the `Table` class. It represents a `DOUBLE` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters

- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns

- The same instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.double("balance").nullable();
```

### default

The `default` method is used to set the default value of the column.

#### Parameters

- `value: string`: The default value of the column

#### Returns

- The same instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.double("balance").default("0.00");
```

### dropDefault

The `dropDefault` method is used to drop the default value of the column, if one has been set.

#### Returns

- The same instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.double("balance").dropDefault();
```

### index

The `index` method is used to add an index to the column. A name for the index will be generated automatically.

#### Returns

- The same instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.double("balance").index();
```

### dropIndex

The `dropIndex` method is used to drop the index from the column.

#### Returns

- The same instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.double("balance").dropIndex();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.double("balance").nullable().after("name");
```

### zeroFill

The `zeroFill` method is used to set whether the column should be zero filled.

#### Parameters

- `zeroFill?: boolean`: Whether the column should be zero filled. Defaults to `true`.

#### Returns

- The same instance of the `DoubleColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.double("balance").zeroFill();
```

## EnumColumn

An `EnumColumn` class instance is returned by the `enum` method of the `Table` class. It represents an `ENUM` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters

- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns

- The same instance of the `EnumColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.enum("role", ["admin", "user"]).nullable();
```

### default

The `default` method is used to set the default value of the column.

#### Parameters

- `value: string`: The default value of the column

#### Returns

- The same instance of the `EnumColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.enum("role", ["admin", "user"]).default("user");
```

### dropDefault

The `dropDefault` method is used to drop the default value of the column, if one has been set.

#### Returns

- The same instance of the `EnumColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.enum("role", ["admin", "user"]).dropDefault();
```

### index

The `index` method is used to add an index to the column. A name for the index will be generated automatically.

#### Returns

- The same instance of the `EnumColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.enum("role", ["admin", "user"]).index();
```

### dropIndex

The `dropIndex` method is used to drop the index from the column.

#### Returns

- The same instance of the `EnumColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.enum("role", ["admin", "user"]).dropIndex();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `EnumColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.enum("role", ["admin", "user"]).nullable().after("name");
```

## IntColumn

An `IntColumn` class instance is returned by the `int` method of the `Table` class. It represents an `INT` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters

- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("age").nullable();
```

### default

The `default` method is used to set the default value of the column.

#### Parameters

- `value: string`: The default value of the column

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("age").default("0");
```

### dropDefault

The `dropDefault` method is used to drop the default value of the column, if one has been set.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.int("age").dropDefault();
```

### index

The `index` method is used to add an index to the column. A name for the index will be generated automatically.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.int("age").index();
```

### dropIndex

The `dropIndex` method is used to drop the index from the column.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.int("age").dropIndex();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("age").nullable().after("name");
```

### unsigned

The `unsigned` method is used to set whether the column can be negative.

#### Parameters

- `unsigned?: boolean`: Whether the column can be negative. Defaults to `true`.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("age").unsigned();
```

### zeroFill

The `zeroFill` method is used to set whether the column should be zero filled.

#### Parameters

- `zeroFill?: boolean`: Whether the column should be zero filled. Defaults to `true`.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("age").zeroFill();
```

### autoIncrement

The `autoIncrement` method is used to set whether the column should auto increment.

#### Parameters

- `autoIncrement?: boolean`: Whether the column should auto increment. Defaults to `true`.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("test").autoIncrement();
```

### primaryKey

The `primaryKey` method is used to set whether the column should be the primary key.

#### Parameters

- `primaryKey?: boolean`: Whether the column should be the primary key. Defaults to `true`.

#### Returns

- The same instance of the `IntColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.int("test").primaryKey();
```

## TinyIntColumn

The `TinyIntColumn` class is returned by the `tinyint` method of the `Table` class. It represents a `TINYINT` column in the table and provides all the same methods as the `IntColumn` class.

## SmallIntColumn

The `SmallIntColumn` class is returned by the `smallint` method of the `Table` class. It represents a `SMALLINT` column in the table and provides all the same methods as the `IntColumn` class.

## MediumIntColumn

The `MediumIntColumn` class is returned by the `mediumint` method of the `Table` class. It represents a `MEDIUMINT` column in the table and provides all the same methods as the `IntColumn` class.

## BigIntColumn

The `BigIntColumn` class is returned by the `bigint` method of the `Table` class. It represents a `BIGINT` column in the table and provides all the same methods as the `IntColumn` class.

## StringColumn

A `StringColumn` class instance is returned by the `string` method of the `Table` class. It represents a `VARCHAR` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters

- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns

- The same instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.string("name").nullable();
```

### default

The `default` method is used to set the default value of the column.

#### Parameters

- `value: string`: The default value of the column

#### Returns

- The same instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.string("name").default("John Doe");
```

### dropDefault

The `dropDefault` method is used to drop the default value of the column, if one has been set.

#### Returns

- The same instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.string("name").dropDefault();
```

### index

The `index` method is used to add an index to the column. A name for the index will be generated automatically.

#### Returns

- The same instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.string("name").index();
```

### dropIndex

The `dropIndex` method is used to drop the index from the column.

#### Returns

- The same instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").table("users");
table.string("name").dropIndex();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.string("name").nullable().after("id");
```

### primaryKey

The `primaryKey` method is used to set whether the column should be the primary key.

#### Parameters

- `primaryKey?: boolean`: Whether the column should be the primary key. Defaults to `true`.

#### Returns

- The same instance of the `StringColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.string("name").primaryKey();
```

## TextColumn

A `TextColumn` class instance is returned by the `text` method of the `Table` class. It represents a `TEXT` column in the table and provides methods for updating the column definition.

### nullable

The `nullable` method is used to set whether the column can be null.

#### Parameters

- `nullable?: boolean`: Whether the column can be null. Defaults to `true`.

#### Returns

- The same instance of the `TextColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.text("content").nullable();
```

### after

The `after` method is used to set the column that this column should appear after (only used when creating the column, not when updating it).

#### Parameters

- `columnName: string`: The name of the column that this column should appear after

#### Returns

- The same instance of the `TextColumn` class

#### Example

```js
const table = mysql.database("app").create("users");
table.text("content").nullable().after("id");
```

## TinyTextColumn

The `TinyTextColumn` class is returned by the `tinytext` method of the `Table` class. It represents a `TINYTEXT` column in the table and provides all the same methods as the `TextColumn` class.

## MediumTextColumn

The `MediumTextColumn` class is returned by the `mediumtext` method of the `Table` class. It represents a `MEDIUMTEXT` column in the table and provides all the same methods as the `TextColumn` class.

## LongTextColumn

The `LongTextColumn` class is returned by the `longtext` method of the `Table` class. It represents a `LONGTEXT` column in the table and provides all the same methods as the `TextColumn` class.

## License

[MIT](https://choosealicense.com/licenses/mit/)
