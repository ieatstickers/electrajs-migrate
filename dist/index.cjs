(()=>{"use strict";var t,i={n:t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},d:(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o:(t,i)=>Object.prototype.hasOwnProperty.call(t,i),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};i.r(e),i.d(e,{AbstractMigration:()=>n,BlobColumnTypeEnum:()=>r,IntColumnTypeEnum:()=>t,MySql:()=>$,StringColumnTypeEnum:()=>l});class n{}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(t||(t={}));const o=require("@electra/utility"),s=require("chalk");var a,l,r,d=i.n(s);class u{static red(t){console.log(d().redBright(t))}static blue(t){console.log(d().blueBright(t))}static green(t){console.log(d().greenBright(t))}static yellow(t){console.log(d().yellowBright(t))}}class h{constructor(t){this.name=t,this.validateName(this.name)}getIndexDefinition(){return null}getName(){return this.name}validateName(t){const{valid:i,message:e}=o.Validators.all([o.Validators.string(),o.Validators.minLength(1),o.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(t);if(!i)throw new TypeError(`Invalid ${this.constructor.name} name: ${e}`);return!0}validateOptions(t,i){const{valid:e,message:n}=o.Validators.schema(i).validate(t);if(!e)throw new TypeError(`Invalid ${this.constructor.name} options. ${n}`);return!0}addNullableStatement(t,i){return i?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,i){return void 0!==i?`${t} DEFAULT ${i}`:t}addIndexStatement(t,i,e){return i?`${t}, ADD INDEX (${e})`:t}addUnsignedStatement(t,i){return i?`${t} UNSIGNED`:t}addZeroFillStatement(t,i){return i?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,i){return i?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,i){return i?`${t} PRIMARY KEY`:t}addAfterStatement(t,i,e){return!e&&i&&u.yellow("WARNING: addAfter option is ignored when creating a new table."),e?(i&&(t+=` AFTER ${i}`),t):t}}class c{constructor(t,i){this.options={nullable:void 0,default:void 0,unsigned:void 0,autoIncrement:void 0,zeroFill:void 0,primaryKey:void 0,after:void 0},this.name=t,this.type=i}static create(t,i){return new c(t,i)}nullable(t){return this.options.nullable=t,this}default(t){return this.options.default=t,this}unsigned(t){return this.options.unsigned=t,this}autoIncrement(t){return this.options.autoIncrement=t,this}zeroFill(t){return this.options.zeroFill=t,this}primaryKey(t){return this.options.primaryKey=t,this}after(t){return this.options.after=t,this}get(){let t=`\`${this.name}\` ${this.type}`;return!0===this.options.unsigned&&(t+=" UNSIGNED"),"boolean"==typeof this.options.nullable&&(t+=this.options.nullable?" NULL":" NOT NULL"),void 0!==this.options.default&&(t+=` DEFAULT ${this.options.default}`),!0===this.options.autoIncrement&&(t+=" AUTO_INCREMENT"),!0===this.options.zeroFill&&(t+=" ZEROFILL"),!0===this.options.primaryKey&&(t+=" PRIMARY KEY"),"string"==typeof this.options.after&&(t+=` AFTER \`${this.options.after}\``),t}}!function(t){t.INDEX="INDEX",t.UNIQUE="UNIQUE",t.FULLTEXT="FULLTEXT"}(a||(a={}));class p{constructor(){this.indexColumns=[],this.indexType=a.INDEX}static create(){return new p}name(t){return this.indexName=t,this}columns(...t){return this.indexColumns.push(...t),this}type(t){return this.indexType=t,this}get(){if(!this.indexColumns.length)throw new Error("No columns defined for index");let t=this.indexName&&this.indexType===a.UNIQUE?`${this.indexType} INDEX`:this.indexType;return this.indexName&&(t+=` \`${this.indexName}\``),t+=` (${this.indexColumns.map((t=>`\`${t}\``)).join(", ")})`,t}}class f extends h{constructor(i,e){super(i),this.options=Object.assign({type:t.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1,addAfter:void 0},e),this.validateOptions(this.options,{type:o.Validators.enumValue(t),nullable:o.Validators.boolean(),default:o.Validators.integer({optional:!0}),unsigned:o.Validators.boolean(),autoIncrement:o.Validators.boolean(),zeroFill:o.Validators.boolean(),primaryKey:o.Validators.boolean(),index:o.Validators.boolean(),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,this.options.type).nullable(this.options.nullable).default(this.options.default).unsigned(this.options.unsigned).autoIncrement(this.options.autoIncrement).zeroFill(this.options.zeroFill).primaryKey(this.options.primaryKey).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?p.create().columns(this.name):null}}class m extends f{constructor(i){super(i,{type:t.INT,nullable:!1,default:void 0,unsigned:!0,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}class y extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{nullable:o.Validators.boolean(),default:o.Validators.number({optional:!0}),unsigned:o.Validators.boolean(),zeroFill:o.Validators.boolean(),precision:o.Validators.integer(),scale:o.Validators.integer(),index:o.Validators.boolean(),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,`DECIMAL(${this.options.precision}, ${this.options.scale})`).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0).unsigned(this.options.unsigned).zeroFill(this.options.zeroFill).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?p.create().columns(this.name):null}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(l||(l={}));class g extends h{constructor(t,i){super(t);const e=(null==i?void 0:i.type)||l.VARCHAR;this.options=Object.assign({type:e,nullable:!1,primaryKey:!1,default:void 0,length:e!==l.VARCHAR?void 0:255,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{type:o.Validators.enumValue(l),nullable:o.Validators.boolean(),primaryKey:o.Validators.boolean(),default:o.Validators.string({optional:!0}),length:o.Validators.integer({optional:!0}),index:o.Validators.boolean(),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){let t=this.options.type;return this.options.type!==l.CHAR&&this.options.type!==l.VARCHAR||void 0!==this.options.length&&(t+=`(${this.options.length})`),c.create(this.name,t).nullable(this.options.nullable).primaryKey(this.options.primaryKey).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?p.create().columns(this.name):null}}class A extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{nullable:o.Validators.boolean(),default:o.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:o.Validators.boolean(),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,"DATE").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?p.create().columns(this.name):null}}class b extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,addAfter:void 0},i),this.validateOptions(this.options,{nullable:o.Validators.boolean(),default:o.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,"TIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}}class v extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{nullable:o.Validators.boolean(),default:o.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:o.Validators.boolean(),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,"DATETIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?p.create().columns(this.name):null}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(r||(r={}));class T extends h{constructor(t,i){super(t),this.options=Object.assign({type:r.BLOB,nullable:!1,addAfter:void 0},i),this.validateOptions(this.options,{type:o.Validators.enumValue(r),nullable:o.Validators.boolean(),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,this.options.type).nullable(this.options.nullable).after(this.options.addAfter)}}class E extends h{constructor(t,i,e){super(t),this.values=i;const{valid:n,message:s}=o.Validators.all([o.Validators.array(o.Validators.all([o.Validators.string(),o.Validators.minLength(1)])),o.Validators.minLength(1)]).validate(this.values);if(!n)throw new TypeError(`Invalid ${this.constructor.name} values. ${s}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},e);const a={};for(const t of this.values)a[t]=t;this.validateOptions(this.options,{nullable:o.Validators.boolean(),default:o.Validators.enumValue(a,{optional:!0}),index:o.Validators.boolean(),addAfter:o.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,`ENUM('${this.values.join("', '")}')`).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?p.create().columns(this.name):null}}var I=function(t,i,e,n){return new(e||(e=Promise))((function(o,s){function a(t){try{r(n.next(t))}catch(t){s(t)}}function l(t){try{r(n.throw(t))}catch(t){s(t)}}function r(t){var i;t.done?o(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(a,l)}r((n=n.apply(t,i||[])).next())}))};class N{constructor(t,i,e,n){this.operations=[],this.columnAdditions=[],this.name=t,this.connection=i,this.operations=e,this.tableExists=n,this.operations.push((()=>I(this,void 0,void 0,(function*(){if(0===this.columnAdditions.length)return;const t=yield this.connection.escape(this.name);if(!this.tableExists){const i=[...this.columnAdditions.map((t=>t.getColumnDefinition().get())),...this.columnAdditions.map((t=>{const i=t.getIndexDefinition();return i?i.get():null})).filter((t=>null!=t))];yield this.connection.query(`CREATE TABLE ${t} (${i.join(", ")});`),this.tableExists=!0,this.columnAdditions.splice(0,this.columnAdditions.length)}const i=[...this.columnAdditions.map((t=>`ADD COLUMN ${t.getColumnDefinition().get()}`)),...this.columnAdditions.map((t=>{const i=t.getIndexDefinition();return i?`ADD ${i.get()}`:null})).filter((t=>null!=t))];0!==i.length&&(yield this.connection.query(`ALTER TABLE ${t} ${i.join(", ")};`))}))))}id(t="id"){return this.columnAdditions.push(new m(t)),this}int(t,i){return this.columnAdditions.push(new f(t,i)),this}decimal(t,i){return this.columnAdditions.push(new y(t,i)),this}string(t,i){return this.columnAdditions.push(new g(t,i)),this}enum(t,i,e){return this.columnAdditions.push(new E(t,i,e)),this}date(t,i){return this.columnAdditions.push(new A(t,i)),this}time(t,i){return this.columnAdditions.push(new b(t,i)),this}datetime(t,i){return this.columnAdditions.push(new v(t,i)),this}blob(t,i){return this.columnAdditions.push(new T(t,i)),this}renameColumn(t,i){return this.operations.push((()=>I(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} RENAME COLUMN ${yield this.connection.escape(t)} TO ${yield this.connection.escape(i)};`)})))),this}dropColumn(t){return this.operations.push((()=>I(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP COLUMN ${yield this.connection.escape(t)};`)})))),this}addColumnIndex(t){return this.operations.push((()=>I(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} ADD INDEX ${yield this.connection.escape(t)};`)})))),this}dropColumnIndex(t){return this.operations.push((()=>I(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP INDEX ${yield this.connection.escape(t)};`)})))),this}setColumnNullable(t,i){return this.operations.push((()=>I(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} ${i?"NULL":"NOT NULL"};`)})))),this}setColumnDefault(t,i){return this.operations.push((()=>I(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} DEFAULT ${"string"==typeof i?`'${i}'`:i};`)})))),this}drop(){return this.operations.push((()=>I(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${yield this.connection.escape(this.name)};`)})))),this}}class x{constructor(t,i){this.connection=t,this.operations=i}create(t){return new N(t,this.connection,this.operations,!1)}table(t){return new N(t,this.connection,this.operations,!0)}}var L=function(t,i,e,n){return new(e||(e=Promise))((function(o,s){function a(t){try{r(n.next(t))}catch(t){s(t)}}function l(t){try{r(n.throw(t))}catch(t){s(t)}}function r(t){var i;t.done?o(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(a,l)}r((n=n.apply(t,i||[])).next())}))};class ${constructor(t){this.operations=[],this.connections=t}database(t,i){let e;if(i)e=this.connections.get(i);else{const i=this.connections.getAllByDatabaseName(t);if(0===i.length)throw new Error(`No connections found for database "${t}"`);if(i.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);e=i[0]}return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield e.query(`CREATE DATABASE IF NOT EXISTS ${yield e.escape(t)};`)})))),this.operations.push((()=>L(this,void 0,void 0,(function*(){yield e.query(`USE ${yield e.escape(t)};`)})))),new x(e,this.operations)}executePendingOperations(){return L(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}module.exports=e})();
//# sourceMappingURL=index.cjs.map