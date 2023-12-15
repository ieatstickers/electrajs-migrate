(()=>{"use strict";var t,e,n={562:t=>{t.exports=require("caporal")},147:t=>{t.exports={i8:"1.0.0"}}},i={};function o(t){var e=i[t];if(void 0!==e)return e.exports;var a=i[t]={exports:{}};return n[t](a,a.exports,o),a.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},e=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,o.t=function(n,i){if(1&i&&(n=this(n)),8&i)return n;if("object"==typeof n&&n){if(4&i&&n.__esModule)return n;if(16&i&&"function"==typeof n.then)return n}var a=Object.create(null);o.r(a);var s={};t=t||[null,e({}),e([]),e(e)];for(var r=2&i&&n;"object"==typeof r&&!~t.indexOf(r);r=e(r))Object.getOwnPropertyNames(r).forEach((t=>s[t]=()=>n[t]));return s.default=()=>n,o.d(a,s),a},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var a={};(()=>{o.r(a);const t=require("@electra/utility"),e=require("typeorm");var n=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class i{constructor(t){this.dataSource=new e.DataSource(t)}initialize(){return n(this,void 0,void 0,(function*(){yield this.dataSource.initialize()}))}destroy(){return n(this,void 0,void 0,(function*(){yield this.dataSource.destroy()}))}}class s{constructor(t){this.entityManager=t}}var r=function(t,e,n,i){var o,a=arguments.length,s=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(a<3?o(s):a>3?o(e,n,s):o(e,n))||s);return a>3&&s&&Object.defineProperty(e,n,s),s},c=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let d=class{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}};r([(0,e.PrimaryGeneratedColumn)(),c("design:type",Number)],d.prototype,"id",void 0),r([(0,e.Column)(),c("design:type",String)],d.prototype,"group",void 0),r([(0,e.Column)(),c("design:type",String)],d.prototype,"name",void 0),r([(0,e.Column)(),c("design:type",String)],d.prototype,"executed",void 0),r([(0,e.Column)(),c("design:type",Number)],d.prototype,"batch",void 0),r([(0,e.Column)(),c("design:type",String)],d.prototype,"created",void 0),r([(0,e.Column)(),c("design:type",String)],d.prototype,"updated",void 0),d=r([(0,e.Entity)("migration")],d);class l{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}}const u=require("luxon");var h=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class f extends s{getAll(){return h(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.find(d))}))}getById(t){return h(this,void 0,void 0,(function*(){return this.toEntity(yield this.entityManager.findOneBy(d,{id:t}))}))}getLatestBatch(){return h(this,void 0,void 0,(function*(){const t=yield this.entityManager.createQueryBuilder(d,"migration").select("MAX(migration.batch)","maxBatch").getRawOne();return t&&t.maxBatch?parseInt(t.maxBatch):null}))}getAllByBatch(t){return h(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.createQueryBuilder(d,"m").where("m.batch = :batch",{batch:t}).orderBy("executed","DESC").getMany())}))}remove(...t){return h(this,void 0,void 0,(function*(){yield this.entityManager.remove(t.map((t=>this.toModel(t))))}))}save(...t){return h(this,void 0,void 0,(function*(){yield this.entityManager.save(t.map((t=>{const e=u.DateTime.now().toSQL({includeOffset:!1});return t.id||(t.created=e),t.updated=e,this.toModel(t)})))}))}toEntityMap(t){const e={};return t.forEach((t=>{e[t.id]=this.toEntity(t)})),e}toEntity(e){return t.Objects.hydrate(new l,e)}toModel(e){return t.Objects.hydrate(new d,e)}getModel(){return d}}var p=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class y extends i{constructor(t){super({type:"mysql",database:t.database,host:t.host,port:t.port,username:t.username,password:t.password,entities:[d]})}transaction(t){return p(this,void 0,void 0,(function*(){yield this.dataSource.transaction((e=>p(this,void 0,void 0,(function*(){const n={migration:new f(e)};return t(n)}))))}))}getMigrationRepository(){return new f(this.dataSource.manager)}}const v=require("path");var m=o.n(v);const g=require("fs");var b=o.n(g),E=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class A{static import(...t){return E(this,void 0,void 0,(function*(){const[e,n]=t,i=null!=n?e:null,o=null!=n?n:e,a=yield import(`${o}`);return i?a[i]:a}))}static require(...t){const[e,n]=t,i=null!=n?e:null,o=require(`${null!=n?n:e}`);return i?o[i]:o}static isCommonJS(){return E(this,void 0,void 0,(function*(){const t=`${process.cwd()}/package.json`;let e;try{e=JSON.parse(yield b().promises.readFile(t,{encoding:"utf-8"}))}catch(t){throw new Error("Command must be run from the root of your project containing a valid package.json file.")}return"module"!==e.type}))}}var w=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class x{static ensureMigrationDbExists(){return w(this,void 0,void 0,(function*(){const t=this.getMigrationDbConnectionOptions(),n=new e.DataSource({type:"mysql",host:t.host,port:t.port,username:t.username,password:t.password});yield n.initialize();const i=n.createQueryRunner();yield i.connect(),yield i.query(`CREATE DATABASE IF NOT EXISTS ${t.database};`),yield i.query(`USE ${t.database}`),yield i.query("\n      CREATE TABLE IF NOT EXISTS migration (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        `group` VARCHAR(255) NOT NULL,\n        name VARCHAR(255) NOT NULL,\n        executed DATETIME NOT NULL,\n        batch INT NOT NULL,\n        created DATETIME NOT NULL,\n        updated DATETIME NOT NULL\n      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n      "),yield i.release(),yield n.destroy()}))}static getMigrationDb(){return this.migrationDb||(this.migrationDb=new y(this.getMigrationDbConnectionOptions())),this.migrationDb}static loadConfig(){return w(this,void 0,void 0,(function*(){try{this.config=yield A.import("default",m().join(process.cwd(),"migrate.config.js"))}catch(t){throw new Error(`Failed to read migrate.config.js file: ${t.message}`)}const{valid:e,message:n}=t.Validators.schema({migrationDatabase:t.Validators.string(),connections:t.Validators.object(t.Validators.schema({host:t.Validators.string(),port:t.Validators.integer(),username:t.Validators.string(),password:t.Validators.string(),databases:t.Validators.array(t.Validators.string())})),migrationDirs:t.Validators.object(t.Validators.schema({name:t.Validators.string(),path:t.Validators.string()}))}).validate(this.config);if(!e)throw new Error(`Invalid migrate.config.js file: ${n}`);return this.config}))}static getConfig(){if(!this.config)throw new Error("Config not loaded");return this.config}static getProjectMigrations(e){return w(this,void 0,void 0,(function*(){const n={},i=this.getConfig().migrationDirs,o=yield this.getMigrationDb().getMigrationRepository().getAll(),a={};for(const s in i){n[s]=[];const{name:r,path:c}=i[s];let d;const l=m().join(process.cwd(),c);try{d=yield b().promises.readdir(l)}catch(t){throw new Error(`Failed to read migration directory ${c}: ${t.message}`)}for(const i of d){const[c]=i.split("."),{valid:d,message:u}=t.Validators.regex(/^(19|20)\d{2}_(0[1-9]|1[0-2])_(0[1-9]|[12][0-9]|3[01])_([0-1][0-9]|2[0-3])([0-5][0-9]){2}_[A-Za-z][A-Za-z0-9_]*$/,"YYYY_MM_DD_HHMMSS_MigrationName").validate(c);if(!d)throw new Error(`Invalid migration file name: ${u}`);const[h,f,p,y]=c.split("_"),v=`${h}_${f}_${p}_${y}`;if(a[v])throw new Error(`Duplicate migration timestamp "${v}" found in ${a[v]} and ${i}`);a[v]=i;const m=Object.values(o).find((t=>t.name===c));if(!1===(null==e?void 0:e.includeExecuted)&&(null==m?void 0:m.executed))continue;const g={filepath:`${l}/${i}`,group:s,groupDisplayName:r,name:c,executed:(null==m?void 0:m.executed)||null,batch:(null==m?void 0:m.batch)||null};n[s].push(g)}}return n}))}static getMigrationDbConnectionOptions(){const t=this.getConfig(),{migrationDatabase:e}=t;let n;for(const i in t.connections)if(t.connections[i].databases.includes(e)){if(n)throw new Error(`Multiple connections found for migration database "${e}"`);n=t.connections[i]}if(!n)throw new Error(`Cannot connect to migration database - no connection found for database "${e}"`);return{database:e,host:n.host,port:n.port,username:n.username,password:n.password}}}const T=require("chalk");var $=o.n(T);require("reflect-metadata");class M{getMigrationClassInstance(t){return e=this,n=void 0,o=function*(){const e=(yield A.isCommonJS())?A.require(t.filepath):yield A.import(t.filepath);let n;const i=t.name.split("_").pop();if(e[i])n=e[i];else{if(!e.default)throw new Error(`Could not find migration class in ${t.filepath}`);n=e.default}return new n},new((i=void 0)||(i=Promise))((function(t,a){function s(t){try{c(o.next(t))}catch(t){a(t)}}function r(t){try{c(o.throw(t))}catch(t){a(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(s,r)}c((o=o.apply(e,n||[])).next())}));var e,n,i,o}}class L{static red(t){console.log($().redBright(t))}static blue(t){console.log($().blueBright(t))}static green(t){console.log($().greenBright(t))}static yellow(t){console.log($().yellowBright(t))}}class N extends M{execute(){return t=this,e=void 0,i=function*(){const t=x.getConfig().migrationDirs,e=yield x.getProjectMigrations();for(const n in e){const i=e[n],{name:o}=t[n];if(L.yellow(o),0!==i.length)for(const t of i)t.executed?L.green(`  ${t.name}`):L.red(`  ${t.name}`);else L.red("  * No migrations found *")}},new((n=void 0)||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}));var t,e,n,i}}var O=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class S{constructor(t){this.connectionConfig=t}query(t,e=[]){return O(this,void 0,void 0,(function*(){return(yield this.get()).query(t,e)}))}destroy(){return O(this,void 0,void 0,(function*(){this.connection&&(yield this.connection.destroy(),this.connection=void 0)}))}isInitialised(){return!!this.connection}escape(t){return O(this,void 0,void 0,(function*(){return(yield this.get()).driver.escape(t)}))}get(){return O(this,void 0,void 0,(function*(){return this.connection||(this.connection=new e.DataSource({type:"mysql",host:this.connectionConfig.host,port:this.connectionConfig.port,username:this.connectionConfig.username,password:this.connectionConfig.password}),yield this.connection.initialize()),this.connection}))}}var D;class I{constructor(t){this.config={},this.connections={},this.config=t}get(t){if(this.connections[t])return this.connections[t];if(!this.config[t])throw new Error(`Config for connection "${t}" not found`);const{host:e,port:n,username:i,password:o}=this.config[t];return this.connections[t]=new S({host:e,port:n,username:i,password:o}),this.connections[t]}getAllByDatabaseName(t){const e=[];for(const n in this.config)this.config[n].databases.includes(t)&&e.push(this.get(n));return e}destroyAllInitialised(){return t=this,e=void 0,i=function*(){const t=this.getAllInitialised();for(const e of t)yield e.destroy()},new((n=void 0)||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}));var t,e,n,i}getAllInitialised(){return Object.values(this.connections).filter((t=>t.isInitialised()))}}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(D||(D={}));class C{validateName(e){const{valid:n,message:i}=t.Validators.all([t.Validators.string(),t.Validators.minLength(1),t.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(e);if(!n)throw new TypeError(`Invalid ${this.constructor.name} name: ${i}`);return!0}validateOptions(e,n){const{valid:i,message:o}=t.Validators.schema(n).validate(e);if(!i)throw new TypeError(`Invalid ${this.constructor.name} options. ${o}`);return!0}addNullableStatement(t,e){return e?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,e){return void 0!==e?`${t} DEFAULT ${e}`:t}addIndexStatement(t,e){return e?`${t} INDEX`:t}addUnsignedStatement(t,e){return e?`${t} UNSIGNED`:t}addZeroFillStatement(t,e){return e?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,e){return e?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,e){return e?`${t} PRIMARY KEY`:t}addAfterStatement(t,e,n){return!n&&e&&L.yellow("WARNING: addAfter option is ignored when creating a new table."),n?(e&&(t+=` AFTER ${e}`),t):t}}class R extends C{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({type:D.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(D),nullable:t.Validators.boolean(),default:t.Validators.integer({optional:!0}),unsigned:t.Validators.boolean(),autoIncrement:t.Validators.boolean(),zeroFill:t.Validators.boolean(),primaryKey:t.Validators.boolean(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ${this.options.type}`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default),a=this.addUnsignedStatement(a,this.options.unsigned),a=this.addAutoIncrementStatement(a,this.options.autoIncrement),a=this.addZeroFillStatement(a,this.options.zeroFill),a=this.addPrimaryKeyStatement(a,this.options.primaryKey),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class V extends R{constructor(t){super(t,{type:D.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}var B;class P extends C{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),unsigned:t.Validators.boolean(),zeroFill:t.Validators.boolean(),precision:t.Validators.integer(),scale:t.Validators.integer(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} DECIMAL(${this.options.precision}, ${this.options.scale})`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,"number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0),a=this.addUnsignedStatement(a,this.options.unsigned),a=this.addZeroFillStatement(a,this.options.zeroFill),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(B||(B={}));class q extends C{constructor(e,n){super(),this.name=e,this.validateName(this.name);const i=(null==n?void 0:n.type)||B.VARCHAR;this.options=Object.assign({type:i,nullable:!1,primaryKey:!1,default:void 0,length:i!==B.VARCHAR?void 0:255,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(B),nullable:t.Validators.boolean(),primaryKey:t.Validators.boolean(),default:t.Validators.string({optional:!0}),length:t.Validators.integer({optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ${this.options.type}`;this.options.type!==B.CHAR&&this.options.type!==B.VARCHAR||void 0!==this.options.length&&(a+=`(${this.options.length})`),a=this.addNullableStatement(a,this.options.nullable),a=this.addPrimaryKeyStatement(a,this.options.primaryKey),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class j extends C{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} DATE`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class U extends C{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} TIME`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}var _;class F extends C{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} DATETIME`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(_||(_={}));class Y extends C{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({type:_.BLOB,nullable:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(_),nullable:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ${this.options.type}`;a=this.addNullableStatement(a,this.options.nullable),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}class k extends C{constructor(e,n,i){super(),this.name=e,this.validateName(this.name),this.values=n;const{valid:o,message:a}=t.Validators.all([t.Validators.array(t.Validators.all([t.Validators.string(),t.Validators.minLength(1)])),t.Validators.minLength(1)]).validate(this.values);if(!o)throw new TypeError(`Invalid ${this.constructor.name} values. ${a}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i);const s={};for(const t of this.values)s[t]=t;this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.enumValue(s,{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}create(t,e,n){return i=this,o=void 0,s=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let a=`${i} ENUM('${this.values.join("', '")}')`;a=this.addNullableStatement(a,this.options.nullable),a=this.addDefaultStatement(a,this.options.default?`'${this.options.default}'`:void 0),a=this.addIndexStatement(a,this.options.index),a=this.addAfterStatement(a,this.options.addAfter?yield t.escape(this.options.addAfter):void 0,!n),n?yield t.query(`CREATE TABLE ${o} (${a});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${a};`)},new((a=void 0)||(a=Promise))((function(t,e){function n(t){try{c(s.next(t))}catch(t){e(t)}}function r(t){try{c(s.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof a?i:new a((function(t){t(i)}))).then(n,r)}c((s=s.apply(i,o||[])).next())}));var i,o,a,s}}var z=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class H{constructor(t,e,n,i){this.operations=[],this.name=t,this.connection=e,this.operations=n,this.tableExists=i}id(t="id"){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const e=new V(t);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}int(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const n=new R(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}decimal(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const n=new P(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}string(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const n=new q(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}enum(t,e,n){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const i=new k(t,e,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}date(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const n=new j(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}time(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const n=new U(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}datetime(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const n=new F(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}blob(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){const n=new Y(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}renameColumn(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} RENAME COLUMN ${yield this.connection.escape(t)} TO ${yield this.connection.escape(e)};`)})))),this}dropColumn(t){return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP COLUMN ${yield this.connection.escape(t)};`)})))),this}addColumnIndex(t){return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} ADD INDEX ${yield this.connection.escape(t)};`)})))),this}dropColumnIndex(t){return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP INDEX ${yield this.connection.escape(t)};`)})))),this}setColumnNullable(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} ${e?"NULL":"NOT NULL"};`)})))),this}setColumnDefault(t,e){return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} DEFAULT ${"string"==typeof e?`'${e}'`:e};`)})))),this}drop(){return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${yield this.connection.escape(this.name)};`)})))),this}}class X{constructor(t,e){this.connection=t,this.operations=e}create(t){return new H(t,this.connection,this.operations,!1)}table(t){return new H(t,this.connection,this.operations,!0)}}var K=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class G{constructor(t){this.operations=[],this.connections=t}database(t,e){let n;if(e)n=this.connections.get(e);else{const e=this.connections.getAllByDatabaseName(t);if(0===e.length)throw new Error(`No connections found for database "${t}"`);if(e.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);n=e[0]}return this.operations.push((()=>K(this,void 0,void 0,(function*(){yield n.query(`CREATE DATABASE IF NOT EXISTS ${yield n.escape(t)};`)})))),this.operations.push((()=>K(this,void 0,void 0,(function*(){yield n.query(`USE ${yield n.escape(t)};`)})))),new X(n,this.operations)}executePendingOperations(){return K(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}var Z=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class Q extends M{execute(){return Z(this,void 0,void 0,(function*(){const t=x.getConfig(),e=new I(t.connections),n=new G(e);let i=0;const o=yield this.getMigrationsToRollBack();if(o.length){try{for(const{migrationRow:t,migrationFile:e}of o){const o=yield this.getMigrationClassInstance(e);yield o.down(n),yield n.executePendingOperations(),yield x.getMigrationDb().getMigrationRepository().remove(t),i++}L.green(`Successfully rolled back ${i} migration${1!==i?"s":""}`)}catch(t){L.red(`Failed to roll back migrations: ${t.message}`),L.red(t.stack)}yield e.destroyAllInitialised()}else L.blue("No migrations to rollback")}))}getMigrationsToRollBack(){return Z(this,void 0,void 0,(function*(){const t=yield x.getMigrationDb().getMigrationRepository().getLatestBatch();if(!t)return[];const e=yield x.getMigrationDb().getMigrationRepository().getAllByBatch(t),n=yield x.getProjectMigrations();return Object.values(e).sort(((t,e)=>t.name<e.name?1:-1)).map((t=>{const e=n[t.group].find((e=>e.name===t.name));if(!e)throw new Error(`Could not find migration file for ${t.name} in group ${t.group}`);return{migrationRow:t,migrationFile:e}}))}))}}var J=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};class W extends M{constructor(t){super(),this.options=t}execute(){var t;return J(this,void 0,void 0,(function*(){let e=0;const n=x.getConfig(),i=new I(n.connections),o=new G(i),a=yield this.getMigrationFilesToRun(),s=x.getMigrationDb().getMigrationRepository(),r=yield s.getLatestBatch(),c=r?r+1:1;try{for(const t of a){const n=yield this.getMigrationClassInstance(t);yield n.up(o),yield o.executePendingOperations();const i=new l;i.name=t.name,i.group=t.group,i.executed=u.DateTime.now().toSQL({includeOffset:!1}),i.batch=c,yield s.save(i),e++}L.green(`Successfully ran ${e} migration${1!==e?"s":""}`)}catch(n){L.red(`Failed to run migrations: ${n.message}`),L.red(n.stack),!0===(null===(t=this.options)||void 0===t?void 0:t.rollbackOnError)&&(e>0?(console.log(""),L.yellow("Attempting to roll back migrations..."),yield(new Q).execute()):(console.log(""),L.yellow("Nothing to roll back - 0 migrations finished successfully.")))}yield i.destroyAllInitialised()}))}getMigrationFilesToRun(){return J(this,void 0,void 0,(function*(){const t=yield x.getProjectMigrations({includeExecuted:!1}),e=[];for(const n in t)e.push(...t[n]);return e.sort(((t,e)=>t.name<e.name?-1:1)),e}))}}var tt=function(t,e,n,i){return new(n||(n=Promise))((function(o,a){function s(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,r)}c((i=i.apply(t,e||[])).next())}))};function et(t){return(e,n,i)=>tt(this,void 0,void 0,(function*(){yield x.ensureMigrationDbExists(),yield x.getMigrationDb().initialize(),yield t(e,n,i),yield x.getMigrationDb().destroy()}))}tt(void 0,void 0,void 0,(function*(){yield x.loadConfig();const{default:t}=yield Promise.resolve().then(o.t.bind(o,562,23));try{t.name("Electra Migrate").description("MySQL Migrations for Node.js Applications").version(o(147).i8),t.command("status","Show the status of all migrations").action(et((()=>tt(void 0,void 0,void 0,(function*(){yield(new N).execute()}))))),t.command("run","Run all migrations").option("--rollback-on-error","Automatically rollback migrations if an error occurs").action(et(((t,e)=>tt(void 0,void 0,void 0,(function*(){const t=new W({rollbackOnError:e.rollbackOnError||!1});yield t.execute()}))))),t.command("rollback","Rollback the last batch of migrations").action(et((()=>tt(void 0,void 0,void 0,(function*(){yield(new Q).execute()}))))),t.parse(process.argv)}catch(t){console.log($().redBright(t.stack))}}))})(),module.exports=a})();
//# sourceMappingURL=migrate.cjs.map