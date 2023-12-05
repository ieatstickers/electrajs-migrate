import*as t from"caporal";import*as n from"@electra/utility";import*as i from"typeorm";import*as e from"luxon";import{createRequire as o}from"module";import*as s from"chalk";import*as a from"reflect-metadata";var r={704:n=>{n.exports=t},147:t=>{t.exports={i8:"1.0.0"}}},c={};function l(t){var n=c[t];if(void 0!==n)return n.exports;var i=c[t]={exports:{}};return r[t](i,i.exports,l),i.exports}l.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return l.d(n,{a:n}),n},l.d=(t,n)=>{for(var i in n)l.o(n,i)&&!l.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:n[i]})},l.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),(()=>{const t=(a={Objects:()=>n.Objects,Validators:()=>n.Validators},r={},l.d(r,a),r);var a,r;const c=(t=>{var n={};return l.d(n,t),n})({Column:()=>i.Column,DataSource:()=>i.DataSource,Entity:()=>i.Entity,PrimaryGeneratedColumn:()=>i.PrimaryGeneratedColumn});var u=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class d{constructor(t){this.dataSource=new c.DataSource(t)}initialize(){return u(this,void 0,void 0,(function*(){yield this.dataSource.initialize()}))}destroy(){return u(this,void 0,void 0,(function*(){yield this.dataSource.destroy()}))}}class h{constructor(t){this.entityManager=t}}var f=function(t,n,i,e){var o,s=arguments.length,a=s<3?n:null===e?e=Object.getOwnPropertyDescriptor(n,i):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,n,i,e);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(n,i,a):o(n,i))||a);return s>3&&a&&Object.defineProperty(n,i,a),a},p=function(t,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)};let y=class{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}};f([(0,c.PrimaryGeneratedColumn)(),p("design:type",Number)],y.prototype,"id",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"group",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"name",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"executed",void 0),f([(0,c.Column)(),p("design:type",Number)],y.prototype,"batch",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"created",void 0),f([(0,c.Column)(),p("design:type",String)],y.prototype,"updated",void 0),y=f([(0,c.Entity)("migration")],y);class v{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}}const g=(t=>{var n={};return l.d(n,t),n})({DateTime:()=>e.DateTime});var m=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class E extends h{getAll(){return m(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.find(y))}))}getById(t){return m(this,void 0,void 0,(function*(){return this.toEntity(yield this.entityManager.findOneBy(y,{id:t}))}))}getLatestBatch(){return m(this,void 0,void 0,(function*(){const t=yield this.entityManager.createQueryBuilder(y,"migration").select("MAX(migration.batch)","maxBatch").getRawOne();return t&&t.maxBatch?parseInt(t.maxBatch):null}))}getAllByBatch(t){return m(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.createQueryBuilder(y,"m").where("m.batch = :batch",{batch:t}).orderBy("executed","DESC").getMany())}))}remove(...t){return m(this,void 0,void 0,(function*(){yield this.entityManager.remove(t.map((t=>this.toModel(t))))}))}save(...t){return m(this,void 0,void 0,(function*(){yield this.entityManager.save(t.map((t=>{const n=g.DateTime.now().toSQL({includeOffset:!1});return t.id||(t.created=n),t.updated=n,this.toModel(t)})))}))}toEntityMap(t){const n={};return t.forEach((t=>{n[t.id]=this.toEntity(t)})),n}toEntity(n){return t.Objects.hydrate(new v,n)}toModel(n){return t.Objects.hydrate(new y,n)}getModel(){return y}}var b=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class T extends d{constructor(t){super({type:"mysql",database:t.database,host:t.host,port:t.port,username:t.username,password:t.password,entities:[y]})}transaction(t){return b(this,void 0,void 0,(function*(){yield this.dataSource.transaction((n=>b(this,void 0,void 0,(function*(){const i={migration:new E(n)};return t(i)}))))}))}getMigrationRepository(){return new E(this.dataSource.manager)}}const w=o(import.meta.url)("path");var x=l.n(w);const L=o(import.meta.url)("fs");var N=l.n(L);class A{static import(...t){return n=this,i=void 0,o=function*(){const[n,i]=t,e=null!=i?n:null,o=null!=i?i:n;console.log(`Importing ${e} from ${o}`);const s=yield import(`${o}`);return e?s[e]:s},new((e=void 0)||(e=Promise))((function(t,s){function a(t){try{c(o.next(t))}catch(t){s(t)}}function r(t){try{c(o.throw(t))}catch(t){s(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof e?i:new e((function(t){t(i)}))).then(a,r)}c((o=o.apply(n,i||[])).next())}));var n,i,e,o}}var M,$=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class I{static ensureMigrationDbExists(){return $(this,void 0,void 0,(function*(){const t=this.getMigrationDbConnectionOptions(),n=new c.DataSource({type:"mysql",host:t.host,port:t.port,username:t.username,password:t.password});yield n.initialize();const i=n.createQueryRunner();yield i.connect(),yield i.query(`CREATE DATABASE IF NOT EXISTS ${t.database};`),yield i.query(`USE ${t.database}`),yield i.query("\n      CREATE TABLE IF NOT EXISTS migration (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        `group` VARCHAR(255) NOT NULL,\n        name VARCHAR(255) NOT NULL,\n        executed DATETIME NOT NULL,\n        batch INT NOT NULL,\n        created DATETIME NOT NULL,\n        updated DATETIME NOT NULL\n      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n      "),yield i.release(),yield n.destroy()}))}static getMigrationDb(){return this.migrationDb||(this.migrationDb=new T(this.getMigrationDbConnectionOptions())),this.migrationDb}static loadConfig(){return $(this,void 0,void 0,(function*(){try{this.config=yield A.import("default",x().join(process.cwd(),"migrate.config.js"))}catch(t){throw new Error(`Failed to read migrate.config.js file: ${t.message}`)}const{valid:n,message:i}=t.Validators.schema({migrationDatabase:t.Validators.string(),connections:t.Validators.object(t.Validators.schema({host:t.Validators.string(),port:t.Validators.integer(),username:t.Validators.string(),password:t.Validators.string(),databases:t.Validators.array(t.Validators.string())})),migrationDirs:t.Validators.object(t.Validators.schema({name:t.Validators.string(),path:t.Validators.string()}))}).validate(this.config);if(!n)throw new Error(`Invalid migrate.config.js file: ${i}`);return this.config}))}static getConfig(){if(!this.config)throw new Error("Config not loaded");return this.config}static getProjectMigrations(t){return $(this,void 0,void 0,(function*(){const n={},i=this.getConfig().migrationDirs,e=yield this.getMigrationDb().getMigrationRepository().getAll();for(const o in i){n[o]=[];const{name:s,path:a}=i[o];let r;const c=x().join(process.cwd(),a);try{r=yield N().promises.readdir(c)}catch(t){throw new Error(`Failed to read migration directory ${a}: ${t.message}`)}for(const i of r){const[a]=i.split("."),r=Object.values(e).find((t=>t.name===a));if(!1===(null==t?void 0:t.includeExecuted)&&(null==r?void 0:r.executed))continue;const l={filepath:`${c}/${i}`,group:o,groupDisplayName:s,name:a,executed:(null==r?void 0:r.executed)||null,batch:(null==r?void 0:r.batch)||null};n[o].push(l)}}return n}))}static getMigrationDbConnectionOptions(){const t=this.getConfig(),{migrationDatabase:n}=t;let i;for(const e in t.connections)if(t.connections[e].databases.includes(n)){if(i)throw new Error(`Multiple connections found for migration database "${n}"`);i=t.connections[e]}if(!i)throw new Error(`Cannot connect to migration database - no connection found for database "${n}"`);return{database:n,host:i.host,port:i.port,username:i.username,password:i.password}}}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(M||(M={}));class O{validateName(n){const{valid:i,message:e}=t.Validators.string().validate(n);if(!i)throw new TypeError(`Invalid ${this.constructor.name} name: ${e}`);return!0}validateOptions(n,i){const{valid:e,message:o}=t.Validators.schema(i).validate(n);if(!e)throw new TypeError(`Invalid ${this.constructor.name} options. ${o}`);return!0}}class D extends O{constructor(n,i){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({type:M.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1},i),this.validateOptions(this.options,{type:t.Validators.enumValue(M),nullable:t.Validators.boolean(),default:t.Validators.integer({optional:!0}),unsigned:t.Validators.boolean(),autoIncrement:t.Validators.boolean(),zeroFill:t.Validators.boolean(),primaryKey:t.Validators.boolean(),index:t.Validators.boolean()})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} ${this.options.type}`;this.options.nullable?e+=" NULL":e+=" NOT NULL",void 0!==this.options.default&&(e+=` DEFAULT ${this.options.default}`),this.options.unsigned&&(e+=" UNSIGNED"),this.options.autoIncrement&&(e+=" AUTO_INCREMENT"),this.options.zeroFill&&(e+=" ZEROFILL"),this.options.primaryKey&&(e+=" PRIMARY KEY"),this.options.index&&(e+=" INDEX"),i?yield t.query(`CREATE TABLE IF NOT EXISTS ${n} (${e});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e};`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}class R extends D{constructor(t){super(t,{type:M.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}var C;class B extends O{constructor(n,i){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1},i),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),unsigned:t.Validators.boolean(),zeroFill:t.Validators.boolean(),precision:t.Validators.integer(),scale:t.Validators.integer(),index:t.Validators.boolean()})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} DECIMAL(${this.options.precision}, ${this.options.scale})`;this.options.nullable?e+=" NULL":e+=" NOT NULL",void 0!==this.options.default&&(e+=` DEFAULT ${this.options.default}`),this.options.unsigned&&(e+=" UNSIGNED"),this.options.zeroFill&&(e+=" ZEROFILL"),this.options.index&&(e+=" INDEX"),i?yield t.query(`CREATE TABLE IF NOT EXISTS ${n} (${e});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e};`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(C||(C={}));class V extends O{constructor(n,i){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({type:C.VARCHAR,nullable:!1,primaryKey:!1,default:void 0,length:(null==i?void 0:i.type)&&(null==i?void 0:i.type)!==C.VARCHAR?void 0:255,index:!1},i),this.validateOptions(this.options,{type:t.Validators.enumValue(C),nullable:t.Validators.boolean(),primaryKey:t.Validators.boolean(),default:t.Validators.string({optional:!0}),length:t.Validators.integer({optional:!0}),index:t.Validators.boolean()})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} ${this.options.type}`;this.options.type!==C.CHAR&&this.options.type!==C.VARCHAR||void 0!==this.options.length&&(e+=`(${this.options.length})`),this.options.nullable?e+=" NULL":e+=" NOT NULL",this.options.primaryKey&&(e+=" PRIMARY KEY"),void 0!==this.options.default&&(e+=` DEFAULT ${this.options.default}`),this.options.index&&(e+=" INDEX"),i?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${e});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e};`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}class S extends O{constructor(n,i){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1},i),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:t.Validators.boolean()})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} DATE`;this.options.nullable?e+=" NULL":e+=" NOT NULL",void 0!==this.options.default&&(e+=` DEFAULT ${this.options.default}`),this.options.index&&(e+=" INDEX"),i?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${e});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e};`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}class U extends O{constructor(n,i){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0},i),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0})})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} TIME`;this.options.nullable?e+=" NULL":e+=" NOT NULL",void 0!==this.options.default&&(e+=` DEFAULT ${this.options.default}`),i?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${e});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e};`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}var j;class P extends O{constructor(n,i){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1},i),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:t.Validators.boolean()})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} DATETIME`;this.options.nullable?e+=" NULL":e+=" NOT NULL",void 0!==this.options.default&&(e+=` DEFAULT ${this.options.default}`),this.options.index&&(e+=" INDEX"),i?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${e});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e};`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(j||(j={}));class F extends O{constructor(n,i){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({type:j.BLOB,nullable:!1},i),this.validateOptions(this.options,{type:t.Validators.enumValue(j),nullable:t.Validators.boolean()})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} ${this.options.type}`;this.options.nullable?e+=" NULL":e+=" NOT NULL",i?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${e});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e};`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}class q extends O{constructor(n,i,e){super(),this.name=n,this.validateName(this.name),this.values=i;const{valid:o,message:s}=t.Validators.all([t.Validators.array(t.Validators.string()),t.Validators.minLength(1)]).validate(this.values);if(!o)throw new TypeError(`Invalid ${this.constructor.name} values. ${s}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1},e);const a={};for(const t of this.values)a[t]=t;this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.enumValue(a,{optional:!0}),index:t.Validators.boolean()})}create(t,n,i){return e=this,o=void 0,a=function*(){let e=`${this.name} ENUM('${this.values.join("', '")}')`;this.options.nullable?e+=" NULL":e+=" NOT NULL",void 0!==this.options.default&&(e+=` DEFAULT '${this.options.default}'`),this.options.index&&(e+=" INDEX"),i?yield t.query(`CREATE TABLE ${n} (${e})`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${e}`)},new((s=void 0)||(s=Promise))((function(t,n){function i(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof s?e:new s((function(t){t(e)}))).then(i,r)}c((a=a.apply(e,o||[])).next())}));var e,o,s,a}}var X=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class Y{constructor(t,n,i,e){this.operations=[],this.name=t,this.connection=n,this.operations=i,this.tableExists=e}id(t="id"){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const n=new R(t);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}int(t,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new D(t,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}decimal(t,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new B(t,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}string(t,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new V(t,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}enum(t,n,i){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const e=new q(t,n,i);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}date(t,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new S(t,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}time(t,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new U(t,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}datetime(t,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new P(t,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}blob(t,n){return this.operations.push((()=>X(this,void 0,void 0,(function*(){const i=new F(t,n);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}execute(){return X(this,void 0,void 0,(function*(){for(const t of this.operations)yield t()}))}}var k=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class H{constructor(t,n){this.connection=t,this.operations=n}create(t){return new Y(t,this.connection,this.operations,!1)}table(t){return new Y(t,this.connection,this.operations,!0)}drop(t){return this.operations.push((()=>k(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${t};`)})))),this}execute(){return k(this,void 0,void 0,(function*(){for(const t of this.operations)yield t()}))}}var z=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class G{constructor(t){this.operations=[],this.connections=t}database(t,n){let i;if(n)i=this.connections.get(n);else{const n=this.connections.getAllByDatabaseName(t);if(0===n.length)throw new Error(`No connections found for database "${t}"`);if(n.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);i=n[0]}return this.operations.push((()=>z(this,void 0,void 0,(function*(){yield i.query(`CREATE DATABASE IF NOT EXISTS ${t};`)})))),this.operations.push((()=>z(this,void 0,void 0,(function*(){yield i.query(`USE ${t};`)})))),new H(i,this.operations)}}var K=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class _{constructor(t){this.connectionConfig=t}query(t,n=[]){return K(this,void 0,void 0,(function*(){const i=yield this.get();return console.log("query",t,n),i.query(t,n)}))}destroy(){return K(this,void 0,void 0,(function*(){this.queryRunner&&(yield this.queryRunner.release(),this.queryRunner=void 0),this.connection&&(yield this.connection.destroy(),this.connection=void 0)}))}isInitialised(){return!!this.connection}get(){return K(this,void 0,void 0,(function*(){return this.connection||(this.connection=new c.DataSource({type:"mysql",host:this.connectionConfig.host,port:this.connectionConfig.port,username:this.connectionConfig.username,password:this.connectionConfig.password}),yield this.connection.initialize()),this.connection}))}}class Q{constructor(t){this.config={},this.connections={},this.config=t}get(t){if(this.connections[t])return this.connections[t];if(!this.config[t])throw new Error(`Config for connection "${t}" not found`);const{host:n,port:i,username:e,password:o}=this.config[t];return this.connections[t]=new _({host:n,port:i,username:e,password:o}),this.connections[t]}getAllByDatabaseName(t){const n=[];for(const i in this.config)this.config[i].databases.includes(t)&&n.push(this.get(i));return n}destroyAllInitialised(){return t=this,n=void 0,e=function*(){const t=this.getAllInitialised();for(const n of t)yield n.destroy()},new((i=void 0)||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}));var t,n,i,e}getAllInitialised(){return Object.values(this.connections).filter((t=>t.isInitialised()))}}const Z=(t=>{var n={};return l.d(n,t),n})({default:()=>s.default});var J=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};class W{static status(){return J(this,void 0,void 0,(function*(){const t=I.getConfig().migrationDirs,n=yield I.getProjectMigrations();for(const i in n){const e=n[i],{name:o}=t[i];if(console.log(Z.default.yellowBright(o)),0!==e.length)for(const t of e)console.log(`  ${t.executed?Z.default.greenBright(t.name):Z.default.redBright(t.name)}`);else console.log(Z.default.redBright("  * No migrations found *"))}}))}static run(){return J(this,void 0,void 0,(function*(){const t=yield I.getProjectMigrations({includeExecuted:!1});if(0===Object.keys(t).length)return void console.log(Z.default.blueBright("No migrations to run"));const n=I.getConfig(),i=new Q(n.connections),e=yield I.getMigrationDb().getMigrationRepository().getLatestBatch(),o=e?e+1:1,s=new G(i);let a=0;try{const n=[];for(const i in t)n.push(...t[i]);n.sort(((t,n)=>t.name<n.name?-1:t.name>n.name?1:0)),console.log("migrationFilesToRun",n);for(const t of n){const n=yield this.getMigrationClassInstance(t);yield n.up(s);const i=new v;i.name=t.name,i.group=t.group,i.executed=g.DateTime.now().toSQL({includeOffset:!1}),i.batch=o,yield I.getMigrationDb().getMigrationRepository().save(i),a++}console.log(Z.default.green(`Successfully ran ${a} migration${1!==a?"s":""}`))}catch(t){console.log(Z.default.redBright(`Failed to run migrations: ${t.message}`)),console.log(Z.default.redBright(t.stack))}yield i.destroyAllInitialised()}))}static rollback(){return J(this,void 0,void 0,(function*(){const t=yield I.getMigrationDb().getMigrationRepository().getLatestBatch();if(!t)return void console.log(Z.default.blueBright("No migrations to rollback"));const n=I.getConfig(),i=new Q(n.connections),e=new G(i),o=yield I.getProjectMigrations();let s=0;const a=yield I.getMigrationDb().getMigrationRepository().getAllByBatch(t);if(0!==Object.keys(a).length){try{const t=Object.values(a).sort(((t,n)=>t.name<n.name?1:t.name>n.name?-1:0)).map((t=>{const n=o[t.group].find((n=>n.name===t.name));if(!n)throw new Error(`Could not find migration file for ${t.name} in group ${t.group}`);return{migrationRow:t,migrationFile:n}}));console.log("migrationsToRollBack",t);for(const{migrationRow:n,migrationFile:i}of t){const t=yield this.getMigrationClassInstance(i);yield t.down(e),yield I.getMigrationDb().getMigrationRepository().remove(n),s++}console.log(Z.default.green(`Successfully rolled back ${s} migration${1!==s?"s":""}`))}catch(t){console.log(Z.default.redBright(`Failed to roll back migrations: ${t.message}`)),console.log(Z.default.redBright(t.stack))}yield i.destroyAllInitialised()}else console.log(Z.default.blueBright("No migrations to roll back"))}))}static getMigrationClassInstance(t){return J(this,void 0,void 0,(function*(){const n=yield A.import(t.filepath);let i;const e=t.name.split("_").pop();if(n[e])i=n[e];else{if(!n.default)throw new Error(`Could not find migration class in ${t.filepath}`);i=n.default}return new i}))}}l.d({},{});var tt=function(t,n,i,e){return new(i||(i=Promise))((function(o,s){function a(t){try{c(e.next(t))}catch(t){s(t)}}function r(t){try{c(e.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof i?n:new i((function(t){t(n)}))).then(a,r)}c((e=e.apply(t,n||[])).next())}))};function nt(t){return(n,i,e)=>tt(this,void 0,void 0,(function*(){yield I.ensureMigrationDbExists(),yield I.getMigrationDb().initialize(),yield t(n,i,e),yield I.getMigrationDb().destroy()}))}tt(void 0,void 0,void 0,(function*(){yield I.loadConfig();const{default:t}=yield Promise.resolve().then(l.bind(l,704));try{t.name("Electra Migrate").description("MySQL Migrations for Node.js Applications").version(l(147).i8),t.command("status","Show the status of all migrations").action(nt((()=>tt(void 0,void 0,void 0,(function*(){yield W.status()}))))),t.command("run","Run all migrations").action(nt((()=>tt(void 0,void 0,void 0,(function*(){yield W.run()}))))),t.command("rollback","Rollback the last batch of migrations").action(nt((()=>tt(void 0,void 0,void 0,(function*(){yield W.rollback()}))))),t.parse(process.argv)}catch(t){console.log(Z.default.red(t.stack))}}))})();