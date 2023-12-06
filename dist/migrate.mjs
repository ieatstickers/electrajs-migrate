import*as t from"caporal";import*as e from"@electra/utility";import*as n from"typeorm";import*as i from"luxon";import{createRequire as o}from"module";import*as s from"chalk";import*as a from"reflect-metadata";var r={704:e=>{e.exports=t},147:t=>{t.exports={i8:"1.0.0"}}},c={};function l(t){var e=c[t];if(void 0!==e)return e.exports;var n=c[t]={exports:{}};return r[t](n,n.exports,l),n.exports}l.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return l.d(e,{a:e}),e},l.d=(t,e)=>{for(var n in e)l.o(e,n)&&!l.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},l.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{const t=(a={Objects:()=>e.Objects,Validators:()=>e.Validators},r={},l.d(r,a),r);var a,r;const c=(t=>{var e={};return l.d(e,t),e})({Column:()=>n.Column,DataSource:()=>n.DataSource,Entity:()=>n.Entity,PrimaryGeneratedColumn:()=>n.PrimaryGeneratedColumn});var d=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class u{constructor(t){this.dataSource=new c.DataSource(t)}initialize(){return d(this,void 0,void 0,(function*(){yield this.dataSource.initialize()}))}destroy(){return d(this,void 0,void 0,(function*(){yield this.dataSource.destroy()}))}}class h{constructor(t){this.entityManager=t}}var f=function(t,e,n,i){var o,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(e,n,a):o(e,n))||a);return s>3&&a&&Object.defineProperty(e,n,a),a},p=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let y=class{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}};f([(0,c.PrimaryGeneratedColumn)(),p("design:type",Number)],y.prototype,"id",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"group",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"name",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"executed",void 0),f([(0,c.Column)(),p("design:type",Number)],y.prototype,"batch",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"created",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"updated",void 0),y=f([(0,c.Entity)("migration")],y);class v{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}}const g=(t=>{var e={};return l.d(e,t),e})({DateTime:()=>i.DateTime});var m=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class E extends h{getAll(){return m(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.find(y))}))}getById(t){return m(this,void 0,void 0,(function*(){return this.toEntity(yield this.entityManager.findOneBy(y,{id:t}))}))}getLatestBatch(){return m(this,void 0,void 0,(function*(){const t=yield this.entityManager.createQueryBuilder(y,"migration").select("MAX(migration.batch)","maxBatch").getRawOne();return t&&t.maxBatch?parseInt(t.maxBatch):null}))}getAllByBatch(t){return m(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.createQueryBuilder(y,"m").where("m.batch = :batch",{batch:t}).orderBy("executed","DESC").getMany())}))}remove(...t){return m(this,void 0,void 0,(function*(){yield this.entityManager.remove(t.map((t=>this.toModel(t))))}))}save(...t){return m(this,void 0,void 0,(function*(){yield this.entityManager.save(t.map((t=>{const e=g.DateTime.now().toSQL({includeOffset:!1});return t.id||(t.created=e),t.updated=e,this.toModel(t)})))}))}toEntityMap(t){const e={};return t.forEach((t=>{e[t.id]=this.toEntity(t)})),e}toEntity(e){return t.Objects.hydrate(new v,e)}toModel(e){return t.Objects.hydrate(new y,e)}getModel(){return y}}var b=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class T extends u{constructor(t){super({type:"mysql",database:t.database,host:t.host,port:t.port,username:t.username,password:t.password,entities:[y]})}transaction(t){return b(this,void 0,void 0,(function*(){yield this.dataSource.transaction((e=>b(this,void 0,void 0,(function*(){const n={migration:new E(e)};return t(n)}))))}))}getMigrationRepository(){return new E(this.dataSource.manager)}}const w=o(import.meta.url)("path");var L=l.n(w);const N=o(import.meta.url)("fs");var A=l.n(N);class x{static import(...t){return e=this,n=void 0,o=function*(){const[e,n]=t,i=null!=n?e:null,o=null!=n?n:e;console.log(`Importing ${i} from ${o}`);const s=yield import(`${o}`);return i?s[i]:s},new((i=void 0)||(i=Promise))((function(t,s){function a(t){try{c(o.next(t))}catch(t){s(t)}}function r(t){try{c(o.throw(t))}catch(t){s(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((o=o.apply(e,n||[])).next())}));var e,n,i,o}}var $,O=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class M{static ensureMigrationDbExists(){return O(this,void 0,void 0,(function*(){const t=this.getMigrationDbConnectionOptions(),e=new c.DataSource({type:"mysql",host:t.host,port:t.port,username:t.username,password:t.password});yield e.initialize();const n=e.createQueryRunner();yield n.connect(),yield n.query(`CREATE DATABASE IF NOT EXISTS ${t.database};`),yield n.query(`USE ${t.database}`),yield n.query("\n      CREATE TABLE IF NOT EXISTS migration (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        `group` VARCHAR(255) NOT NULL,\n        name VARCHAR(255) NOT NULL,\n        executed DATETIME NOT NULL,\n        batch INT NOT NULL,\n        created DATETIME NOT NULL,\n        updated DATETIME NOT NULL\n      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n      "),yield n.release(),yield e.destroy()}))}static getMigrationDb(){return this.migrationDb||(this.migrationDb=new T(this.getMigrationDbConnectionOptions())),this.migrationDb}static loadConfig(){return O(this,void 0,void 0,(function*(){try{this.config=yield x.import("default",L().join(process.cwd(),"migrate.config.js"))}catch(t){throw new Error(`Failed to read migrate.config.js file: ${t.message}`)}const{valid:e,message:n}=t.Validators.schema({migrationDatabase:t.Validators.string(),connections:t.Validators.object(t.Validators.schema({host:t.Validators.string(),port:t.Validators.integer(),username:t.Validators.string(),password:t.Validators.string(),databases:t.Validators.array(t.Validators.string())})),migrationDirs:t.Validators.object(t.Validators.schema({name:t.Validators.string(),path:t.Validators.string()}))}).validate(this.config);if(!e)throw new Error(`Invalid migrate.config.js file: ${n}`);return this.config}))}static getConfig(){if(!this.config)throw new Error("Config not loaded");return this.config}static getProjectMigrations(e){return O(this,void 0,void 0,(function*(){const n={},i=this.getConfig().migrationDirs,o=yield this.getMigrationDb().getMigrationRepository().getAll();for(const s in i){n[s]=[];const{name:a,path:r}=i[s];let c;const l=L().join(process.cwd(),r);try{c=yield A().promises.readdir(l)}catch(t){throw new Error(`Failed to read migration directory ${r}: ${t.message}`)}for(const i of c){const[r]=i.split("."),{valid:c,message:d}=t.Validators.regex(/^(19|20)\d{2}_(0[1-9]|1[0-2])_(0[1-9]|[12][0-9]|3[01])_([0-1][0-9]|2[0-3])([0-5][0-9]){2}_[A-Za-z][A-Za-z0-9_]*$/,"YYYY_MM_DD_HHMMSS_MigrationName").validate(r);if(!c)throw new Error(`Invalid migration file name: ${d}`);const u=Object.values(o).find((t=>t.name===r));if(!1===(null==e?void 0:e.includeExecuted)&&(null==u?void 0:u.executed))continue;const h={filepath:`${l}/${i}`,group:s,groupDisplayName:a,name:r,executed:(null==u?void 0:u.executed)||null,batch:(null==u?void 0:u.batch)||null};n[s].push(h)}}return n}))}static getMigrationDbConnectionOptions(){const t=this.getConfig(),{migrationDatabase:e}=t;let n;for(const i in t.connections)if(t.connections[i].databases.includes(e)){if(n)throw new Error(`Multiple connections found for migration database "${e}"`);n=t.connections[i]}if(!n)throw new Error(`Cannot connect to migration database - no connection found for database "${e}"`);return{database:e,host:n.host,port:n.port,username:n.username,password:n.password}}}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}($||($={}));class D{validateName(e){const{valid:n,message:i}=t.Validators.string().validate(e);if(!n)throw new TypeError(`Invalid ${this.constructor.name} name: ${i}`);return!0}validateOptions(e,n){const{valid:i,message:o}=t.Validators.schema(n).validate(e);if(!i)throw new TypeError(`Invalid ${this.constructor.name} options. ${o}`);return!0}}class I extends D{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({type:$.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1},n),this.validateOptions(this.options,{type:t.Validators.enumValue($),nullable:t.Validators.boolean(),default:t.Validators.integer({optional:!0}),unsigned:t.Validators.boolean(),autoIncrement:t.Validators.boolean(),zeroFill:t.Validators.boolean(),primaryKey:t.Validators.boolean(),index:t.Validators.boolean()})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} ${this.options.type}`;this.options.nullable?s+=" NULL":s+=" NOT NULL",void 0!==this.options.default&&(s+=` DEFAULT ${this.options.default}`),this.options.unsigned&&(s+=" UNSIGNED"),this.options.autoIncrement&&(s+=" AUTO_INCREMENT"),this.options.zeroFill&&(s+=" ZEROFILL"),this.options.primaryKey&&(s+=" PRIMARY KEY"),this.options.index&&(s+=" INDEX"),n?yield t.query(`CREATE TABLE IF NOT EXISTS ${o} (${s});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s};`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class C extends I{constructor(t){super(t,{type:$.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}var R;class B extends D{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),unsigned:t.Validators.boolean(),zeroFill:t.Validators.boolean(),precision:t.Validators.integer(),scale:t.Validators.integer(),index:t.Validators.boolean()})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} DECIMAL(${this.options.precision}, ${this.options.scale})`;this.options.nullable?s+=" NULL":s+=" NOT NULL",void 0!==this.options.default&&(s+=` DEFAULT ${this.options.default}`),this.options.unsigned&&(s+=" UNSIGNED"),this.options.zeroFill&&(s+=" ZEROFILL"),this.options.index&&(s+=" INDEX"),n?yield t.query(`CREATE TABLE IF NOT EXISTS ${o} (${s});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s};`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(R||(R={}));class V extends D{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({type:R.VARCHAR,nullable:!1,primaryKey:!1,default:void 0,length:(null==n?void 0:n.type)&&(null==n?void 0:n.type)!==R.VARCHAR?void 0:255,index:!1},n),this.validateOptions(this.options,{type:t.Validators.enumValue(R),nullable:t.Validators.boolean(),primaryKey:t.Validators.boolean(),default:t.Validators.string({optional:!0}),length:t.Validators.integer({optional:!0}),index:t.Validators.boolean()})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} ${this.options.type}`;this.options.type!==R.CHAR&&this.options.type!==R.VARCHAR||void 0!==this.options.length&&(s+=`(${this.options.length})`),this.options.nullable?s+=" NULL":s+=" NOT NULL",this.options.primaryKey&&(s+=" PRIMARY KEY"),void 0!==this.options.default&&(s+=` DEFAULT ${yield t.escape(this.options.default)}`),this.options.index&&(s+=" INDEX"),n?yield t.query(`CREATE TABLE IF NOT EXISTS ${o}(${s});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s};`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class S extends D{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:t.Validators.boolean()})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} DATE`;this.options.nullable?s+=" NULL":s+=" NOT NULL",void 0!==this.options.default&&(s+=` DEFAULT ${this.options.default}`),this.options.index&&(s+=" INDEX"),n?yield t.query(`CREATE TABLE IF NOT EXISTS ${o}(${s});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s};`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class U extends D{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0})})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} TIME`;this.options.nullable?s+=" NULL":s+=" NOT NULL",void 0!==this.options.default&&(s+=` DEFAULT ${this.options.default}`),n?yield t.query(`CREATE TABLE IF NOT EXISTS ${o}(${s});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s};`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}var P;class q extends D{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:t.Validators.boolean()})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} DATETIME`;this.options.nullable?s+=" NULL":s+=" NOT NULL",void 0!==this.options.default&&(s+=` DEFAULT ${this.options.default}`),this.options.index&&(s+=" INDEX"),n?yield t.query(`CREATE TABLE IF NOT EXISTS ${o}(${s});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s};`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(P||(P={}));class j extends D{constructor(e,n){super(),this.name=e,this.validateName(this.name),this.options=Object.assign({type:P.BLOB,nullable:!1},n),this.validateOptions(this.options,{type:t.Validators.enumValue(P),nullable:t.Validators.boolean()})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} ${this.options.type}`;this.options.nullable?s+=" NULL":s+=" NOT NULL",n?yield t.query(`CREATE TABLE IF NOT EXISTS ${o}(${s});`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s};`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class F extends D{constructor(e,n,i){super(),this.name=e,this.validateName(this.name),this.values=n;const{valid:o,message:s}=t.Validators.all([t.Validators.array(t.Validators.string()),t.Validators.minLength(1)]).validate(this.values);if(!o)throw new TypeError(`Invalid ${this.constructor.name} values. ${s}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1},i);const a={};for(const t of this.values)a[t]=t;this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.enumValue(a,{optional:!0}),index:t.Validators.boolean()})}create(t,e,n){return i=this,o=void 0,a=function*(){const i=yield t.escape(this.name),o=yield t.escape(e);let s=`${i} ENUM('${(yield Promise.all(this.values.map((e=>t.escape(e))))).join("', '")}')`;this.options.nullable?s+=" NULL":s+=" NOT NULL",void 0!==this.options.default&&(s+=` DEFAULT '${yield t.escape(this.options.default)}'`),this.options.index&&(s+=" INDEX"),n?yield t.query(`CREATE TABLE ${o} (${s})`):yield t.query(`ALTER TABLE ${o} ADD COLUMN ${s}`)},new((s=void 0)||(s=Promise))((function(t,e){function n(t){try{c(a.next(t))}catch(t){e(t)}}function r(t){try{c(a.throw(t))}catch(t){e(t)}}function c(e){var i;e.done?t(e.value):(i=e.value,i instanceof s?i:new s((function(t){t(i)}))).then(n,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}var X=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class Y{constructor(t,e,n,i){this.operations=[],this.name=t,this.connection=e,this.operations=n,this.tableExists=i}id(t="id"){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const e=new C(t);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}int(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new I(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}decimal(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new B(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}string(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new V(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}enum(t,e,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new F(t,e,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}date(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new S(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}time(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new U(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}datetime(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new q(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}blob(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new j(t,e);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}renameColumn(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} RENAME COLUMN ${yield this.connection.escape(t)} TO ${yield this.connection.escape(e)};`)})))),this}addColumnIndex(t){return this.operations.push((()=>X(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} ADD INDEX ${yield this.connection.escape(t)};`)})))),this}dropColumnIndex(t){return this.operations.push((()=>X(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP INDEX ${yield this.connection.escape(t)};`)})))),this}setColumnNullable(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} ${e?"NULL":"NOT NULL"};`)})))),this}setColumnDefault(t,e){return this.operations.push((()=>X(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} DEFAULT ${yield this.connection.escape(e)};`)})))),this}drop(){return this.operations.push((()=>X(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${yield this.connection.escape(this.name)};`)})))),this}}class k{constructor(t,e){this.connection=t,this.operations=e}create(t){return new Y(t,this.connection,this.operations,!1)}table(t){return new Y(t,this.connection,this.operations,!0)}}var H=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class _{constructor(t){this.operations=[],this.connections=t}database(t,e){let n;if(e)n=this.connections.get(e);else{const e=this.connections.getAllByDatabaseName(t);if(0===e.length)throw new Error(`No connections found for database "${t}"`);if(e.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);n=e[0]}return this.operations.push((()=>H(this,void 0,void 0,(function*(){yield n.query(`CREATE DATABASE IF NOT EXISTS ${yield n.escape(t)};`)})))),this.operations.push((()=>H(this,void 0,void 0,(function*(){yield n.query(`USE ${yield n.escape(t)};`)})))),new k(n,this.operations)}executePendingOperations(){return H(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}var z=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class G{constructor(t){this.connectionConfig=t}query(t,e=[]){return z(this,void 0,void 0,(function*(){const n=yield this.get();return console.log("query",t,e),n.query(t,e)}))}destroy(){return z(this,void 0,void 0,(function*(){this.queryRunner&&(yield this.queryRunner.release(),this.queryRunner=void 0),this.connection&&(yield this.connection.destroy(),this.connection=void 0)}))}isInitialised(){return!!this.connection}escape(t){return z(this,void 0,void 0,(function*(){return(yield this.get()).driver.escape(t)}))}get(){return z(this,void 0,void 0,(function*(){return this.connection||(this.connection=new c.DataSource({type:"mysql",host:this.connectionConfig.host,port:this.connectionConfig.port,username:this.connectionConfig.username,password:this.connectionConfig.password}),yield this.connection.initialize()),this.connection}))}}class K{constructor(t){this.config={},this.connections={},this.config=t}get(t){if(this.connections[t])return this.connections[t];if(!this.config[t])throw new Error(`Config for connection "${t}" not found`);const{host:e,port:n,username:i,password:o}=this.config[t];return this.connections[t]=new G({host:e,port:n,username:i,password:o}),this.connections[t]}getAllByDatabaseName(t){const e=[];for(const n in this.config)this.config[n].databases.includes(t)&&e.push(this.get(n));return e}destroyAllInitialised(){return t=this,e=void 0,i=function*(){const t=this.getAllInitialised();for(const e of t)yield e.destroy()},new((n=void 0)||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}));var t,e,n,i}getAllInitialised(){return Object.values(this.connections).filter((t=>t.isInitialised()))}}const Q=(t=>{var e={};return l.d(e,t),e})({default:()=>s.default});var Z=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};class J{static status(){return Z(this,void 0,void 0,(function*(){const t=M.getConfig().migrationDirs,e=yield M.getProjectMigrations();for(const n in e){const i=e[n],{name:o}=t[n];if(console.log(Q.default.yellowBright(o)),0!==i.length)for(const t of i)console.log(`  ${t.executed?Q.default.greenBright(t.name):Q.default.redBright(t.name)}`);else console.log(Q.default.redBright("  * No migrations found *"))}}))}static run(t){return Z(this,void 0,void 0,(function*(){const e=yield M.getProjectMigrations({includeExecuted:!1});if(0===Object.keys(e).length)return void console.log(Q.default.blueBright("No migrations to run"));const n=M.getConfig(),i=new K(n.connections),o=yield M.getMigrationDb().getMigrationRepository().getLatestBatch(),s=o?o+1:1,a=new _(i);let r=0;try{const t=[];for(const n in e)t.push(...e[n]);t.sort(((t,e)=>t.name<e.name?-1:t.name>e.name?1:0));for(const e of t){const t=yield this.getMigrationClassInstance(e);yield t.up(a),yield a.executePendingOperations();const n=new v;n.name=e.name,n.group=e.group,n.executed=g.DateTime.now().toSQL({includeOffset:!1}),n.batch=s,yield M.getMigrationDb().getMigrationRepository().save(n),r++}console.log(Q.default.green(`Successfully ran ${r} migration${1!==r?"s":""}`))}catch(e){console.log(Q.default.redBright(`Failed to run migrations: ${e.message}`)),console.log(Q.default.redBright(e.stack)),!0===(null==t?void 0:t.rollbackOnError)&&(r>0?(console.log(""),console.log(Q.default.yellowBright("Attempting to roll back migrations...")),yield this.rollback()):(console.log(""),console.log(Q.default.yellowBright("Nothing to roll back - 0 migrations finished successfully."))))}yield i.destroyAllInitialised()}))}static rollback(){return Z(this,void 0,void 0,(function*(){const t=yield M.getMigrationDb().getMigrationRepository().getLatestBatch();if(!t)return void console.log(Q.default.blueBright("No migrations to rollback"));const e=M.getConfig(),n=new K(e.connections),i=new _(n),o=yield M.getProjectMigrations();let s=0;const a=yield M.getMigrationDb().getMigrationRepository().getAllByBatch(t);if(0!==Object.keys(a).length){try{const t=Object.values(a).sort(((t,e)=>t.name<e.name?1:t.name>e.name?-1:0)).map((t=>{const e=o[t.group].find((e=>e.name===t.name));if(!e)throw new Error(`Could not find migration file for ${t.name} in group ${t.group}`);return{migrationRow:t,migrationFile:e}}));for(const{migrationRow:e,migrationFile:n}of t){const t=yield this.getMigrationClassInstance(n);yield t.down(i),yield i.executePendingOperations(),yield M.getMigrationDb().getMigrationRepository().remove(e),s++}console.log(Q.default.green(`Successfully rolled back ${s} migration${1!==s?"s":""}`))}catch(t){console.log(Q.default.redBright(`Failed to roll back migrations: ${t.message}`)),console.log(Q.default.redBright(t.stack))}yield n.destroyAllInitialised()}else console.log(Q.default.blueBright("No migrations to roll back"))}))}static getMigrationClassInstance(t){return Z(this,void 0,void 0,(function*(){const e=yield x.import(t.filepath);let n;const i=t.name.split("_").pop();if(e[i])n=e[i];else{if(!e.default)throw new Error(`Could not find migration class in ${t.filepath}`);n=e.default}return new n}))}}l.d({},{});var W=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};function tt(t){return(e,n,i)=>W(this,void 0,void 0,(function*(){yield M.ensureMigrationDbExists(),yield M.getMigrationDb().initialize(),yield t(e,n,i),yield M.getMigrationDb().destroy()}))}W(void 0,void 0,void 0,(function*(){yield M.loadConfig();const{default:t}=yield Promise.resolve().then(l.bind(l,704));try{t.name("Electra Migrate").description("MySQL Migrations for Node.js Applications").version(l(147).i8),t.command("status","Show the status of all migrations").action(tt((()=>W(void 0,void 0,void 0,(function*(){yield J.status()}))))),t.command("run","Run all migrations").option("--rollback-on-error","Automatically rollback migrations if an error occurs").action(tt(((t,e,n)=>W(void 0,void 0,void 0,(function*(){yield J.run({rollbackOnError:e.rollbackOnError||!1})}))))),t.command("rollback","Rollback the last batch of migrations").action(tt((()=>W(void 0,void 0,void 0,(function*(){yield J.rollback()}))))),t.parse(process.argv)}catch(t){console.log(Q.default.redBright(t.stack))}}))})();