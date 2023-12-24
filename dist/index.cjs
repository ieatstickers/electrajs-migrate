(()=>{"use strict";var t={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},d:(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{AbstractMigration:()=>n,MySql:()=>P});class n{}const i=require("@electra/utility"),s=require("chalk");var o,a=t.n(s);class l{static red(t){console.log(a().redBright(t))}static blue(t){console.log(a().blueBright(t))}static green(t){console.log(a().greenBright(t))}static yellow(t){console.log(a().yellowBright(t))}}class r{constructor(t){this.columnExists=!1,this.name=t;const{valid:e,message:n}=this.validateColumnName(this.name);if(!e)throw new TypeError(`Invalid ${this.constructor.name} name: ${n}`)}getIndexDefinition(){return null}getName(){return this.name}exists(){return this.columnExists}update(){return this.columnExists=!0,this}validateColumnName(t){return i.Validators.all([i.Validators.string(),i.Validators.minLength(1),i.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(t)}validateOptions(t,e){const{valid:n,message:s}=i.Validators.schema(e).validate(t);if(!n)throw new TypeError(`Invalid ${this.constructor.name} options. ${s}`);return!0}addNullableStatement(t,e){return e?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,e){return void 0!==e?`${t} DEFAULT ${e}`:t}addIndexStatement(t,e,n){return e?`${t}, ADD INDEX (${n})`:t}addUnsignedStatement(t,e){return e?`${t} UNSIGNED`:t}addZeroFillStatement(t,e){return e?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,e){return e?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,e){return e?`${t} PRIMARY KEY`:t}addAfterStatement(t,e,n){return!n&&e&&l.yellow("WARNING: addAfter option is ignored when creating a new table."),n?(e&&(t+=` AFTER ${e}`),t):t}}!function(t){t.INDEX="INDEX",t.UNIQUE="UNIQUE",t.FULLTEXT="FULLTEXT"}(o||(o={}));class u{constructor(){this.indexColumns=[],this.indexType=o.INDEX}static create(){return new u}defaultName(t){return this.defaultIndexName=t,this}name(t){return this.indexName=t,this}columns(...t){return this.indexColumns.push(...t),this}type(t){return this.indexType=t,this}get(){if(!this.indexColumns.length)throw new Error("No columns defined for index");const t=this.indexName||this.defaultIndexName;let e=t&&this.indexType===o.UNIQUE?`${this.indexType} INDEX`:this.indexType;return t&&(e+=` \`${t}\``),e+=` (${this.indexColumns.map((t=>`\`${t}\``)).join(", ")})`,e}}var d,h,c;class p{constructor(t,e){this.options={nullable:void 0,default:void 0,dropDefault:void 0,unsigned:void 0,autoIncrement:void 0,zeroFill:void 0,primaryKey:void 0,after:void 0},this.existingOptions={},this.name=t,this.type=e}static create(t,e){return new p(t,e)}nullable(t){return this.options.nullable=t,this}default(t){return this.options.default=t,this}dropDefault(){return this.options.dropDefault=!0,this}unsigned(t){return this.options.unsigned=t,this}autoIncrement(t){return this.options.autoIncrement=t,this}zeroFill(t){return this.options.zeroFill=t,this}primaryKey(t){return this.options.primaryKey=t,this}after(t){return this.options.after=t,this}get(){let t=`\`${this.name}\` ${this.type}`;!0===("boolean"==typeof this.options.unsigned?this.options.unsigned:this.existingOptions.unsigned)&&(t+=" UNSIGNED"),t+=!0===("boolean"==typeof this.options.nullable?this.options.nullable:this.existingOptions.nullable)?" NULL":" NOT NULL";const e=void 0!==this.options.default?this.options.default:this.existingOptions.default;return null===e?t+=" DEFAULT NULL":void 0!==e?t+=` DEFAULT ${e}`:!0===this.options.dropDefault&&(t+=" DROP DEFAULT"),!0===("boolean"==typeof this.options.autoIncrement?this.options.autoIncrement:this.existingOptions.autoIncrement)&&(t+=" AUTO_INCREMENT"),!0===("boolean"==typeof this.options.zeroFill?this.options.zeroFill:this.existingOptions.zeroFill)&&(t+=" ZEROFILL"),!0===("boolean"==typeof this.options.primaryKey?this.options.primaryKey:this.existingOptions.primaryKey)&&(t+=" PRIMARY KEY"),"string"==typeof this.options.after&&(t+=` AFTER \`${this.options.after}\``),t}hydrateExistingOptions(t,e,n){return i=this,s=void 0,a=function*(){const[i]=yield t.query(`\n      SELECT\n        *\n      FROM\n        INFORMATION_SCHEMA.COLUMNS\n      WHERE\n        TABLE_NAME = \`${n}\`\n        AND COLUMN_NAME = \`${e}\`;\n    `);if(!i)throw new Error(`Column "${e}" does not exist in table "${n}"`);this.existingType=i.COLUMN_TYPE.split(" ").shift(),this.existingOptions.nullable="YES"===i.IS_NULLABLE,this.existingOptions.default=null===i.COLUMN_DEFAULT&&"NO"===i.IS_NULLABLE?void 0:i.COLUMN_DEFAULT,this.existingOptions.dropDefault=!1,this.existingOptions.unsigned=i.COLUMN_TYPE.includes("unsigned"),this.existingOptions.autoIncrement=i.EXTRA.includes("auto_increment"),this.existingOptions.zeroFill=i.COLUMN_TYPE.includes("zerofill"),this.existingOptions.primaryKey="PRI"===i.COLUMN_KEY},new((o=void 0)||(o=Promise))((function(t,e){function n(t){try{r(a.next(t))}catch(t){e(t)}}function l(t){try{r(a.throw(t))}catch(t){e(t)}}function r(e){var i;e.done?t(e.value):(i=e.value,i instanceof o?i:new o((function(t){t(i)}))).then(n,l)}r((a=a.apply(i,s||[])).next())}));var i,s,o,a}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB",t.DATE="DATE",t.DATETIME="DATETIME",t.DECIMAL="DECIMAL",t.DOUBLE="DOUBLE",t.ENUM="ENUM",t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT",t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT",t.TIME="TIME"}(d||(d={}));class m extends r{constructor(){super(...arguments),this.options={},this.type=d.INT}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.nullable: ${n}`);return this.options.nullable=t,this}default(t){const{valid:e,message:n}=i.Validators.integer().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.default: ${n}`);return this.options.default=t,this}unsigned(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.unsigned: ${n}`);return this.options.unsigned=t,this}autoIncrement(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.autoIncrement: ${n}`);return this.options.autoIncrement=t,this}zeroFill(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.zeroFill: ${n}`);return this.options.zeroFill=t,this}primaryKey(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.primaryKey: ${n}`);return this.options.primaryKey=t,this}index(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.index: ${n}`);return this.options.index=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,this.type).nullable(this.options.nullable).default(this.options.default).unsigned(this.options.unsigned).autoIncrement(this.options.autoIncrement).zeroFill(this.options.zeroFill).primaryKey(this.options.primaryKey).after(this.options.after)}getIndexDefinition(){return this.options.index?u.create().columns(this.name):null}}class f extends r{constructor(t,e=8,n=2){super(t),this.options={},this.precision=e,this.scale=n;const s=i.Validators.integer(),{valid:o,message:a}=s.validate(e);if(!1===o)throw new TypeError(`Invalid precision value passed to DecimalColumn.constructor: ${a}`);const{valid:l,message:r}=s.validate(n);if(!1===l)throw new TypeError(`Invalid scale value passed to DecimalColumn.constructor: ${r}`)}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.nullable: ${n}`);return this.options.nullable=t,this}default(t){const{valid:e,message:n}=i.Validators.number().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.default: ${n}`);return this.options.default=t,this}unsigned(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.unsigned: ${n}`);return this.options.unsigned=t,this}zeroFill(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.zeroFill: ${n}`);return this.options.zeroFill=t,this}index(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.index: ${n}`);return this.options.index=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,`${d.DECIMAL}(${this.precision}, ${this.scale})`).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.scale):void 0).unsigned(this.options.unsigned).zeroFill(this.options.zeroFill).after(this.options.after)}getIndexDefinition(){return this.options.index?u.create().columns(this.name):null}}class v extends r{constructor(t,e=255){super(t),this.options={},this.type=d.VARCHAR,this.length=e;const{valid:n,message:s}=i.Validators.integer().validate(e);if(!1===n)throw new TypeError(`Invalid value passed to StringColumn.constructor: ${s}`)}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.nullable: ${n}`);return this.options.nullable=t,this}primaryKey(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.primaryKey: ${n}`);return this.options.primaryKey=t,this}default(t){const{valid:e,message:n}=i.Validators.string().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.default: ${n}`);return this.options.default=t,this}index(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.index: ${n}`);return this.options.index=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,`${this.type}(${this.length})`).nullable(this.options.nullable).primaryKey(this.options.primaryKey).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return this.options.index?u.create().columns(this.name):null}}class g extends r{constructor(){super(...arguments),this.options={}}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateColumn.nullable: ${n}`);return this.options.nullable=t,this}default(t){const{valid:e,message:n}=i.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD").validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateColumn.default: ${n}`);return this.options.default=t,this}index(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateColumn.index: ${n}`);return this.options.index=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DateColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,d.DATE).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return this.options.index?u.create().columns(this.name):null}}class T extends r{constructor(){super(...arguments),this.options={}}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to TimeColumn.nullable: ${n}`);return this.options.nullable=t,this}default(t){const{valid:e,message:n}=i.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}).validate(t);if(!1===e)throw new TypeError(`Invalid value passed to TimeColumn.default: ${n}`);return this.options.default=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to TimeColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,d.TIME).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}}class E extends r{constructor(){super(...arguments),this.options={}}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateTimeColumn.nullable: ${n}`);return this.options.nullable=t,this}default(t){const{valid:e,message:n}=i.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS").validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateTimeColumn.default: ${n}`);return this.options.default=t,this}index(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateTimeColumn.index: ${n}`);return this.options.index=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DateTimeColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,d.DATETIME).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return this.options.index?u.create().columns(this.name):null}}class y extends r{constructor(){super(...arguments),this.options={},this.type=d.BLOB}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to BlobColumn.nullable: ${n}`);return this.options.nullable=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to BlobColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,this.type).nullable(this.options.nullable).after(this.options.after)}}class I extends r{constructor(t,e){super(t),this.options={},this.values=e;const{valid:n,message:s}=i.Validators.all([i.Validators.array(i.Validators.all([i.Validators.string(),i.Validators.minLength(1)])),i.Validators.minLength(1)]).validate(this.values);if(!n)throw new TypeError(`Invalid ${this.constructor.name} values. ${s}`)}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to EnumColumn.nullable: ${n}`);return this.options.nullable=t,this}default(t){const{valid:e,message:n}=i.Validators.string().validate(t),s={};for(const t of this.values)s[t]=t;const{valid:o,message:a}=i.Validators.enumValue(s).validate(t);if(!1===e||!1===o)throw new TypeError(`Invalid value passed to EnumColumn.default: ${n||a}`);return this.options.default=t,this}index(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to EnumColumn.index: ${n}`);return this.options.index=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to EnumColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,`${d.ENUM}('${this.values.join("', '")}')`).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return this.options.index?u.create().columns(this.name):null}}class w extends r{constructor(t,e,n){super(t),this.options={},this.precision=e,this.scale=n;const s=i.Validators.integer({optional:!0}),{valid:o,message:a}=s.validate(e);if(!1===o)throw new TypeError(`Invalid precision value passed to DoubleColumn.constructor: ${a}`);const{valid:l,message:r}=s.validate(n);if(!1===l)throw new TypeError(`Invalid scale value passed to DoubleColumn.constructor: ${r}`);if(!(null==this.precision&&null==this.scale||null!=this.precision&&null!=this.scale))throw new Error(`Precision and scale must be both defined or both undefined in column ${this.name}`)}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.nullable: ${n}`);return this.options.nullable=t,this}default(t){const{valid:e,message:n}=i.Validators.number().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.default: ${n}`);return this.options.default=t,this}zeroFill(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.zeroFill: ${n}`);return this.options.zeroFill=t,this}index(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.index: ${n}`);return this.options.index=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){const t=null!=this.precision&&null!=this.scale?`${d.DOUBLE}(${this.precision}, ${this.scale})`:d.DOUBLE;return p.create(this.name,t).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.scale):void 0).zeroFill(this.options.zeroFill).after(this.options.after)}getIndexDefinition(){return this.options.index?u.create().columns(this.name):null}}!function(t){t.UTF8="utf8",t.UTF8MB4="utf8mb4"}(h||(h={})),function(t){t.UTF8_GENERAL_CI="utf8_general_ci",t.UTF8MB4_GENERAL_CI="utf8mb4_general_ci",t.UTF8MB4_UNICODE_CI="utf8mb4_unicode_ci"}(c||(c={}));class b{constructor(t,e){this.currentName=t,this.newName=e}getModificationDefinition(){return`RENAME COLUMN \`${this.currentName}\` TO \`${this.newName}\``}}class D{constructor(t){this.name=t}getModificationDefinition(){return`DROP COLUMN \`${this.name}\``}}class N{constructor(t){this.definition=t}getModificationDefinition(){return`ADD ${this.definition.get()}`}}class x{constructor(t){this.name=t}getModificationDefinition(){return`DROP INDEX \`${this.name}\``}}class ${constructor(t,e){this.name=t,this.nullable=e}getModificationDefinition(){return`MODIFY COLUMN \`${this.name}\` ${this.nullable?"NULL":"NOT NULL"}`}}class C{constructor(t,e){this.name=t,this.defaultValue=e}getModificationDefinition(){let t=this.defaultValue;return"string"==typeof t?t=`'${t}'`:null==t&&(t="NULL"),`MODIFY COLUMN \`${this.name}\` DEFAULT ${t}`}}class M{constructor(t){this.name=t}getModificationDefinition(){return`DROP TABLE IF EXISTS \`${this.name}\``}}class L extends y{constructor(){super(...arguments),this.type=d.TINYBLOB}}class O extends y{constructor(){super(...arguments),this.type=d.MEDIUMBLOB}}class A extends y{constructor(){super(...arguments),this.type=d.LONGBLOB}}class U extends m{constructor(){super(...arguments),this.type=d.SMALLINT}}class F extends m{constructor(){super(...arguments),this.type=d.TINYINT}}class V extends m{constructor(){super(...arguments),this.type=d.MEDIUMINT}}class B extends m{constructor(){super(...arguments),this.type=d.BIGINT}}class S extends r{constructor(){super(...arguments),this.options={},this.type=d.TEXT}nullable(t=!0){const{valid:e,message:n}=i.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to TextColumn.nullable: ${n}`);return this.options.nullable=t,this}after(t){const{valid:e,message:n}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to TextColumn.after: ${n}`);return this.options.after=t,this}getColumnDefinition(){return p.create(this.name,this.type).nullable(this.options.nullable).after(this.options.after)}}class _ extends S{constructor(){super(...arguments),this.type=d.TINYTEXT}}class R extends S{constructor(){super(...arguments),this.type=d.MEDIUMTEXT}}class Y extends S{constructor(){super(...arguments),this.type=d.LONGTEXT}}class z{constructor(t,e,n,i,s){this.columns=[],this.alterModifications=[],this.standaloneModifications=[],this.name=t,this.connection=e,this.tableExists=i;const o=Object.assign({},{encoding:h.UTF8MB4,collation:c.UTF8MB4_GENERAL_CI},s);n.push((()=>{return t=this,e=void 0,i=function*(){if(0===this.columns.length&&0===this.alterModifications.length&&0===this.standaloneModifications.length)return;const{columnsToAdd:t,columnsToModify:e}=this.columns.reduce(((t,e)=>(e.exists()?t.columnsToModify.push(e):t.columnsToAdd.push(e),t)),{columnsToAdd:[],columnsToModify:[]});if(yield Promise.all(e.map((t=>t.getColumnDefinition().hydrateExistingOptions(this.connection,t.getName(),this.name)))),!this.tableExists&&t.length>0){const e=this.getCreateTableQuery(t,o);e&&(yield this.connection.query(e),this.tableExists=!0,t.splice(0,t.length))}if(t.length>0||e.length>0||this.alterModifications.length>0){const n=this.getAlterTableQuery(t,e,this.alterModifications);n&&(yield this.connection.query(n))}if(this.standaloneModifications.length>0){const t=this.standaloneModifications.map((t=>t.getModificationDefinition())).join("; ");yield this.connection.query(`${t};`)}},new((n=void 0)||(n=Promise))((function(s,o){function a(t){try{r(i.next(t))}catch(t){o(t)}}function l(t){try{r(i.throw(t))}catch(t){o(t)}}function r(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,l)}r((i=i.apply(t,e||[])).next())}));var t,e,n,i}))}id(t="id"){const e=new m(t).unsigned().autoIncrement().primaryKey();return this.columns.push(e),e}int(t){const e=new m(t);return this.columns.push(e),e}tinyint(t){const e=new F(t);return this.columns.push(e),e}smallint(t){const e=new U(t);return this.columns.push(e),e}mediumint(t){const e=new V(t);return this.columns.push(e),e}bigint(t){const e=new B(t);return this.columns.push(e),e}decimal(t,e=8,n=2){const i=new f(t,e,n);return this.columns.push(i),i}double(t,e,n){const i=new w(t,e,n);return this.columns.push(i),i}string(t,e=255){const n=new v(t,e);return this.columns.push(n),n}text(t){const e=new S(t);return this.columns.push(e),e}tinytext(t){const e=new _(t);return this.columns.push(e),e}mediumtext(t){const e=new R(t);return this.columns.push(e),e}longtext(t){const e=new Y(t);return this.columns.push(e),e}enum(t,e){const n=new I(t,e);return this.columns.push(n),n}date(t){const e=new g(t);return this.columns.push(e),e}time(t){const e=new T(t);return this.columns.push(e),e}datetime(t){const e=new E(t);return this.columns.push(e),e}blob(t){const e=new y(t);return this.columns.push(e),e}tinyblob(t){const e=new L(t);return this.columns.push(e),e}mediumblob(t){const e=new O(t);return this.columns.push(e),e}longblob(t){const e=new A(t);return this.columns.push(e),e}renameColumn(t,e){return this.alterModifications.push(new b(t,e)),this}dropColumn(t){return this.alterModifications.push(new D(t)),this}addIndex(t,e,n){const i=u.create().defaultName(this.getDefaultIndexName(...t)).columns(...t);return e&&i.name(e),n&&i.type(n),this.alterModifications.push(new N(i)),this}dropIndex(...t){const[e]=t,n=Array.isArray(e)?this.getDefaultIndexName(...e):e;return this.alterModifications.push(new x(n)),this}setNullable(t,e){return this.alterModifications.push(new $(t,e)),this}setDefault(t,e){return this.alterModifications.push(new C(t,e)),this}drop(){return this.standaloneModifications.push(new M(this.name)),this}getDefaultIndexName(...t){const e=t.sort().join("_").toLowerCase();return`${this.name.toLowerCase()}_${e}_index`}getCreateTableQuery(t,e){const n=[...t.map((t=>t.getColumnDefinition().get())),...t.map((t=>{const e=t.getIndexDefinition();return e?e.defaultName(this.getDefaultIndexName(t.getName())).get():null})).filter((t=>null!=t))];let i="";return e.encoding&&(i+=` DEFAULT CHARACTER SET ${e.encoding}`),e.collation&&(i+=` DEFAULT COLLATE ${e.collation}`),`CREATE TABLE \`${this.name}\` (${n.join(", ")})${i};`}getAlterTableQuery(t,e,n){const i=[...t.map((t=>`ADD COLUMN ${t.getColumnDefinition().get()}`)),...t.map((t=>{const e=t.getIndexDefinition();return e?(e.defaultName(this.getDefaultIndexName(t.getName())),`ADD ${e.get()}`):null})).filter((t=>null!=t)),...e.map((t=>`MODIFY COLUMN ${t.getColumnDefinition().get()}`)),...n.map((t=>t.getModificationDefinition()))];return 0===i.length?null:`ALTER TABLE \`${this.name}\` ${i.join(", ")};`}}class X{constructor(t,e){this.connection=t,this.operations=e}create(t,e){return new z(t,this.connection,this.operations,!1,e)}table(t){return new z(t,this.connection,this.operations,!0)}}var K=function(t,e,n,i){return new(n||(n=Promise))((function(s,o){function a(t){try{r(i.next(t))}catch(t){o(t)}}function l(t){try{r(i.throw(t))}catch(t){o(t)}}function r(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,l)}r((i=i.apply(t,e||[])).next())}))};class P{constructor(t){this.operations=[],this.connections=t}database(t,e){let n;if(e)n=this.connections.get(e);else{const e=this.connections.getAllByDatabaseName(t);if(0===e.length)throw new Error(`No connections found for database "${t}"`);if(e.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);n=e[0]}return this.operations.push((()=>K(this,void 0,void 0,(function*(){yield n.query(`CREATE DATABASE IF NOT EXISTS ${yield n.escape(t)};`)})))),this.operations.push((()=>K(this,void 0,void 0,(function*(){yield n.query(`USE ${yield n.escape(t)};`)})))),new X(n,this.operations)}executePendingOperations(){return K(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}module.exports=e})();
//# sourceMappingURL=index.cjs.map