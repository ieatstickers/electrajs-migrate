import*as t from"@electra/utility";import*as i from"chalk";var e,n={d:(t,i)=>{for(var e in i)n.o(i,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:i[e]})},o:(t,i)=>Object.prototype.hasOwnProperty.call(t,i)},o={};n.d(o,{ln:()=>s,YB:()=>m,HB:()=>e,z4:()=>O,RD:()=>f});class s{}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(e||(e={}));const a=(l={Validators:()=>t.Validators},r={},n.d(r,l),r);var l,r;const d=(t=>{var i={};return n.d(i,t),i})({default:()=>i.default});class u{static red(t){console.log(d.default.redBright(t))}static blue(t){console.log(d.default.blueBright(t))}static green(t){console.log(d.default.greenBright(t))}static yellow(t){console.log(d.default.yellowBright(t))}}class h{constructor(t){this.name=t,this.validateName(this.name)}getIndexDefinition(){return null}getName(){return this.name}validateName(t){const{valid:i,message:e}=a.Validators.all([a.Validators.string(),a.Validators.minLength(1),a.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(t);if(!i)throw new TypeError(`Invalid ${this.constructor.name} name: ${e}`);return!0}validateOptions(t,i){const{valid:e,message:n}=a.Validators.schema(i).validate(t);if(!e)throw new TypeError(`Invalid ${this.constructor.name} options. ${n}`);return!0}addNullableStatement(t,i){return i?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,i){return void 0!==i?`${t} DEFAULT ${i}`:t}addIndexStatement(t,i,e){return i?`${t}, ADD INDEX (${e})`:t}addUnsignedStatement(t,i){return i?`${t} UNSIGNED`:t}addZeroFillStatement(t,i){return i?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,i){return i?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,i){return i?`${t} PRIMARY KEY`:t}addAfterStatement(t,i,e){return!e&&i&&u.yellow("WARNING: addAfter option is ignored when creating a new table."),e?(i&&(t+=` AFTER ${i}`),t):t}}class c{constructor(t,i){this.options={nullable:void 0,default:void 0,unsigned:void 0,autoIncrement:void 0,zeroFill:void 0,primaryKey:void 0,after:void 0},this.name=t,this.type=i}static create(t,i){return new c(t,i)}nullable(t){return this.options.nullable=t,this}default(t){return this.options.default=t,this}unsigned(t){return this.options.unsigned=t,this}autoIncrement(t){return this.options.autoIncrement=t,this}zeroFill(t){return this.options.zeroFill=t,this}primaryKey(t){return this.options.primaryKey=t,this}after(t){return this.options.after=t,this}get(){let t=`\`${this.name}\` ${this.type}`;return!0===this.options.unsigned&&(t+=" UNSIGNED"),"boolean"==typeof this.options.nullable&&(t+=this.options.nullable?" NULL":" NOT NULL"),void 0!==this.options.default&&(t+=` DEFAULT ${this.options.default}`),!0===this.options.autoIncrement&&(t+=" AUTO_INCREMENT"),!0===this.options.zeroFill&&(t+=" ZEROFILL"),!0===this.options.primaryKey&&(t+=" PRIMARY KEY"),"string"==typeof this.options.after&&(t+=` AFTER \`${this.options.after}\``),t}}var p,f,m;!function(t){t.INDEX="INDEX",t.UNIQUE="UNIQUE",t.FULLTEXT="FULLTEXT"}(p||(p={}));class y{constructor(){this.indexColumns=[],this.indexType=p.INDEX}static create(){return new y}defaultName(t){return this.defaultIndexName=t,this}name(t){return this.indexName=t,this}columns(...t){return this.indexColumns.push(...t),this}type(t){return this.indexType=t,this}get(){if(!this.indexColumns.length)throw new Error("No columns defined for index");const t=this.indexName||this.defaultIndexName;let i=t&&this.indexType===p.UNIQUE?`${this.indexType} INDEX`:this.indexType;return t&&(i+=` \`${t}\``),i+=` (${this.indexColumns.map((t=>`\`${t}\``)).join(", ")})`,i}}class g extends h{constructor(t,i){super(t),this.options=Object.assign({type:e.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{type:a.Validators.enumValue(e),nullable:a.Validators.boolean(),default:a.Validators.integer({optional:!0}),unsigned:a.Validators.boolean(),autoIncrement:a.Validators.boolean(),zeroFill:a.Validators.boolean(),primaryKey:a.Validators.boolean(),index:a.Validators.boolean(),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,this.options.type).nullable(this.options.nullable).default(this.options.default).unsigned(this.options.unsigned).autoIncrement(this.options.autoIncrement).zeroFill(this.options.zeroFill).primaryKey(this.options.primaryKey).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?y.create().columns(this.name):null}}class A extends g{constructor(t){super(t,{type:e.INT,nullable:!1,default:void 0,unsigned:!0,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}class v extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{nullable:a.Validators.boolean(),default:a.Validators.number({optional:!0}),unsigned:a.Validators.boolean(),zeroFill:a.Validators.boolean(),precision:a.Validators.integer(),scale:a.Validators.integer(),index:a.Validators.boolean(),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,`DECIMAL(${this.options.precision}, ${this.options.scale})`).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0).unsigned(this.options.unsigned).zeroFill(this.options.zeroFill).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?y.create().columns(this.name):null}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(f||(f={}));class b extends h{constructor(t,i){super(t);const e=(null==i?void 0:i.type)||f.VARCHAR;this.options=Object.assign({type:e,nullable:!1,primaryKey:!1,default:void 0,length:e!==f.VARCHAR?void 0:255,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{type:a.Validators.enumValue(f),nullable:a.Validators.boolean(),primaryKey:a.Validators.boolean(),default:a.Validators.string({optional:!0}),length:a.Validators.integer({optional:!0}),index:a.Validators.boolean(),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){let t=this.options.type;return this.options.type!==f.CHAR&&this.options.type!==f.VARCHAR||void 0!==this.options.length&&(t+=`(${this.options.length})`),c.create(this.name,t).nullable(this.options.nullable).primaryKey(this.options.primaryKey).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?y.create().columns(this.name):null}}class T extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{nullable:a.Validators.boolean(),default:a.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:a.Validators.boolean(),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,"DATE").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?y.create().columns(this.name):null}}class E extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,addAfter:void 0},i),this.validateOptions(this.options,{nullable:a.Validators.boolean(),default:a.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,"TIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}}class I extends h{constructor(t,i){super(t),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i),this.validateOptions(this.options,{nullable:a.Validators.boolean(),default:a.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:a.Validators.boolean(),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,"DATETIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?y.create().columns(this.name):null}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(m||(m={}));class N extends h{constructor(t,i){super(t),this.options=Object.assign({type:m.BLOB,nullable:!1,addAfter:void 0},i),this.validateOptions(this.options,{type:a.Validators.enumValue(m),nullable:a.Validators.boolean(),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,this.options.type).nullable(this.options.nullable).after(this.options.addAfter)}}class x extends h{constructor(t,i,e){super(t),this.values=i;const{valid:n,message:o}=a.Validators.all([a.Validators.array(a.Validators.all([a.Validators.string(),a.Validators.minLength(1)])),a.Validators.minLength(1)]).validate(this.values);if(!n)throw new TypeError(`Invalid ${this.constructor.name} values. ${o}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},e);const s={};for(const t of this.values)s[t]=t;this.validateOptions(this.options,{nullable:a.Validators.boolean(),default:a.Validators.enumValue(s,{optional:!0}),index:a.Validators.boolean(),addAfter:a.Validators.string({optional:!0})})}getColumnDefinition(){return c.create(this.name,`ENUM('${this.values.join("', '")}')`).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?y.create().columns(this.name):null}}var L=function(t,i,e,n){return new(e||(e=Promise))((function(o,s){function a(t){try{r(n.next(t))}catch(t){s(t)}}function l(t){try{r(n.throw(t))}catch(t){s(t)}}function r(t){var i;t.done?o(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(a,l)}r((n=n.apply(t,i||[])).next())}))};class ${constructor(t,i,e,n){this.operations=[],this.columnAdditions=[],this.name=t,this.connection=i,this.operations=e,this.tableExists=n,this.operations.push((()=>L(this,void 0,void 0,(function*(){if(0===this.columnAdditions.length)return;const t=yield this.connection.escape(this.name);if(!this.tableExists){const i=[...this.columnAdditions.map((t=>t.getColumnDefinition().get())),...this.columnAdditions.map((t=>{const i=t.getIndexDefinition();return i?i.defaultName(`${this.name.toLowerCase()}_${t.getName().toLowerCase()}_index`).get():null})).filter((t=>null!=t))];yield this.connection.query(`CREATE TABLE ${t} (${i.join(", ")});`),this.tableExists=!0,this.columnAdditions.splice(0,this.columnAdditions.length)}const i=[...this.columnAdditions.map((t=>`ADD COLUMN ${t.getColumnDefinition().get()}`)),...this.columnAdditions.map((t=>{const i=t.getIndexDefinition();return i?(i.defaultName(`${this.name.toLowerCase()}_${t.getName().toLowerCase()}_index`),`ADD ${i.get()}`):null})).filter((t=>null!=t))];0!==i.length&&(yield this.connection.query(`ALTER TABLE ${t} ${i.join(", ")};`))}))))}id(t="id"){return this.columnAdditions.push(new A(t)),this}int(t,i){return this.columnAdditions.push(new g(t,i)),this}decimal(t,i){return this.columnAdditions.push(new v(t,i)),this}string(t,i){return this.columnAdditions.push(new b(t,i)),this}enum(t,i,e){return this.columnAdditions.push(new x(t,i,e)),this}date(t,i){return this.columnAdditions.push(new T(t,i)),this}time(t,i){return this.columnAdditions.push(new E(t,i)),this}datetime(t,i){return this.columnAdditions.push(new I(t,i)),this}blob(t,i){return this.columnAdditions.push(new N(t,i)),this}renameColumn(t,i){return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} RENAME COLUMN ${yield this.connection.escape(t)} TO ${yield this.connection.escape(i)};`)})))),this}dropColumn(t){return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP COLUMN ${yield this.connection.escape(t)};`)})))),this}addColumnIndex(t){return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} ADD INDEX ${yield this.connection.escape(t)};`)})))),this}dropColumnIndex(t){return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP INDEX ${yield this.connection.escape(t)};`)})))),this}setColumnNullable(t,i){return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} ${i?"NULL":"NOT NULL"};`)})))),this}setColumnDefault(t,i){return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} DEFAULT ${"string"==typeof i?`'${i}'`:i};`)})))),this}drop(){return this.operations.push((()=>L(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${yield this.connection.escape(this.name)};`)})))),this}}class V{constructor(t,i){this.connection=t,this.operations=i}create(t){return new $(t,this.connection,this.operations,!1)}table(t){return new $(t,this.connection,this.operations,!0)}}var D=function(t,i,e,n){return new(e||(e=Promise))((function(o,s){function a(t){try{r(n.next(t))}catch(t){s(t)}}function l(t){try{r(n.throw(t))}catch(t){s(t)}}function r(t){var i;t.done?o(t.value):(i=t.value,i instanceof e?i:new e((function(t){t(i)}))).then(a,l)}r((n=n.apply(t,i||[])).next())}))};class O{constructor(t){this.operations=[],this.connections=t}database(t,i){let e;if(i)e=this.connections.get(i);else{const i=this.connections.getAllByDatabaseName(t);if(0===i.length)throw new Error(`No connections found for database "${t}"`);if(i.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);e=i[0]}return this.operations.push((()=>D(this,void 0,void 0,(function*(){yield e.query(`CREATE DATABASE IF NOT EXISTS ${yield e.escape(t)};`)})))),this.operations.push((()=>D(this,void 0,void 0,(function*(){yield e.query(`USE ${yield e.escape(t)};`)})))),new V(e,this.operations)}executePendingOperations(){return D(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}var C=o.ln,w=o.YB,M=o.HB,B=o.z4,R=o.RD;export{C as AbstractMigration,w as BlobColumnTypeEnum,M as IntColumnTypeEnum,B as MySql,R as StringColumnTypeEnum};
//# sourceMappingURL=index.mjs.map