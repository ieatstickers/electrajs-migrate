import*as t from"@electra/utility";import*as e from"chalk";var i={d:(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},n={};i.d(n,{l:()=>s,z:()=>j});class s{}const o=(a={Validators:()=>t.Validators},r={},i.d(r,a),r);var a,r;const l=(t=>{var e={};return i.d(e,t),e})({default:()=>e.default});class u{static red(t){console.log(l.default.redBright(t))}static blue(t){console.log(l.default.blueBright(t))}static green(t){console.log(l.default.greenBright(t))}static yellow(t){console.log(l.default.yellowBright(t))}}class d{constructor(t){this.columnExists=!1,this.name=t;const{valid:e,message:i}=this.validateColumnName(this.name);if(!e)throw new TypeError(`Invalid ${this.constructor.name} name: ${i}`)}getIndexDefinition(){return null}getName(){return this.name}exists(){return this.columnExists}update(){return this.columnExists=!0,this}validateColumnName(t){return o.Validators.all([o.Validators.string(),o.Validators.minLength(1),o.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(t)}validateOptions(t,e){const{valid:i,message:n}=o.Validators.schema(e).validate(t);if(!i)throw new TypeError(`Invalid ${this.constructor.name} options. ${n}`);return!0}addNullableStatement(t,e){return e?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,e){return void 0!==e?`${t} DEFAULT ${e}`:t}addIndexStatement(t,e,i){return e?`${t}, ADD INDEX (${i})`:t}addUnsignedStatement(t,e){return e?`${t} UNSIGNED`:t}addZeroFillStatement(t,e){return e?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,e){return e?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,e){return e?`${t} PRIMARY KEY`:t}addAfterStatement(t,e,i){return!i&&e&&u.yellow("WARNING: addAfter option is ignored when creating a new table."),i?(e&&(t+=` AFTER ${e}`),t):t}}var h;!function(t){t.INDEX="INDEX",t.UNIQUE="UNIQUE",t.FULLTEXT="FULLTEXT"}(h||(h={}));class p{constructor(){this.indexColumns=[],this.indexType=h.INDEX,this.dropIndex=!1}static create(){return new p}isDrop(){return this.dropIndex}drop(t=!0){return this.dropIndex=t,this}defaultName(t){return this.defaultIndexName=t,this}name(t){return this.indexName=t,this}columns(...t){return this.indexColumns.push(...t),this}type(t){return this.indexType=t,this}get(){if(!this.isDrop()&&!this.indexColumns.length)throw new Error("No columns defined for index");const t=this.indexName||this.defaultIndexName;if(!t&&this.isDrop())throw new Error("No index name defined for drop index");let e=t&&this.indexType===h.UNIQUE?`${this.indexType} INDEX`:this.indexType;return t&&(e+=` \`${t}\``),this.isDrop()||(e+=` (${this.indexColumns.map((t=>`\`${t}\``)).join(", ")})`),e}}var c,m,f;class v{constructor(t,e){this.options={nullable:void 0,default:void 0,dropDefault:void 0,unsigned:void 0,autoIncrement:void 0,zeroFill:void 0,primaryKey:void 0,after:void 0},this.existingOptions={},this.name=t,this.type=e}static create(t,e){return new v(t,e)}nullable(t){return this.options.nullable=t,this}default(t){return this.options.default=t,this}dropDefault(){return this.options.dropDefault=!0,this}unsigned(t){return this.options.unsigned=t,this}autoIncrement(t){return this.options.autoIncrement=t,this}zeroFill(t){return this.options.zeroFill=t,this}primaryKey(t){return this.options.primaryKey=t,this}after(t){return this.options.after=t,this}get(){let t=`\`${this.name}\` ${this.type}`;!0===("boolean"==typeof this.options.unsigned?this.options.unsigned:this.existingOptions.unsigned)&&(t+=" UNSIGNED"),t+=!0===("boolean"==typeof this.options.nullable?this.options.nullable:this.existingOptions.nullable)?" NULL":" NOT NULL";const e=void 0!==this.options.default?this.options.default:this.existingOptions.default;return null===e?t+=" DEFAULT NULL":void 0!==e?t+=` DEFAULT ${e}`:!0===this.options.dropDefault&&(t+=" DROP DEFAULT"),!0===("boolean"==typeof this.options.autoIncrement?this.options.autoIncrement:this.existingOptions.autoIncrement)&&(t+=" AUTO_INCREMENT"),!0===("boolean"==typeof this.options.zeroFill?this.options.zeroFill:this.existingOptions.zeroFill)&&(t+=" ZEROFILL"),!0===("boolean"==typeof this.options.primaryKey?this.options.primaryKey:this.existingOptions.primaryKey)&&(t+=" PRIMARY KEY"),"string"==typeof this.options.after&&(t+=` AFTER \`${this.options.after}\``),t}hydrateExistingOptions(t,e,i){return n=this,s=void 0,a=function*(){const[n]=yield t.query(`\n      SELECT\n        *\n      FROM\n        INFORMATION_SCHEMA.COLUMNS\n      WHERE\n        TABLE_NAME = '${i}'\n        AND COLUMN_NAME = '${e}';\n    `);if(!n)throw new Error(`Column "${e}" does not exist in table "${i}"`);this.existingType=n.COLUMN_TYPE.split(" ").shift(),this.existingOptions.nullable="YES"===n.IS_NULLABLE,this.existingOptions.default=null===n.COLUMN_DEFAULT&&"NO"===n.IS_NULLABLE?void 0:n.COLUMN_DEFAULT,this.existingOptions.dropDefault=!1,this.existingOptions.unsigned=n.COLUMN_TYPE.includes("unsigned"),this.existingOptions.autoIncrement=n.EXTRA.includes("auto_increment"),this.existingOptions.zeroFill=n.COLUMN_TYPE.includes("zerofill"),this.existingOptions.primaryKey="PRI"===n.COLUMN_KEY},new((o=void 0)||(o=Promise))((function(t,e){function i(t){try{l(a.next(t))}catch(t){e(t)}}function r(t){try{l(a.throw(t))}catch(t){e(t)}}function l(e){var n;e.done?t(e.value):(n=e.value,n instanceof o?n:new o((function(t){t(n)}))).then(i,r)}l((a=a.apply(n,s||[])).next())}));var n,s,o,a}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB",t.DATE="DATE",t.DATETIME="DATETIME",t.DECIMAL="DECIMAL",t.DOUBLE="DOUBLE",t.ENUM="ENUM",t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT",t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT",t.TIME="TIME"}(c||(c={}));class g extends d{constructor(){super(...arguments),this.options={},this.type=c.INT}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.nullable: ${i}`);return this.options.nullable=t,this}default(t){const{valid:e,message:i}=o.Validators.integer().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.default: ${i}`);return this.options.default=t,this}unsigned(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.unsigned: ${i}`);return this.options.unsigned=t,this}autoIncrement(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.autoIncrement: ${i}`);return this.options.autoIncrement=t,this}zeroFill(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.zeroFill: ${i}`);return this.options.zeroFill=t,this}primaryKey(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.primaryKey: ${i}`);return this.options.primaryKey=t,this}index(){return this.options.index=!0,this}dropIndex(){return this.options.dropIndex=!0,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to IntColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,this.type).nullable(this.options.nullable).default(this.options.default).unsigned(this.options.unsigned).autoIncrement(this.options.autoIncrement).zeroFill(this.options.zeroFill).primaryKey(this.options.primaryKey).after(this.options.after)}getIndexDefinition(){return console.log("IntColumn.getIndexDefinition",this.name,{"this.options.index":this.options.index,"this.exists()":this.exists(),"this.options.dropIndex":this.options.dropIndex}),!this.options.index&&!this.exists()||!this.options.index&&!this.options.dropIndex?null:p.create().columns(this.name).drop(!0===this.options.dropIndex)}}class I extends d{constructor(t,e=8,i=2){super(t),this.options={},this.precision=e,this.scale=i;const n=o.Validators.integer(),{valid:s,message:a}=n.validate(e);if(!1===s)throw new TypeError(`Invalid precision value passed to DecimalColumn.constructor: ${a}`);const{valid:r,message:l}=n.validate(i);if(!1===r)throw new TypeError(`Invalid scale value passed to DecimalColumn.constructor: ${l}`)}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.nullable: ${i}`);return this.options.nullable=t,this}default(t){const{valid:e,message:i}=o.Validators.number().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.default: ${i}`);return this.options.default=t,this}unsigned(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.unsigned: ${i}`);return this.options.unsigned=t,this}zeroFill(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.zeroFill: ${i}`);return this.options.zeroFill=t,this}index(){return this.options.index=!0,this}dropIndex(){return this.options.dropIndex=!0,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DecimalColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,`${c.DECIMAL}(${this.precision}, ${this.scale})`).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.scale):void 0).unsigned(this.options.unsigned).zeroFill(this.options.zeroFill).after(this.options.after)}getIndexDefinition(){return!this.options.index&&!this.exists()||!this.options.index&&!this.options.dropIndex?null:p.create().columns(this.name).drop(!0===this.options.dropIndex)}}class T extends d{constructor(t,e=255){super(t),this.options={},this.type=c.VARCHAR,this.length=e;const{valid:i,message:n}=o.Validators.integer().validate(e);if(!1===i)throw new TypeError(`Invalid value passed to StringColumn.constructor: ${n}`)}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.nullable: ${i}`);return this.options.nullable=t,this}primaryKey(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.primaryKey: ${i}`);return this.options.primaryKey=t,this}default(t){const{valid:e,message:i}=o.Validators.string().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.default: ${i}`);return this.options.default=t,this}index(){return this.options.index=!0,this}dropIndex(){return this.options.dropIndex=!0,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to StringColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,`${this.type}(${this.length})`).nullable(this.options.nullable).primaryKey(this.options.primaryKey).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return this.options.index?p.create().columns(this.name):null}}class E extends d{constructor(){super(...arguments),this.options={}}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateColumn.nullable: ${i}`);return this.options.nullable=t,this}default(t){const{valid:e,message:i}=o.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD").validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateColumn.default: ${i}`);return this.options.default=t,this}index(){return this.options.index=!0,this}dropIndex(){return this.options.dropIndex=!0,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DateColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,c.DATE).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return!this.options.index&&!this.exists()||!this.options.index&&!this.options.dropIndex?null:p.create().columns(this.name).drop(!0===this.options.dropIndex)}}class x extends d{constructor(){super(...arguments),this.options={}}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to TimeColumn.nullable: ${i}`);return this.options.nullable=t,this}default(t){const{valid:e,message:i}=o.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}).validate(t);if(!1===e)throw new TypeError(`Invalid value passed to TimeColumn.default: ${i}`);return this.options.default=t,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to TimeColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,c.TIME).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}}class y extends d{constructor(){super(...arguments),this.options={}}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateTimeColumn.nullable: ${i}`);return this.options.nullable=t,this}default(t){const{valid:e,message:i}=o.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS").validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DateTimeColumn.default: ${i}`);return this.options.default=t,this}index(){return this.options.index=!0,this}dropIndex(){return this.options.dropIndex=!0,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DateTimeColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,c.DATETIME).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return!this.options.index&&!this.exists()||!this.options.index&&!this.options.dropIndex?null:p.create().columns(this.name).drop(!0===this.options.dropIndex)}}class w extends d{constructor(){super(...arguments),this.options={},this.type=c.BLOB}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to BlobColumn.nullable: ${i}`);return this.options.nullable=t,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to BlobColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,this.type).nullable(this.options.nullable).after(this.options.after)}}class b extends d{constructor(t,e){super(t),this.options={},this.values=e;const{valid:i,message:n}=o.Validators.all([o.Validators.array(o.Validators.all([o.Validators.string(),o.Validators.minLength(1)])),o.Validators.minLength(1)]).validate(this.values);if(!i)throw new TypeError(`Invalid ${this.constructor.name} values. ${n}`)}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to EnumColumn.nullable: ${i}`);return this.options.nullable=t,this}default(t){const{valid:e,message:i}=o.Validators.string().validate(t),n={};for(const t of this.values)n[t]=t;const{valid:s,message:a}=o.Validators.enumValue(n).validate(t);if(!1===e||!1===s)throw new TypeError(`Invalid value passed to EnumColumn.default: ${i||a}`);return this.options.default=t,this}index(){return this.options.index=!0,this}dropIndex(){return this.options.dropIndex=!0,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to EnumColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,`${c.ENUM}('${this.values.join("', '")}')`).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.after)}getIndexDefinition(){return!this.options.index&&!this.exists()||!this.options.index&&!this.options.dropIndex?null:p.create().columns(this.name).drop(!0===this.options.dropIndex)}}class D extends d{constructor(t,e,i){super(t),this.options={},this.precision=e,this.scale=i;const n=o.Validators.integer({optional:!0}),{valid:s,message:a}=n.validate(e);if(!1===s)throw new TypeError(`Invalid precision value passed to DoubleColumn.constructor: ${a}`);const{valid:r,message:l}=n.validate(i);if(!1===r)throw new TypeError(`Invalid scale value passed to DoubleColumn.constructor: ${l}`);if(!(null==this.precision&&null==this.scale||null!=this.precision&&null!=this.scale))throw new Error(`Precision and scale must be both defined or both undefined in column ${this.name}`)}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.nullable: ${i}`);return this.options.nullable=t,this}default(t){const{valid:e,message:i}=o.Validators.number().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.default: ${i}`);return this.options.default=t,this}zeroFill(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.zeroFill: ${i}`);return this.options.zeroFill=t,this}index(){return this.options.index=!0,this}dropIndex(){return this.options.dropIndex=!0,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to DoubleColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){const t=null!=this.precision&&null!=this.scale?`${c.DOUBLE}(${this.precision}, ${this.scale})`:c.DOUBLE;return v.create(this.name,t).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.scale):void 0).zeroFill(this.options.zeroFill).after(this.options.after)}getIndexDefinition(){return!this.options.index&&!this.exists()||!this.options.index&&!this.options.dropIndex?null:p.create().columns(this.name).drop(!0===this.options.dropIndex)}}!function(t){t.UTF8="utf8",t.UTF8MB4="utf8mb4"}(m||(m={})),function(t){t.UTF8_GENERAL_CI="utf8_general_ci",t.UTF8MB4_GENERAL_CI="utf8mb4_general_ci",t.UTF8MB4_UNICODE_CI="utf8mb4_unicode_ci"}(f||(f={}));class N{constructor(t,e){this.currentName=t,this.newName=e}getModificationDefinition(){return`RENAME COLUMN \`${this.currentName}\` TO \`${this.newName}\``}}class ${constructor(t){this.name=t}getModificationDefinition(){return`DROP COLUMN \`${this.name}\``}}class C{constructor(t){this.definition=t}getModificationDefinition(){return`ADD ${this.definition.get()}`}}class M{constructor(t){this.name=t}getModificationDefinition(){return`DROP INDEX \`${this.name}\``}}class L{constructor(t,e){this.name=t,this.nullable=e}getModificationDefinition(){return`MODIFY COLUMN \`${this.name}\` ${this.nullable?"NULL":"NOT NULL"}`}}class O{constructor(t,e){this.name=t,this.defaultValue=e}getModificationDefinition(){let t=this.defaultValue;return"string"==typeof t?t=`'${t}'`:null==t&&(t="NULL"),`MODIFY COLUMN \`${this.name}\` DEFAULT ${t}`}}class A{constructor(t){this.name=t}getModificationDefinition(){return`DROP TABLE IF EXISTS \`${this.name}\``}}class U extends w{constructor(){super(...arguments),this.type=c.TINYBLOB}}class F extends w{constructor(){super(...arguments),this.type=c.MEDIUMBLOB}}class B extends w{constructor(){super(...arguments),this.type=c.LONGBLOB}}class V extends g{constructor(){super(...arguments),this.type=c.SMALLINT}}class R extends g{constructor(){super(...arguments),this.type=c.TINYINT}}class S extends g{constructor(){super(...arguments),this.type=c.MEDIUMINT}}class _ extends g{constructor(){super(...arguments),this.type=c.BIGINT}}class Y extends d{constructor(){super(...arguments),this.options={},this.type=c.TEXT}nullable(t=!0){const{valid:e,message:i}=o.Validators.boolean().validate(t);if(!1===e)throw new TypeError(`Invalid value passed to TextColumn.nullable: ${i}`);return this.options.nullable=t,this}after(t){const{valid:e,message:i}=this.validateColumnName(t);if(!1===e)throw new TypeError(`Invalid value passed to TextColumn.after: ${i}`);return this.options.after=t,this}getColumnDefinition(){return v.create(this.name,this.type).nullable(this.options.nullable).after(this.options.after)}}class z extends Y{constructor(){super(...arguments),this.type=c.TINYTEXT}}class X extends Y{constructor(){super(...arguments),this.type=c.MEDIUMTEXT}}class K extends Y{constructor(){super(...arguments),this.type=c.LONGTEXT}}class P{constructor(t,e,i,n,s){this.columns=[],this.alterModifications=[],this.standaloneModifications=[],this.name=t,this.connection=e,this.tableExists=n;const o=Object.assign({},{encoding:m.UTF8MB4,collation:f.UTF8MB4_GENERAL_CI},s);i.push((()=>{return t=this,e=void 0,n=function*(){if(0===this.columns.length&&0===this.alterModifications.length&&0===this.standaloneModifications.length)return;const{columnsToAdd:t,columnsToModify:e}=this.columns.reduce(((t,e)=>(e.exists()?t.columnsToModify.push(e):t.columnsToAdd.push(e),t)),{columnsToAdd:[],columnsToModify:[]});if(yield Promise.all(e.map((t=>t.getColumnDefinition().hydrateExistingOptions(this.connection,t.getName(),this.name)))),!this.tableExists&&t.length>0){const e=this.getCreateTableQuery(t,o);e&&(yield this.connection.query(e),this.tableExists=!0,t.splice(0,t.length))}if(t.length>0||e.length>0||this.alterModifications.length>0){const i=this.getAlterTableQuery(t,e,this.alterModifications);i&&(yield this.connection.query(i))}if(this.standaloneModifications.length>0){const t=this.standaloneModifications.map((t=>t.getModificationDefinition())).join("; ");yield this.connection.query(`${t};`)}},new((i=void 0)||(i=Promise))((function(s,o){function a(t){try{l(n.next(t))}catch(t){o(t)}}function r(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}l((n=n.apply(t,e||[])).next())}));var t,e,i,n}))}id(t="id"){const e=new g(t).unsigned().autoIncrement().primaryKey();return this.columns.push(e),e}int(t){const e=new g(t);return this.columns.push(e),e}tinyint(t){const e=new R(t);return this.columns.push(e),e}smallint(t){const e=new V(t);return this.columns.push(e),e}mediumint(t){const e=new S(t);return this.columns.push(e),e}bigint(t){const e=new _(t);return this.columns.push(e),e}decimal(t,e=8,i=2){const n=new I(t,e,i);return this.columns.push(n),n}double(t,e,i){const n=new D(t,e,i);return this.columns.push(n),n}string(t,e=255){const i=new T(t,e);return this.columns.push(i),i}text(t){const e=new Y(t);return this.columns.push(e),e}tinytext(t){const e=new z(t);return this.columns.push(e),e}mediumtext(t){const e=new X(t);return this.columns.push(e),e}longtext(t){const e=new K(t);return this.columns.push(e),e}enum(t,e){const i=new b(t,e);return this.columns.push(i),i}date(t){const e=new E(t);return this.columns.push(e),e}time(t){const e=new x(t);return this.columns.push(e),e}datetime(t){const e=new y(t);return this.columns.push(e),e}blob(t){const e=new w(t);return this.columns.push(e),e}tinyblob(t){const e=new U(t);return this.columns.push(e),e}mediumblob(t){const e=new F(t);return this.columns.push(e),e}longblob(t){const e=new B(t);return this.columns.push(e),e}renameColumn(t,e){return this.alterModifications.push(new N(t,e)),this}dropColumn(t){return this.alterModifications.push(new $(t)),this}addIndex(t,e,i){const n=p.create().defaultName(this.getDefaultIndexName(...t)).columns(...t);return e&&n.name(e),i&&n.type(i),this.alterModifications.push(new C(n)),this}dropIndex(...t){const[e]=t,i=Array.isArray(e)?this.getDefaultIndexName(...e):e;return this.alterModifications.push(new M(i)),this}setNullable(t,e){return this.alterModifications.push(new L(t,e)),this}setDefault(t,e){return this.alterModifications.push(new O(t,e)),this}drop(){return this.standaloneModifications.push(new A(this.name)),this}getDefaultIndexName(...t){const e=t.sort().join("_").toLowerCase();return`${this.name.toLowerCase()}_${e}_index`}getCreateTableQuery(t,e){const i=[...t.map((t=>t.getColumnDefinition().get())),...t.map((t=>{const e=t.getIndexDefinition();return e?e.defaultName(this.getDefaultIndexName(t.getName())).get():null})).filter((t=>null!=t))];let n="";return e.encoding&&(n+=` DEFAULT CHARACTER SET ${e.encoding}`),e.collation&&(n+=` DEFAULT COLLATE ${e.collation}`),`CREATE TABLE \`${this.name}\` (${i.join(", ")})${n};`}getAlterTableQuery(t,e,i){const n=[...t.map((t=>`ADD COLUMN ${t.getColumnDefinition().get()}`)),...[...t,...e].map((t=>{const e=t.getIndexDefinition();return e?(e.defaultName(this.getDefaultIndexName(t.getName())),`${e.isDrop()?"DROP":"ADD"} ${e.get()}`):null})).filter((t=>null!=t)),...e.map((t=>`MODIFY COLUMN ${t.getColumnDefinition().get()}`)),...i.map((t=>t.getModificationDefinition()))];return 0===n.length?null:`ALTER TABLE \`${this.name}\` ${n.join(", ")};`}}class G{constructor(t,e){this.connection=t,this.operations=e}create(t,e){return new P(t,this.connection,this.operations,!1,e)}table(t){return new P(t,this.connection,this.operations,!0)}}var H=function(t,e,i,n){return new(i||(i=Promise))((function(s,o){function a(t){try{l(n.next(t))}catch(t){o(t)}}function r(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}l((n=n.apply(t,e||[])).next())}))};class j{constructor(t){this.operations=[],this.connections=t}database(t,e){let i;if(e)i=this.connections.get(e);else{const e=this.connections.getAllByDatabaseName(t);if(0===e.length)throw new Error(`No connections found for database "${t}"`);if(e.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);i=e[0]}return this.operations.push((()=>H(this,void 0,void 0,(function*(){yield i.query(`CREATE DATABASE IF NOT EXISTS ${yield i.escape(t)};`)})))),this.operations.push((()=>H(this,void 0,void 0,(function*(){yield i.query(`USE ${yield i.escape(t)};`)})))),new G(i,this.operations)}executePendingOperations(){return H(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}var q=n.l,Q=n.z;export{q as AbstractMigration,Q as MySql};
//# sourceMappingURL=index.mjs.map