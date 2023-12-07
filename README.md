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
    mysql
      .database("app")
      .create("users")
      .id()
      .string("name")
      .string("email")
      .string("password")
      .datetime("created")
      .datetime("updated");
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
electra-migrate status
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
electra-migrate run
```

Example output:

```bash
Successfully ran 4 migrations
```

#### run --rollback-on-error

The `run` command accepts a `--rollback-on-error` flag. If this flag is present, then in the event that any of the migrations fail, all migrations in the batch will be rolled back to ensure that you're not left in a state where some migrations have run and some haven't.

```bash
electra-migrate run --rollback-on-error
```

#### rollback

@electra/migrate keeps track of which migrations are run in the same batch. If you execute the `run` command and there are multiple migrations that haven't yet been run, they will all be run in the same batch. This means that when you subsequently execute the `rollback` command, all migrations that were run in the last batch will be rolled back.

```bash
electra-migrate rollback
```

Example output:

```bash
Successfully rolled back 4 migrations
```

#### help

The `help` command will display a list of all available commands.

```bash
electra-migrate help
```

TODO: Add usage examples

- js + commonjs
- js + esm
- ts + commonjs (if possible)
- ts + esm

### API Reference

Table of contents:

- [MySql](#mysql)
  - [database](#mysqldatabase)
- [Database](#database)
  - [create](#databasecreate)
  - [table](#databasetable)
- [Table](#table)
  - [id](#tableid)
  - [int](#tableint)
  - [decimal](#tabledecimal)
  - [string](#tablestring)
  - [enum](#tableenum)
  - [date](#tabledate)
  - [time](#tabletime)
  - [datetime](#tabledatetime)
  - [blob](#tableblob)
  - [renameColumn](#tablerenamecolumn)
  - [addColumnIndex](#tableaddcolumnindex)
  - [dropColumnIndex](#tabledropcolumnindex)
  - [setColumnNullable](#tablesetcolumnnullable)
  - [setColumnDefault](#tablesetcolumndefault)
  - [drop](#tabledrop)

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
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .id()
```

### int

The `int` method is used to create an integer column. By default, the column type will be `INT` but this can be changed to another integer type using the `type` option.

#### Parameters
- `name: string`: The name of the column
- `options?`: An object containing the column options
  - `type?: IntColumnTypeEnum`: The type of the column. Defaults to `IntColumnTypeEnum.INT`.
  - `nullable?: boolean`: Whether the column can be null. Defaults to `false`.
  - `primaryKey?: boolean`: Whether the column is a primary key. Defaults to `false`.
  - `default?: number`: The default value of the column. Defaults to `undefined`.
  - `unsigned?: boolean`: Whether the column is unsigned. Defaults to `false`.
  - `autoIncrement?: boolean`: Whether the column is auto-incrementing. Defaults to `false`.
  - `zeroFill?: boolean`: Whether the column is zero-filled. Defaults to `false`.
  - `index?: boolean`: Whether the column is indexed. Defaults to `false`.

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .int(
    "age", 
    {
      nullable: true,
      index: true
    }
  )
```

### decimal

The `decimal` method is used to create a column with type `DECIMAL`. By default, the column type will be `DECIMAL(10, 2)` but this can be changed using the `precision` and `scale` options.

#### Parameters
- `name: string`: The name of the column
- `options?`: An object containing the column options
  - `nullable?: boolean`: Whether the column can be null. Defaults to `false`.
  - `default?: boolean`: The default value of the column. Defaults to `undefined`.
  - `unsigned?: boolean`: Whether the column is unsigned. Defaults to `false`.
  - `zeroFill?: boolean`: Whether the column is zero-filled. Defaults to `false`.
  - `precision?: boolean`: The number of digits in the number. Defaults to `10`.
  - `scale?: boolean`: The number of digits to the right of the decimal point. Defaults to `2`.
  - `index?: boolean`: Whether the column is indexed. Defaults to `false`.

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .decimal(
    "balance", 
    {
      nullable: true,
      index: true,
      precision: 10,
      scale: 2
    }
  )
```

### string

The `string` method is used to create a string column. By default, the column type will be `VARCHAR(255)` but this can be changed using the `type` and `length` options.

#### Parameters
- `name: string`: The name of the column
- `options?`: An object containing the column options
  - `type?: StringColumnTypeEnum`: The type of the column. Defaults to `StringColumnTypeEnum.VARCHAR`.
  - `nullable?: boolean`: Whether the column can be null. Defaults to `false`.
  - `primaryKey?: boolean`: Whether the column is a primary key. Defaults to `false`.
  - `default?: boolean`: The default value of the column. Defaults to `undefined`.
  - `length?: boolean`: The length of the column. Defaults to `255` (if type supports length i.e. `CHAR` and `VARCHAR`).
  - `index?: boolean`: Whether the column is indexed. Defaults to `false`.

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .string(
    "name", 
    {
      nullable: true,
      index: true,
      length: 200
    }
  )
```

### enum

The `enum` method is used to create a column with type `ENUM`.

#### Parameters
- `name: string`: The name of the column
- `values: Array<string>`: The possible values of the column
- `options?`: An object containing the column options
  - `nullable?: boolean`: Whether the column can be null. Defaults to `false`.
  - `default?: string`: The default value of the column. Defaults to `undefined`.
  - `index?: boolean`: Whether the column is indexed. Defaults to `false`.

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .enum(
    "role", 
    ["admin", "user"],
    {
      nullable: true,
      index: true
    }
  )
```

### date

The `date` method is used to create a column with type `DATE`.

#### Parameters

- `name: string`: The name of the column
- `options?`: An object containing the column options
  - `nullable: boolean`: Whether the column can be null. Defaults to `false`.
  - `default: string`: The default value of the column. Defaults to `undefined`.
  - `index: boolean`: Whether the column is indexed. Defaults to `false`.

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .date(
    "created", 
    {
      nullable: true,
      index: true
    }
  )
```

### time

The `time` method is used to create a column with type `TIME`.

#### Parameters

- `name: string`: The name of the column
- `options?`: An object containing the column options
  - `nullable: boolean`: Whether the column can be null. Defaults to `false`.
  - `default: string`: The default value of the column. Defaults to `undefined`.`

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .time(
    "start", 
    {
      nullable: true,
      index: true
    }
  )
```

### datetime

The `datetime` method is used to create a column with type `DATETIME`.

#### Parameters
- `name: string`: The name of the column
- `options?`: An object containing the column options
  - `nullable: boolean`: Whether the column can be null. Defaults to `false`.
  - `default: string`: The default value of the column. Defaults to `undefined`.
  - `index: boolean`: Whether the column is indexed. Defaults to `false`.

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .datetime(
    "created", 
    {
      nullable: true,
      index: true
    }
  )
```

### blob

The `blob` method is used to create a blob column. By default, the column type will be `BLOB` but this can be changed to another blob type using the `type` option.

#### Parameters

- `name: string`: The name of the column
- `options?`: An object containing the column options
  - `type: BlobColumnTypeEnum`: The type of the column. Defaults to `BlobColumnTypeEnum.BLOB`.
  - `nullable: boolean`: Whether the column can be null. Defaults to `false`.

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .create("users")
  .blob(
    "avatar", 
    {
      nullable: true
    }
  )
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

### addColumnIndex

The `addColumnIndex` method is used to add an index to a column in the table.

#### Parameters

- `name: string`: The name of the column

#### Returns
- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .addColumnIndex("name")
```

### dropColumnIndex

The `dropColumnIndex` method is used to drop an index from a column in the table.

#### Parameters

- `name: string`: The name of the column

#### Returns

- An instance of the `Table` class

#### Example

```js

mysql
  .database("app")
  .table("users")
  .dropColumnIndex("name")
```

### setColumnNullable

The `setColumnNullable` method is used to set whether a column value can be null.

#### Parameters

- `name: string`: The name of the column
- `nullable: boolean`: Whether the column can be null

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .setColumnNullable("name", true)
```

### setColumnDefault

The `setColumnDefault` method is used to set the default value of a column.

#### Parameters

- `name: string`: The name of the column

#### Returns

- An instance of the `Table` class

#### Example

```js
mysql
  .database("app")
  .table("users")
  .setColumnDefault("name", "John Doe")
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

## License

[MIT](https://choosealicense.com/licenses/mit/)
