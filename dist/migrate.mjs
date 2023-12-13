import*as t from"caporal";import*as e from"@electra/utility";import*as n from"typeorm";import*as i from"luxon";import{createRequire as o}from"module";import*as a from"chalk";import*as s from"reflect-metadata";var r={704:e=>{e.exports=t},147:t=>{t.exports={i8:"1.0.0"}}},l={};function c(t){var e=l[t];if(void 0!==e)return e.exports;var n=l[t]={exports:{}};return r[t](n,n.exports,c),n.exports}c.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return c.d(e,{a:e}),e},c.d=(t,e)=>{for(var n in e)c.o(e,n)&&!c.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},c.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{const t=(s={Objects:()=>e.Objects,Validators:()=>e.Validators},r={},c.d(r,s),r);var s,r;const l=(t=>{var e={};return c.d(e,t),e})({Column:()=>n.Column,DataSource:()=>n.DataSource,Entity:()=>n.Entity,PrimaryGeneratedColumn:()=>n.PrimaryGeneratedColumn});var d=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class u{constructor(t){this.dataSource=new l.DataSource(t)}initialize(){return d(this,void 0,void 0,(function*(){yield this.dataSource.initialize()}))}destroy(){return d(this,void 0,void 0,(function*(){yield this.dataSource.destroy()}))}}class h{constructor(t){this.entityManager=t}}var f=function(t,e,n,i){var o,a=arguments.length,s=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(a<3?o(s):a>3?o(e,n,s):o(e,n))||s);return a>3&&s&&Object.defineProperty(e,n,s),s},p=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let y=class{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}};f([(0,l.PrimaryGeneratedColumn)(),p("design:type",Number)],y.prototype,"id",void 0),f([(0,l.Column)(),p("design:type",String)],y.prototype,"group",void 0),f([(0,l.Column)(),p("design:type",String)],y.prototype,"name",void 0),f([(0,l.Column)(),p("design:type",String)],y.prototype,"executed",void 0),f([(0,l.Column)(),p("design:type",Number)],y.prototype,"batch",void 0),f([(0,l.Column)(),p("design:type",String)],y.prototype,"created",void 0),f([(0,l.Column)(),p("design:type",String)],y.prototype,"updated",void 0),y=f([(0,l.Entity)("migration")],y);class m{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}}const v=(t=>{var e={};return c.d(e,t),e})({DateTime:()=>i.DateTime});var g=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class b extends h{getAll(){return g(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.find(y))}))}getById(t){return g(this,void 0,void 0,(function*(){return this.toEntity(yield this.entityManager.findOneBy(y,{id:t}))}))}getLatestBatch(){return g(this,void 0,void 0,(function*(){const t=yield this.entityManager.createQueryBuilder(y,"migration").select("MAX(migration.batch)","maxBatch").getRawOne();return t&&t.maxBatch?parseInt(t.maxBatch):null}))}getAllByBatch(t){return g(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.createQueryBuilder(y,"m").where("m.batch = :batch",{batch:t}).orderBy("executed","DESC").getMany())}))}remove(...t){return g(this,void 0,void 0,(function*(){yield this.entityManager.remove(t.map((t=>this.toModel(t))))}))}save(...t){return g(this,void 0,void 0,(function*(){yield this.entityManager.save(t.map((t=>{const e=v.DateTime.now().toSQL({includeOffset:!1});return t.id||(t.created=e),t.updated=e,this.toModel(t)})))}))}toEntityMap(t){const e={};return t.forEach((t=>{e[t.id]=this.toEntity(t)})),e}toEntity(e){return t.Objects.hydrate(new m,e)}toModel(e){return t.Objects.hydrate(new y,e)}getModel(){return y}}var E=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class A extends u{constructor(t){super({type:"mysql",database:t.database,host:t.host,port:t.port,username:t.username,password:t.password,entities:[y]})}transaction(t){return E(this,void 0,void 0,(function*(){yield this.dataSource.transaction((e=>E(this,void 0,void 0,(function*(){const n={migration:new b(e)};return t(n)}))))}))}getMigrationRepository(){return new b(this.dataSource.manager)}}const w=o(import.meta.url)("path");var x=c.n(w);const T=o(import.meta.url)("fs");var $=c.n(T),M=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class L{static import(...t){return M(this,void 0,void 0,(function*(){const[e,n]=t,i=null!=n?e:null,o=null!=n?n:e,a=yield import(`${o}`);return i?a[i]:a}))}static require(...t){const[e,n]=t,i=null!=n?e:null,a=null!=n?n:e,s=o(import.meta.url)(`${a}`);return i?s[i]:s}static isCommonJS(){return M(this,void 0,void 0,(function*(){const t=`${process.cwd()}/package.json`;let e;try{e=JSON.parse(yield $().promises.readFile(t,{encoding:"utf-8"}))}catch(t){throw new Error("Command must be run from the root of your project containing a valid package.json file.")}return"module"!==e.type}))}}var N=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class D{static ensureMigrationDbExists(){return N(this,void 0,void 0,(function*(){const t=this.getMigrationDbConnectionOptions(),e=new l.DataSource({type:"mysql",host:t.host,port:t.port,username:t.username,password:t.password});yield e.initialize();const n=e.createQueryRunner();yield n.connect(),yield n.query(`CREATE DATABASE IF NOT EXISTS ${t.database};`),yield n.query(`USE ${t.database}`),yield n.query("\n      CREATE TABLE IF NOT EXISTS migration (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        `group` VARCHAR(255) NOT NULL,\n        name VARCHAR(255) NOT NULL,\n        executed DATETIME NOT NULL,\n        batch INT NOT NULL,\n        created DATETIME NOT NULL,\n        updated DATETIME NOT NULL\n      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n      "),yield n.release(),yield e.destroy()}))}static getMigrationDb(){return this.migrationDb||(this.migrationDb=new A(this.getMigrationDbConnectionOptions())),this.migrationDb}static loadConfig(){return N(this,void 0,void 0,(function*(){try{this.config=yield L.import("default",x().join(process.cwd(),"migrate.config.js"))}catch(t){throw new Error(`Failed to read migrate.config.js file: ${t.message}`)}const{valid:e,message:n}=t.Validators.schema({migrationDatabase:t.Validators.string(),connections:t.Validators.object(t.Validators.schema({host:t.Validators.string(),port:t.Validators.integer(),username:t.Validators.string(),password:t.Validators.string(),databases:t.Validators.array(t.Validators.string())})),migrationDirs:t.Validators.object(t.Validators.schema({name:t.Validators.string(),path:t.Validators.string()}))}).validate(this.config);if(!e)throw new Error(`Invalid migrate.config.js file: ${n}`);return this.config}))}static getConfig(){if(!this.config)throw new Error("Config not loaded");return this.config}static getProjectMigrations(e){return N(this,void 0,void 0,(function*(){const n={},i=this.getConfig().migrationDirs,o=yield this.getMigrationDb().getMigrationRepository().getAll(),a={};for(const s in i){n[s]=[];const{name:r,path:l}=i[s];let c;const d=x().join(process.cwd(),l);try{c=yield $().promises.readdir(d)}catch(t){throw new Error(`Failed to read migration directory ${l}: ${t.message}`)}for(const i of c){const[l]=i.split("."),{valid:c,message:u}=t.Validators.regex(/^(19|20)\d{2}_(0[1-9]|1[0-2])_(0[1-9]|[12][0-9]|3[01])_([0-1][0-9]|2[0-3])([0-5][0-9]){2}_[A-Za-z][A-Za-z0-9_]*$/,"YYYY_MM_DD_HHMMSS_MigrationName").validate(l);if(!c)throw new Error(`Invalid migration file name: ${u}`);const[h,f,p,y]=l.split("_"),m=`${h}_${f}_${p}_${y}`;if(a[m])throw new Error(`Duplicate migration timestamp "${m}" found in ${a[m]} and ${i}`);a[m]=i;const v=Object.values(o).find((t=>t.name===l));if(!1===(null==e?void 0:e.includeExecuted)&&(null==v?void 0:v.executed))continue;const g={filepath:`${d}/${i}`,group:s,groupDisplayName:r,name:l,executed:(null==v?void 0:v.executed)||null,batch:(null==v?void 0:v.batch)||null};n[s].push(g)}}return n}))}static getMigrationDbConnectionOptions(){const t=this.getConfig(),{migrationDatabase:e}=t;let n;for(const i in t.connections)if(t.connections[i].databases.includes(e)){if(n)throw new Error(`Multiple connections found for migration database "${e}"`);n=t.connections[i]}if(!n)throw new Error(`Cannot connect to migration database - no connection found for database "${e}"`);return{database:e,host:n.host,port:n.port,username:n.username,password:n.password}}}const O=(t=>{var e={};return c.d(e,t),e})({default:()=>a.default});c.d({},{});class S{getMigrationClassInstance(t){return e=this,n=void 0,o=function*(){const e=(yield L.isCommonJS())?L.require(t.filepath):yield L.import(t.filepath);let n;const i=t.name.split("_").pop();if(e[i])n=e[i];else{if(!e.default)throw new Error(`Could not find migration class in ${t.filepath}`);n=e.default}return new n},new((i=void 0)||(i=Promise))((function(t,a){function s(t){try{l(o.next(t))}catch(t){a(t)}}function r(t){try{l(o.throw(t))}catch(t){a(t)}}function l(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(s,r)}l((o=o.apply(e,n||[])).next())}));var e,n,i,o}}class C extends S{execute(){return t=this,e=void 0,i=function*(){const t=D.getConfig().migrationDirs,e=yield D.getProjectMigrations();for(const n in e){const i=e[n],{name:o}=t[n];if(console.log(O.default.yellowBright(o)),0!==i.length)for(const t of i)console.log(`  ${t.executed?O.default.greenBright(t.name):O.default.redBright(t.name)}`);else console.log(O.default.redBright("  * No migrations found *"))}},new((n=void 0)||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}));var t,e,n,i}}var I=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class V{constructor(t){this.connectionConfig=t}query(t,e=[]){return I(this,void 0,void 0,(function*(){return(yield this.get()).query(t,e)}))}destroy(){return I(this,void 0,void 0,(function*(){this.connection&&(yield this.connection.destroy(),this.connection=void 0)}))}isInitialised(){return!!this.connection}escape(t){return I(this,void 0,void 0,(function*(){return(yield this.get()).driver.escape(t)}))}get(){return I(this,void 0,void 0,(function*(){return this.connection||(this.connection=new l.DataSource({type:"mysql",host:this.connectionConfig.host,port:this.connectionConfig.port,username:this.connectionConfig.username,password:this.connectionConfig.password}),yield this.connection.initialize()),this.connection}))}}var B;class R{constructor(t){this.config={},this.connections={},this.config=t}get(t){if(this.connections[t])return this.connections[t];if(!this.config[t])throw new Error(`Config for connection "${t}" not found`);const{host:e,port:n,username:i,password:o}=this.config[t];return this.connections[t]=new V({host:e,port:n,username:i,password:o}),this.connections[t]}getAllByDatabaseName(t){const e=[];for(const n in this.config)this.config[n].databases.includes(t)&&e.push(this.get(n));return e}destroyAllInitialised(){return t=this,e=void 0,i=function*(){const t=this.getAllInitialised();for(const e of t)yield e.destroy()},new((n=void 0)||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}));var t,e,n,i}getAllInitialised(){return Object.values(this.connections).filter((t=>t.isInitialised()))}}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(B||(B={}));class P{validateName(e){const{valid:n,message:i}=t.Validators.all([t.Validators.string(),t.Validators.minLength(1),t.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(e);if(!n)throw new TypeError(`Invalid ${this.constructor.name} name: ${i}`);return!0}validateOptions(e,n){const{valid:i,message:o}=t.Validators.schema(n).validate(e);if(!i)throw new TypeError(`Invalid ${this.constructor.name} options. ${o}`);return!0}addNullableStatement(t,e){return e?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,e){return void 0!==e?`${t} DEFAULT ${e}`:t}addIndexStatement(t,e){return e?`${t} INDEX`:t}addUnsignedStatement(t,e){return e?`${t} UNSIGNED`:t}addZeroFillStatement(t,e){return e?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,e){return e?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,e){return e?`${t} PRIMARY KEY`:t}addAfterStatement(t,e,n){return!n&&e&&console.warn(O.default.yellowBright("WARNING: addAfter option is ignored when creating a new table.")),n?(e&&(t+=` AFTER ${e}`),t):t}}class U extends P{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({type:B.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(B),nullable:t.Validators.boolean(),default:t.Validators.integer({optional:!0}),unsigned:t.Validators.boolean(),autoIncrement:t.Validators.boolean(),zeroFill:t.Validators.boolean(),primaryKey:t.Validators.boolean(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ${this.options.type}`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default),a=this.addUnsignedStatement(a,this.options.unsigned),a=this.addAutoIncrementStatement(a,this.options.autoIncrement),a=this.addZeroFillStatement(a,this.options.zeroFill),a=this.addPrimaryKeyStatement(a,this.options.primaryKey),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class j extends U{constructor(t){super(t,{type:B.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}var q;class F extends P{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),unsigned:t.Validators.boolean(),zeroFill:t.Validators.boolean(),precision:t.Validators.integer(),scale:t.Validators.integer(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} DECIMAL(${this.options.precision}, ${this.options.scale})`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,"number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0),a=this.addUnsignedStatement(a,this.options.unsigned),a=this.addZeroFillStatement(a,this.options.zeroFill),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(q||(q={}));class Y extends P{constructor(e,n){super(),this.name=e,this.validateName(this.name);const i=(null==n?void 0:n.type)||q.VARCHAR;this.options=Object.assign({type:i,nullable:!1,primaryKey:!1,default:void 0,length:i!==q.VARCHAR?void 0:255,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(q),nullable:t.Validators.boolean(),primaryKey:t.Validators.boolean(),default:t.Validators.string({optional:!0}),length:t.Validators.integer({optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ${this.options.type}`;this.options.type!==q.CHAR&&this.options.type!==q.VARCHAR||void 0!==this.options.length&&(a+=`(${this.options.length})`),a=this.addNullableStatement(a,this.options.nullable),a=this.addPrimaryKeyStatement(a,this.options.primaryKey),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class _ extends P{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} DATE`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class k extends P{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} TIME`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}var z;class H extends P{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} DATETIME`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(z||(z={}));class X extends P{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({type:z.BLOB,nullable:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(z),nullable:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ${this.options.type}`;a=this.addNullableStatement(a,this.options.nullable),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class K extends P{constructor(e,n,i){super(),this.name=e,this.validateName(this.name),this.values=n;const{valid:o,message:a}=t.Validators.all([t.Validators.array(t.Validators.all([t.Validators.string(),t.Validators.minLength(1)])),t.Validators.minLength(1)]).validate(this.values);if(!o)throw new TypeError(`Invalid ${this.constructor.name} values. ${a}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i);const s={};for(const t of this.values)s[t]=t;this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.enumValue(s,{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ENUM('${this.values.join("', '")}')`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{l(s.next(t))}catch(t){e(t)}}function r(t){try{l(s.throw(t))}catch(t){e(t)}}function l(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}l((s=s.apply(i,o||[])).next())}));var i,o,a,s}}var G=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class Z{constructor(t,e,n,i){this.operations=[],this.name=t,this.connection=e,this.operations=n,this.tableExists=i}id(t="id"){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const e=new j(t);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}int(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const n=new U(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}decimal(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const n=new F(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}string(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const n=new Y(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}enum(t,e,n){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const i=new K(t,e,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}date(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const n=new _(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}time(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const n=new k(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}datetime(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const n=new H(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}blob(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){const n=new X(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}renameColumn(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} RENAME COLUMN ${yield this.connection.escape(t)} TO ${yield this.connection.escape(e)};`)})))),this}dropColumn(t){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP COLUMN ${yield this.connection.escape(t)};`)})))),this}addColumnIndex(t){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} ADD INDEX ${yield this.connection.escape(t)};`)})))),this}dropColumnIndex(t){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP INDEX ${yield this.connection.escape(t)};`)})))),this}setColumnNullable(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} ${e?"NULL":"NOT NULL"};`)})))),this}setColumnDefault(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} DEFAULT ${"string"==typeof e?`'${e}'`:e};`)})))),this}drop(){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${yield this.connection.escape(this.name)};`)})))),this}}class Q{constructor(t,e){this.connection=t,this.operations=e}create(t){return new Z(t,this.connection,this.operations,!1)}table(t){return new Z(t,this.connection,this.operations,!0)}}var J=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class W{constructor(t){this.operations=[],this.connections=t}database(t,e){let n;if(e)n=this.connections.get(e);else{const e=this.connections.getAllByDatabaseName(t);if(0===e.length)throw new Error(`No connections found for database "${t}"`);if(e.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);n=e[0]}return this.operations.push((()=>J(this,void 0,void 0,(function*(){yield n.query(`CREATE DATABASE IF NOT EXISTS ${yield n.escape(t)};`)})))),this.operations.push((()=>J(this,void 0,void 0,(function*(){yield n.query(`USE ${yield n.escape(t)};`)})))),new Q(n,this.operations)}executePendingOperations(){return J(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}var tt=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class et extends S{execute(){return tt(this,void 0,void 0,(function*(){const t=D.getConfig(),e=new R(t.connections),n=new W(e);let i=0;const o=yield this.getMigrationsToRollBack();if(o.length){try{for(const{migrationRow:t,migrationFile:e}of o){const o=yield this.getMigrationClassInstance(e);yield o.down(n),yield n.executePendingOperations(),yield D.getMigrationDb().getMigrationRepository().remove(t),i++}console.log(O.default.greenBright(`Successfully rolled back ${i} migration${1!==i?"s":""}`))}catch(t){console.log(O.default.redBright(`Failed to roll back migrations: ${t.message}`)),console.log(O.default.redBright(t.stack))}yield e.destroyAllInitialised()}else console.log(O.default.blueBright("No migrations to rollback"))}))}getMigrationsToRollBack(){return tt(this,void 0,void 0,(function*(){const t=yield D.getMigrationDb().getMigrationRepository().getLatestBatch();if(!t)return[];const e=yield D.getMigrationDb().getMigrationRepository().getAllByBatch(t),n=yield D.getProjectMigrations();return Object.values(e).sort(((t,e)=>t.name<e.name?1:-1)).map((t=>{const e=n[t.group].find((e=>e.name===t.name));if(!e)throw new Error(`Could not find migration file for ${t.name} in group ${t.group}`);return{migrationRow:t,migrationFile:e}}))}))}}var nt=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};class it extends S{constructor(t){super(),this.options=t}execute(){var t;return nt(this,void 0,void 0,(function*(){let e=0;const n=D.getConfig(),i=new R(n.connections),o=new W(i),a=yield this.getMigrationFilesToRun(),s=D.getMigrationDb().getMigrationRepository(),r=yield s.getLatestBatch(),l=r?r+1:1;try{for(const t of a){const n=yield this.getMigrationClassInstance(t);yield n.up(o),yield o.executePendingOperations();const i=new m;i.name=t.name,i.group=t.group,i.executed=v.DateTime.now().toSQL({includeOffset:!1}),i.batch=l,yield s.save(i),e++}console.log(O.default.greenBright(`Successfully ran ${e} migration${1!==e?"s":""}`))}catch(n){console.log(O.default.redBright(`Failed to run migrations: ${n.message}`)),console.log(O.default.redBright(n.stack)),!0===(null===(t=this.options)||void 0===t?void 0:t.rollbackOnError)&&(e>0?(console.log(""),console.log(O.default.yellowBright("Attempting to roll back migrations...")),yield(new et).execute()):(console.log(""),console.log(O.default.yellowBright("Nothing to roll back - 0 migrations finished successfully."))))}yield i.destroyAllInitialised()}))}getMigrationFilesToRun(){return nt(this,void 0,void 0,(function*(){const t=yield D.getProjectMigrations({includeExecuted:!1}),e=[];for(const n in t)e.push(...t[n]);return e.sort(((t,e)=>t.name<e.name?-1:1)),e}))}}var ot=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{l(i.next(t))}catch(t){a(t)}}function r(t){try{l(i.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}l((i=i.apply(t,e||[])).next())}))};function at(t){return(e,n,i)=>ot(this,void 0,void 0,(function*(){yield D.ensureMigrationDbExists(),yield D.getMigrationDb().initialize(),yield t(e,n,i),yield D.getMigrationDb().destroy()}))}ot(void 0,void 0,void 0,(function*(){yield D.loadConfig();const{default:t}=yield Promise.resolve().then(c.bind(c,704));try{t.name("Electra Migrate").description("MySQL Migrations for Node.js Applications").version(c(147).i8),t.command("status","Show the status of all migrations").action(at((()=>ot(void 0,void 0,void 0,(function*(){yield(new C).execute()}))))),t.command("run","Run all migrations").option("--rollback-on-error","Automatically rollback migrations if an error occurs").action(at(((t,e)=>ot(void 0,void 0,void 0,(function*(){const t=new it({rollbackOnError:e.rollbackOnError||!1});yield t.execute()}))))),t.command("rollback","Rollback the last batch of migrations").action(at((()=>ot(void 0,void 0,void 0,(function*(){yield(new et).execute()}))))),t.parse(process.argv)}catch(t){console.log(O.default.redBright(t.stack))}}))})();