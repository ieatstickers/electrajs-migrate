(()=>{"use strict";var t,n,e={562:t=>{t.exports=require("caporal")},147:t=>{t.exports={i8:"1.0.0"}}},i={};function o(t){var n=i[t];if(void 0!==n)return n.exports;var s=i[t]={exports:{}};return e[t](s,s.exports,o),s.exports}o.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return o.d(n,{a:n}),n},n=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,o.t=function(e,i){if(1&i&&(e=this(e)),8&i)return e;if("object"==typeof e&&e){if(4&i&&e.__esModule)return e;if(16&i&&"function"==typeof e.then)return e}var s=Object.create(null);o.r(s);var a={};t=t||[null,n({}),n([]),n(n)];for(var r=2&i&&e;"object"==typeof r&&!~t.indexOf(r);r=n(r))Object.getOwnPropertyNames(r).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,o.d(s,a),s},o.d=(t,n)=>{for(var e in n)o.o(n,e)&&!o.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},o.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};(()=>{o.r(s);const t=require("@electra/utility"),n=require("typeorm");var e=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class i{constructor(t){this.dataSource=new n.DataSource(t)}initialize(){return e(this,void 0,void 0,(function*(){yield this.dataSource.initialize()}))}destroy(){return e(this,void 0,void 0,(function*(){yield this.dataSource.destroy()}))}}class a{constructor(t){this.entityManager=t}}var r=function(t,n,e,i){var o,s=arguments.length,a=s<3?n:null===i?i=Object.getOwnPropertyDescriptor(n,e):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,n,e,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(n,e,a):o(n,e))||a);return s>3&&a&&Object.defineProperty(n,e,a),a},c=function(t,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)};let l=class{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}};r([(0,n.PrimaryGeneratedColumn)(),c("design:type",Number)],l.prototype,"id",void 0),r([(0,n.Column)(),c("design:type",String)],l.prototype,"group",void 0),r([(0,n.Column)(),c("design:type",String)],l.prototype,"name",void 0),r([(0,n.Column)(),c("design:type",String)],l.prototype,"executed",void 0),r([(0,n.Column)(),c("design:type",Number)],l.prototype,"batch",void 0),r([(0,n.Column)(),c("design:type",String)],l.prototype,"created",void 0),r([(0,n.Column)(),c("design:type",String)],l.prototype,"updated",void 0),l=r([(0,n.Entity)("migration")],l);class u{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}}const d=require("luxon");var h=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class f extends a{getAll(){return h(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.find(l))}))}getById(t){return h(this,void 0,void 0,(function*(){return this.toEntity(yield this.entityManager.findOneBy(l,{id:t}))}))}getLatestBatch(){return h(this,void 0,void 0,(function*(){const t=yield this.entityManager.createQueryBuilder(l,"migration").select("MAX(migration.batch)","maxBatch").getRawOne();return t&&t.maxBatch?parseInt(t.maxBatch):null}))}getAllByBatch(t){return h(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.createQueryBuilder(l,"m").where("m.batch = :batch",{batch:t}).orderBy("executed","DESC").getMany())}))}remove(...t){return h(this,void 0,void 0,(function*(){yield this.entityManager.remove(t.map((t=>this.toModel(t))))}))}save(...t){return h(this,void 0,void 0,(function*(){yield this.entityManager.save(t.map((t=>{const n=d.DateTime.now().toSQL({includeOffset:!1});return t.id||(t.created=n),t.updated=n,this.toModel(t)})))}))}toEntityMap(t){const n={};return t.forEach((t=>{n[t.id]=this.toEntity(t)})),n}toEntity(n){return t.Objects.hydrate(new u,n)}toModel(n){return t.Objects.hydrate(new l,n)}getModel(){return l}}var p=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class y extends i{constructor(t){super({type:"mysql",database:t.database,host:t.host,port:t.port,username:t.username,password:t.password,entities:[l]})}transaction(t){return p(this,void 0,void 0,(function*(){yield this.dataSource.transaction((n=>p(this,void 0,void 0,(function*(){const e={migration:new f(n)};return t(e)}))))}))}getMigrationRepository(){return new f(this.dataSource.manager)}}const v=require("path");var g=o.n(v);const m=require("fs");var b=o.n(m);class E{static import(...t){return n=this,e=void 0,o=function*(){const[n,e]=t,i=null!=e?n:null,o=null!=e?e:n;console.log(`Importing ${i} from ${o}`);const s=yield import(`${o}`);return i?s[i]:s},new((i=void 0)||(i=Promise))((function(t,s){function a(t){try{c(o.next(t))}catch(t){s(t)}}function r(t){try{c(o.throw(t))}catch(t){s(t)}}function c(n){var e;n.done?t(n.value):(e=n.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}c((o=o.apply(n,e||[])).next())}));var n,e,i,o}}var T,w=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class x{static ensureMigrationDbExists(){return w(this,void 0,void 0,(function*(){const t=this.getMigrationDbConnectionOptions(),e=new n.DataSource({type:"mysql",host:t.host,port:t.port,username:t.username,password:t.password});yield e.initialize();const i=e.createQueryRunner();yield i.connect(),yield i.query(`CREATE DATABASE IF NOT EXISTS ${t.database};`),yield i.query(`USE ${t.database}`),yield i.query("\n      CREATE TABLE IF NOT EXISTS migration (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        `group` VARCHAR(255) NOT NULL,\n        name VARCHAR(255) NOT NULL,\n        executed DATETIME NOT NULL,\n        batch INT NOT NULL,\n        created DATETIME NOT NULL,\n        updated DATETIME NOT NULL\n      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n      "),yield i.release(),yield e.destroy()}))}static getMigrationDb(){return this.migrationDb||(this.migrationDb=new y(this.getMigrationDbConnectionOptions())),this.migrationDb}static loadConfig(){return w(this,void 0,void 0,(function*(){try{this.config=yield E.import("default",g().join(process.cwd(),"migrate.config.js"))}catch(t){throw new Error(`Failed to read migrate.config.js file: ${t.message}`)}const{valid:n,message:e}=t.Validators.schema({migrationDatabase:t.Validators.string(),connections:t.Validators.object(t.Validators.schema({host:t.Validators.string(),port:t.Validators.integer(),username:t.Validators.string(),password:t.Validators.string(),databases:t.Validators.array(t.Validators.string())})),migrationDirs:t.Validators.object(t.Validators.schema({name:t.Validators.string(),path:t.Validators.string()}))}).validate(this.config);if(!n)throw new Error(`Invalid migrate.config.js file: ${e}`);return this.config}))}static getConfig(){if(!this.config)throw new Error("Config not loaded");return this.config}static getProjectMigrations(t){return w(this,void 0,void 0,(function*(){const n={},e=this.getConfig().migrationDirs,i=yield this.getMigrationDb().getMigrationRepository().getAll();for(const o in e){n[o]=[];const{name:s,path:a}=e[o];let r;const c=g().join(process.cwd(),a);try{r=yield b().promises.readdir(c)}catch(t){throw new Error(`Failed to read migration directory ${a}: ${t.message}`)}for(const e of r){const[a]=e.split("."),r=Object.values(i).find((t=>t.name===a));if(!1===(null==t?void 0:t.includeExecuted)&&(null==r?void 0:r.executed))continue;const l={filepath:`${c}/${e}`,group:o,groupDisplayName:s,name:a,executed:(null==r?void 0:r.executed)||null,batch:(null==r?void 0:r.batch)||null};n[o].push(l)}}return n}))}static getMigrationDbConnectionOptions(){const t=this.getConfig(),{migrationDatabase:n}=t;let e;for(const i in t.connections)if(t.connections[i].databases.includes(n)){if(e)throw new Error(`Multiple connections found for migration database "${n}"`);e=t.connections[i]}if(!e)throw new Error(`Cannot connect to migration database - no connection found for database "${n}"`);return{database:n,host:e.host,port:e.port,username:e.username,password:e.password}}}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(T||(T={}));class L{validateName(n){const{valid:e,message:i}=t.Validators.string().validate(n);if(!e)throw new TypeError(`Invalid ${this.constructor.name} name: ${i}`);return!0}validateOptions(n,e){const{valid:i,message:o}=t.Validators.schema(e).validate(n);if(!i)throw new TypeError(`Invalid ${this.constructor.name} options. ${o}`);return!0}}class N extends L{constructor(n,e){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({type:T.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1},e),this.validateOptions(this.options,{type:t.Validators.enumValue(T),nullable:t.Validators.boolean(),default:t.Validators.integer({optional:!0}),unsigned:t.Validators.boolean(),autoIncrement:t.Validators.boolean(),zeroFill:t.Validators.boolean(),primaryKey:t.Validators.boolean(),index:t.Validators.boolean()})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} ${this.options.type}`;this.options.nullable?i+=" NULL":i+=" NOT NULL",void 0!==this.options.default&&(i+=` DEFAULT ${this.options.default}`),this.options.unsigned&&(i+=" UNSIGNED"),this.options.autoIncrement&&(i+=" AUTO_INCREMENT"),this.options.zeroFill&&(i+=" ZEROFILL"),this.options.primaryKey&&(i+=" PRIMARY KEY"),this.options.index&&(i+=" INDEX"),e?yield t.query(`CREATE TABLE IF NOT EXISTS ${n} (${i});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i};`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class A extends N{constructor(t){super(t,{type:T.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}var O;class M extends L{constructor(n,e){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),unsigned:t.Validators.boolean(),zeroFill:t.Validators.boolean(),precision:t.Validators.integer(),scale:t.Validators.integer(),index:t.Validators.boolean()})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} DECIMAL(${this.options.precision}, ${this.options.scale})`;this.options.nullable?i+=" NULL":i+=" NOT NULL",void 0!==this.options.default&&(i+=` DEFAULT ${this.options.default}`),this.options.unsigned&&(i+=" UNSIGNED"),this.options.zeroFill&&(i+=" ZEROFILL"),this.options.index&&(i+=" INDEX"),e?yield t.query(`CREATE TABLE IF NOT EXISTS ${n} (${i});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i};`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(O||(O={}));class $ extends L{constructor(n,e){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({type:O.VARCHAR,nullable:!1,primaryKey:!1,default:void 0,length:(null==e?void 0:e.type)&&(null==e?void 0:e.type)!==O.VARCHAR?void 0:255,index:!1},e),this.validateOptions(this.options,{type:t.Validators.enumValue(O),nullable:t.Validators.boolean(),primaryKey:t.Validators.boolean(),default:t.Validators.string({optional:!0}),length:t.Validators.integer({optional:!0}),index:t.Validators.boolean()})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} ${this.options.type}`;this.options.type!==O.CHAR&&this.options.type!==O.VARCHAR||void 0!==this.options.length&&(i+=`(${this.options.length})`),this.options.nullable?i+=" NULL":i+=" NOT NULL",this.options.primaryKey&&(i+=" PRIMARY KEY"),void 0!==this.options.default&&(i+=` DEFAULT ${this.options.default}`),this.options.index&&(i+=" INDEX"),e?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${i});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i};`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class I extends L{constructor(n,e){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:t.Validators.boolean()})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} DATE`;this.options.nullable?i+=" NULL":i+=" NOT NULL",void 0!==this.options.default&&(i+=` DEFAULT ${this.options.default}`),this.options.index&&(i+=" INDEX"),e?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${i});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i};`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class D extends L{constructor(n,e){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0})})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} TIME`;this.options.nullable?i+=" NULL":i+=" NOT NULL",void 0!==this.options.default&&(i+=` DEFAULT ${this.options.default}`),e?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${i});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i};`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}var R;class B extends L{constructor(n,e){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({nullable:!1,default:void 0,index:!1},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:t.Validators.boolean()})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} DATETIME`;this.options.nullable?i+=" NULL":i+=" NOT NULL",void 0!==this.options.default&&(i+=` DEFAULT ${this.options.default}`),this.options.index&&(i+=" INDEX"),e?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${i});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i};`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(R||(R={}));class C extends L{constructor(n,e){super(),this.name=n,this.validateName(this.name),this.options=Object.assign({type:R.BLOB,nullable:!1},e),this.validateOptions(this.options,{type:t.Validators.enumValue(R),nullable:t.Validators.boolean()})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} ${this.options.type}`;this.options.nullable?i+=" NULL":i+=" NOT NULL",e?yield t.query(`CREATE TABLE IF NOT EXISTS ${n}(${i});`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i};`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}class V extends L{constructor(n,e,i){super(),this.name=n,this.validateName(this.name),this.values=e;const{valid:o,message:s}=t.Validators.all([t.Validators.array(t.Validators.string()),t.Validators.minLength(1)]).validate(this.values);if(!o)throw new TypeError(`Invalid ${this.constructor.name} values. ${s}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1},i);const a={};for(const t of this.values)a[t]=t;this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.enumValue(a,{optional:!0}),index:t.Validators.boolean()})}create(t,n,e){return i=this,o=void 0,a=function*(){let i=`${this.name} ENUM('${this.values.join("', '")}')`;this.options.nullable?i+=" NULL":i+=" NOT NULL",void 0!==this.options.default&&(i+=` DEFAULT '${this.options.default}'`),this.options.index&&(i+=" INDEX"),e?yield t.query(`CREATE TABLE ${n} (${i})`):yield t.query(`ALTER TABLE ${n} ADD COLUMN ${i}`)},new((s=void 0)||(s=Promise))((function(t,n){function e(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(n){var i;n.done?t(n.value):(i=n.value,i instanceof s?i:new s((function(t){t(i)}))).then(e,r)}c((a=a.apply(i,o||[])).next())}));var i,o,s,a}}var S=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class U{constructor(t,n,e,i){this.operations=[],this.name=t,console.log("Table constructor",t,i),this.connection=n,this.operations=e,this.tableExists=i}id(t="id"){return this.operations.push((()=>S(this,void 0,void 0,(function*(){console.log("create id column operation",this.name,this.tableExists);const n=new A(t);yield n.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}int(t,n){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const e=new N(t,n);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}decimal(t,n){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const e=new M(t,n);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}string(t,n){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const e=new $(t,n);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}enum(t,n,e){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const i=new V(t,n,e);yield i.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}date(t,n){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const e=new I(t,n);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}time(t,n){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const e=new D(t,n);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}datetime(t,n){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const e=new B(t,n);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}blob(t,n){return this.operations.push((()=>S(this,void 0,void 0,(function*(){const e=new C(t,n);yield e.create(this.connection,this.name,!this.tableExists),this.tableExists=!0})))),this}execute(){return S(this,void 0,void 0,(function*(){for(const t of this.operations)yield t()}))}}var j=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class q{constructor(t,n){this.connection=t,this.operations=n}create(t){return console.log("create",t),new U(t,this.connection,this.operations,!1)}table(t){return console.log("table",t),new U(t,this.connection,this.operations,!0)}drop(t){return this.operations.push((()=>j(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${t};`)})))),this}execute(){return j(this,void 0,void 0,(function*(){for(const t of this.operations)yield t()}))}}var P=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class F{constructor(t){this.operations=[],this.connections=t}database(t,n){let e;if(n)e=this.connections.get(n);else{const n=this.connections.getAllByDatabaseName(t);if(0===n.length)throw new Error(`No connections found for database "${t}"`);if(n.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);e=n[0]}return this.operations.push((()=>P(this,void 0,void 0,(function*(){yield e.query(`CREATE DATABASE IF NOT EXISTS ${t};`)})))),this.operations.push((()=>P(this,void 0,void 0,(function*(){yield e.query(`USE ${t};`)})))),new q(e,this.operations)}}var X=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class Y{constructor(t){this.connectionConfig=t}query(t,n=[]){return X(this,void 0,void 0,(function*(){const e=yield this.get();return console.log("query",t,n),e.query(t,n)}))}destroy(){return X(this,void 0,void 0,(function*(){this.queryRunner&&(yield this.queryRunner.release(),this.queryRunner=void 0),this.connection&&(yield this.connection.destroy(),this.connection=void 0)}))}isInitialised(){return!!this.connection}get(){return X(this,void 0,void 0,(function*(){return this.connection||(this.connection=new n.DataSource({type:"mysql",host:this.connectionConfig.host,port:this.connectionConfig.port,username:this.connectionConfig.username,password:this.connectionConfig.password}),yield this.connection.initialize()),this.connection}))}}class k{constructor(t){this.config={},this.connections={},this.config=t}get(t){if(this.connections[t])return this.connections[t];if(!this.config[t])throw new Error(`Config for connection "${t}" not found`);const{host:n,port:e,username:i,password:o}=this.config[t];return this.connections[t]=new Y({host:n,port:e,username:i,password:o}),this.connections[t]}getAllByDatabaseName(t){const n=[];for(const e in this.config)this.config[e].databases.includes(t)&&n.push(this.get(e));return n}destroyAllInitialised(){return t=this,n=void 0,i=function*(){const t=this.getAllInitialised();for(const n of t)yield n.destroy()},new((e=void 0)||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}));var t,n,e,i}getAllInitialised(){return Object.values(this.connections).filter((t=>t.isInitialised()))}}const H=require("chalk");var _=o.n(H),z=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};class K{static status(){return z(this,void 0,void 0,(function*(){const t=x.getConfig().migrationDirs,n=yield x.getProjectMigrations();for(const e in n){const i=n[e],{name:o}=t[e];if(console.log(_().yellowBright(o)),0!==i.length)for(const t of i)console.log(`  ${t.executed?_().greenBright(t.name):_().redBright(t.name)}`);else console.log(_().redBright("  * No migrations found *"))}}))}static run(){return z(this,void 0,void 0,(function*(){const t=yield x.getProjectMigrations({includeExecuted:!1});if(0===Object.keys(t).length)return void console.log(_().blueBright("No migrations to run"));const n=x.getConfig(),e=new k(n.connections),i=yield x.getMigrationDb().getMigrationRepository().getLatestBatch(),o=i?i+1:1,s=new F(e);let a=0;try{const n=[];for(const e in t)n.push(...t[e]);n.sort(((t,n)=>t.name<n.name?-1:t.name>n.name?1:0)),console.log("migrationFilesToRun",n);for(const t of n){const n=yield this.getMigrationClassInstance(t);yield n.up(s);const e=new u;e.name=t.name,e.group=t.group,e.executed=d.DateTime.now().toSQL({includeOffset:!1}),e.batch=o,yield x.getMigrationDb().getMigrationRepository().save(e),a++}console.log(_().green(`Successfully ran ${a} migration${1!==a?"s":""}`))}catch(t){console.log(_().redBright(`Failed to run migrations: ${t.message}`)),console.log(_().redBright(t.stack))}yield e.destroyAllInitialised()}))}static rollback(){return z(this,void 0,void 0,(function*(){const t=yield x.getMigrationDb().getMigrationRepository().getLatestBatch();if(!t)return void console.log(_().blueBright("No migrations to rollback"));const n=x.getConfig(),e=new k(n.connections),i=new F(e),o=yield x.getProjectMigrations();let s=0;const a=yield x.getMigrationDb().getMigrationRepository().getAllByBatch(t);if(0!==Object.keys(a).length){try{const t=Object.values(a).sort(((t,n)=>t.name<n.name?1:t.name>n.name?-1:0)).map((t=>{const n=o[t.group].find((n=>n.name===t.name));if(!n)throw new Error(`Could not find migration file for ${t.name} in group ${t.group}`);return{migrationRow:t,migrationFile:n}}));console.log("migrationsToRollBack",t);for(const{migrationRow:n,migrationFile:e}of t){const t=yield this.getMigrationClassInstance(e);yield t.down(i),yield x.getMigrationDb().getMigrationRepository().remove(n),s++}console.log(_().green(`Successfully rolled back ${s} migration${1!==s?"s":""}`))}catch(t){console.log(_().redBright(`Failed to roll back migrations: ${t.message}`)),console.log(_().redBright(t.stack))}yield e.destroyAllInitialised()}else console.log(_().blueBright("No migrations to roll back"))}))}static getMigrationClassInstance(t){return z(this,void 0,void 0,(function*(){const n=yield E.import(t.filepath);let e;const i=t.name.split("_").pop();if(n[i])e=n[i];else{if(!n.default)throw new Error(`Could not find migration class in ${t.filepath}`);e=n.default}return new e}))}}require("reflect-metadata");var G=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}c((i=i.apply(t,n||[])).next())}))};function Q(t){return(n,e,i)=>G(this,void 0,void 0,(function*(){yield x.ensureMigrationDbExists(),yield x.getMigrationDb().initialize(),yield t(n,e,i),yield x.getMigrationDb().destroy()}))}G(void 0,void 0,void 0,(function*(){yield x.loadConfig();const{default:t}=yield Promise.resolve().then(o.t.bind(o,562,23));try{t.name("Electra Migrate").description("MySQL Migrations for Node.js Applications").version(o(147).i8),t.command("status","Show the status of all migrations").action(Q((()=>G(void 0,void 0,void 0,(function*(){yield K.status()}))))),t.command("run","Run all migrations").action(Q((()=>G(void 0,void 0,void 0,(function*(){yield K.run()}))))),t.command("rollback","Rollback the last batch of migrations").action(Q((()=>G(void 0,void 0,void 0,(function*(){yield K.rollback()}))))),t.parse(process.argv)}catch(t){console.log(_().red(t.stack))}}))})(),module.exports=s})();