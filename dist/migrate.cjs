(()=>{"use strict";var t,e,n={562:t=>{t.exports=require("caporal")},147:t=>{t.exports={i8:"1.0.0"}}},i={};function o(t){var e=i[t];if(void 0!==e)return e.exports;var s=i[t]={exports:{}};return n[t](s,s.exports,o),s.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},e=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,o.t=function(n,i){if(1&i&&(n=this(n)),8&i)return n;if("object"==typeof n&&n){if(4&i&&n.__esModule)return n;if(16&i&&"function"==typeof n.then)return n}var s=Object.create(null);o.r(s);var r={};t=t||[null,e({}),e([]),e(e)];for(var a=2&i&&n;"object"==typeof a&&!~t.indexOf(a);a=e(a))Object.getOwnPropertyNames(a).forEach((t=>r[t]=()=>n[t]));return r.default=()=>n,o.d(s,r),s},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};(()=>{o.r(s);const t=require("@electra/utility"),e=require("typeorm");var n=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class i{constructor(t){this.dataSource=new e.DataSource(t)}initialize(){return n(this,void 0,void 0,(function*(){yield this.dataSource.initialize()}))}destroy(){return n(this,void 0,void 0,(function*(){yield this.dataSource.destroy()}))}}class r{constructor(t){this.entityManager=t}}var a=function(t,e,n,i){var o,s=arguments.length,r=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,n,r):o(e,n))||r);return s>3&&r&&Object.defineProperty(e,n,r),r},l=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let c=class{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}};a([(0,e.PrimaryGeneratedColumn)(),l("design:type",Number)],c.prototype,"id",void 0),a([(0,e.Column)(),l("design:type",String)],c.prototype,"group",void 0),a([(0,e.Column)(),l("design:type",String)],c.prototype,"name",void 0),a([(0,e.Column)(),l("design:type",String)],c.prototype,"executed",void 0),a([(0,e.Column)(),l("design:type",Number)],c.prototype,"batch",void 0),a([(0,e.Column)(),l("design:type",String)],c.prototype,"created",void 0),a([(0,e.Column)(),l("design:type",String)],c.prototype,"updated",void 0),c=a([(0,e.Entity)("migration")],c);class d{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}}const u=require("luxon");var h=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class p extends r{getAll(){return h(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.find(c))}))}getById(t){return h(this,void 0,void 0,(function*(){return this.toEntity(yield this.entityManager.findOneBy(c,{id:t}))}))}getLatestBatch(){return h(this,void 0,void 0,(function*(){const t=yield this.entityManager.createQueryBuilder(c,"migration").select("MAX(migration.batch)","maxBatch").getRawOne();return t&&t.maxBatch?parseInt(t.maxBatch):null}))}getAllByBatch(t){return h(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.createQueryBuilder(c,"m").where("m.batch = :batch",{batch:t}).orderBy("executed","DESC").getMany())}))}remove(...t){return h(this,void 0,void 0,(function*(){yield this.entityManager.remove(t.map((t=>this.toModel(t))))}))}save(...t){return h(this,void 0,void 0,(function*(){yield this.entityManager.save(t.map((t=>{const e=u.DateTime.now().toSQL({includeOffset:!1});return t.id||(t.created=e),t.updated=e,this.toModel(t)})))}))}toEntityMap(t){const e={};return t.forEach((t=>{e[t.id]=this.toEntity(t)})),e}toEntity(e){return t.Objects.hydrate(new d,e)}toModel(e){return t.Objects.hydrate(new c,e)}getModel(){return c}}var f=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class g extends i{constructor(t){super({type:"mysql",database:t.database,host:t.host,port:t.port,username:t.username,password:t.password,entities:[c]})}transaction(t){return f(this,void 0,void 0,(function*(){yield this.dataSource.transaction((e=>f(this,void 0,void 0,(function*(){const n={migration:new p(e)};return t(n)}))))}))}getMigrationRepository(){return new p(this.dataSource.manager)}}const m=require("path");var y=o.n(m);const v=require("fs");var b=o.n(v),w=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class x{static import(...t){return w(this,void 0,void 0,(function*(){const[e,n]=t,i=null!=n?e:null,o=null!=n?n:e,s=yield import(`${o}`);return i?s[i]:s}))}static require(...t){const[e,n]=t,i=null!=n?e:null,o=require(`${null!=n?n:e}`);return i?o[i]:o}static isCommonJS(){return w(this,void 0,void 0,(function*(){const t=`${process.cwd()}/package.json`;let e;try{e=JSON.parse(yield b().promises.readFile(t,{encoding:"utf-8"}))}catch(t){throw new Error("Command must be run from the root of your project containing a valid package.json file.")}return"module"!==e.type}))}}var A=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class E{static ensureMigrationDbExists(){return A(this,void 0,void 0,(function*(){const t=this.getMigrationDbConnectionOptions(),n=new e.DataSource({type:"mysql",host:t.host,port:t.port,username:t.username,password:t.password});yield n.initialize();const i=n.createQueryRunner();yield i.connect(),yield i.query(`CREATE DATABASE IF NOT EXISTS ${t.database};`),yield i.query(`USE ${t.database}`),yield i.query("\n      CREATE TABLE IF NOT EXISTS migration (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        `group` VARCHAR(255) NOT NULL,\n        name VARCHAR(255) NOT NULL,\n        executed DATETIME NOT NULL,\n        batch INT NOT NULL,\n        created DATETIME NOT NULL,\n        updated DATETIME NOT NULL\n      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n      "),yield i.release(),yield n.destroy()}))}static getMigrationDb(){return this.migrationDb||(this.migrationDb=new g(this.getMigrationDbConnectionOptions())),this.migrationDb}static loadConfig(){return A(this,void 0,void 0,(function*(){let e;const n=global.process.env.NODE_ENV;if(n)try{e=yield x.import("default",y().join(process.cwd(),`migrate.config.${n}.js`))}catch(t){throw new Error(`Failed to read migrate.config.${n}.js file: ${t.message}`)}try{this.config=t.Objects.merge(yield x.import("default",y().join(process.cwd(),"migrate.config.js")),e||{})}catch(t){throw new Error(`Failed to read migrate.config.js file: ${t.message}`)}const{valid:i,message:o}=t.Validators.schema({migrationDatabase:t.Validators.string(),connections:t.Validators.object(t.Validators.schema({host:t.Validators.string(),port:t.Validators.integer(),username:t.Validators.string(),password:t.Validators.string(),databases:t.Validators.array(t.Validators.string())})),migrationDirs:t.Validators.object(t.Validators.schema({name:t.Validators.string(),path:t.Validators.string()}))}).validate(this.config);if(!i)throw new Error(`Invalid migrate.config.js file: ${o}`);return this.config}))}static getConfig(){if(!this.config)throw new Error("Config not loaded");return this.config}static getProjectMigrations(e){return A(this,void 0,void 0,(function*(){const n={},i=this.getConfig().migrationDirs,o=yield this.getMigrationDb().getMigrationRepository().getAll(),s={};for(const r in i){n[r]=[];const{name:a,path:l}=i[r];let c;const d=y().join(process.cwd(),l);try{c=yield b().promises.readdir(d)}catch(t){throw new Error(`Failed to read migration directory ${l}: ${t.message}`)}for(const i of c){const[l]=i.split("."),{valid:c,message:u}=t.Validators.regex(/^(19|20)\d{2}_(0[1-9]|1[0-2])_(0[1-9]|[12][0-9]|3[01])_([0-1][0-9]|2[0-3])([0-5][0-9]){2}_[A-Za-z][A-Za-z0-9_]*$/,"YYYY_MM_DD_HHMMSS_MigrationName").validate(l);if(!c)throw new Error(`Invalid migration file name: ${u}`);const[h,p,f,g]=l.split("_"),m=`${h}_${p}_${f}_${g}`;if(s[m])throw new Error(`Duplicate migration timestamp "${m}" found in ${s[m]} and ${i}`);s[m]=i;const y=Object.values(o).find((t=>t.name===l));if(!1===(null==e?void 0:e.includeExecuted)&&(null==y?void 0:y.executed))continue;const v={filepath:`${d}/${i}`,group:r,groupDisplayName:a,name:l,executed:(null==y?void 0:y.executed)||null,batch:(null==y?void 0:y.batch)||null};n[r].push(v)}}return n}))}static getMigrationDbConnectionOptions(){const t=this.getConfig(),{migrationDatabase:e}=t;let n;for(const i in t.connections)if(t.connections[i].databases.includes(e)){if(n)throw new Error(`Multiple connections found for migration database "${e}"`);n=t.connections[i]}if(!n)throw new Error(`Cannot connect to migration database - no connection found for database "${e}"`);return{database:e,host:n.host,port:n.port,username:n.username,password:n.password}}}const T=require("chalk");var $=o.n(T);require("reflect-metadata");class N{getMigrationClassInstance(t){return e=this,n=void 0,o=function*(){const e=(yield x.isCommonJS())?x.require(t.filepath):yield x.import(t.filepath);let n;const i=t.name.split("_").pop();if(e[i])n=e[i];else{if(!e.default)throw new Error(`Could not find migration class in ${t.filepath}`);n=e.default}return new n},new((i=void 0)||(i=Promise))((function(t,s){function r(t){try{l(o.next(t))}catch(t){s(t)}}function a(t){try{l(o.throw(t))}catch(t){s(t)}}function l(e){var n;e.done?t(e.value):(n=e.value,n instanceof i?n:new i((function(t){t(n)}))).then(r,a)}l((o=o.apply(e,n||[])).next())}));var e,n,i,o}}class I{static red(t){console.log($().redBright(t))}static blue(t){console.log($().blueBright(t))}static green(t){console.log($().greenBright(t))}static yellow(t){console.log($().yellowBright(t))}}class D extends N{execute(){return t=this,e=void 0,i=function*(){const t=E.getConfig().migrationDirs,e=yield E.getProjectMigrations();for(const n in e){const i=e[n],{name:o}=t[n];if(I.yellow(o),0!==i.length)for(const t of i)t.executed?I.green(`  ${t.name}`):I.red(`  ${t.name}`);else I.red("  * No migrations found *")}},new((n=void 0)||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}));var t,e,n,i}}var M=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class O{constructor(t){this.connectionConfig=t}query(t,e=[]){return M(this,void 0,void 0,(function*(){return console.log("connection.query",t,e),(yield this.get()).query(t,e)}))}destroy(){return M(this,void 0,void 0,(function*(){this.connection&&(yield this.connection.destroy(),this.connection=void 0)}))}isInitialised(){return!!this.connection}escape(t){return M(this,void 0,void 0,(function*(){return(yield this.get()).driver.escape(t)}))}get(){return M(this,void 0,void 0,(function*(){return this.connection||(this.connection=new e.DataSource({type:"mysql",host:this.connectionConfig.host,port:this.connectionConfig.port,username:this.connectionConfig.username,password:this.connectionConfig.password}),yield this.connection.initialize()),this.connection}))}}var L,C,V,R;class S{constructor(t){this.config={},this.connections={},this.config=t}get(t){if(this.connections[t])return this.connections[t];if(!this.config[t])throw new Error(`Config for connection "${t}" not found`);const{host:e,port:n,username:i,password:o}=this.config[t];return this.connections[t]=new O({host:e,port:n,username:i,password:o}),this.connections[t]}getAllByDatabaseName(t){const e=[];for(const n in this.config)this.config[n].databases.includes(t)&&e.push(this.get(n));return e}destroyAllInitialised(){return t=this,e=void 0,i=function*(){const t=this.getAllInitialised();for(const e of t)yield e.destroy()},new((n=void 0)||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}));var t,e,n,i}getAllInitialised(){return Object.values(this.connections).filter((t=>t.isInitialised()))}}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(L||(L={}));class B{constructor(t){this.name=t,this.validateName(this.name)}getIndexDefinition(){return null}getName(){return this.name}validateName(e){const{valid:n,message:i}=t.Validators.all([t.Validators.string(),t.Validators.minLength(1),t.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(e);if(!n)throw new TypeError(`Invalid ${this.constructor.name} name: ${i}`);return!0}validateOptions(e,n){const{valid:i,message:o}=t.Validators.schema(n).validate(e);if(!i)throw new TypeError(`Invalid ${this.constructor.name} options. ${o}`);return!0}addNullableStatement(t,e){return e?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,e){return void 0!==e?`${t} DEFAULT ${e}`:t}addIndexStatement(t,e,n){return e?`${t}, ADD INDEX (${n})`:t}addUnsignedStatement(t,e){return e?`${t} UNSIGNED`:t}addZeroFillStatement(t,e){return e?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,e){return e?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,e){return e?`${t} PRIMARY KEY`:t}addAfterStatement(t,e,n){return!n&&e&&I.yellow("WARNING: addAfter option is ignored when creating a new table."),n?(e&&(t+=` AFTER ${e}`),t):t}}class j{constructor(t,e){this.options={nullable:void 0,default:void 0,unsigned:void 0,autoIncrement:void 0,zeroFill:void 0,primaryKey:void 0,after:void 0},this.name=t,this.type=e}static create(t,e){return new j(t,e)}nullable(t){return this.options.nullable=t,this}default(t){return this.options.default=t,this}unsigned(t){return this.options.unsigned=t,this}autoIncrement(t){return this.options.autoIncrement=t,this}zeroFill(t){return this.options.zeroFill=t,this}primaryKey(t){return this.options.primaryKey=t,this}after(t){return this.options.after=t,this}get(){let t=`\`${this.name}\` ${this.type}`;return!0===this.options.unsigned&&(t+=" UNSIGNED"),"boolean"==typeof this.options.nullable&&(t+=this.options.nullable?" NULL":" NOT NULL"),void 0!==this.options.default&&(t+=` DEFAULT ${this.options.default}`),!0===this.options.autoIncrement&&(t+=" AUTO_INCREMENT"),!0===this.options.zeroFill&&(t+=" ZEROFILL"),!0===this.options.primaryKey&&(t+=" PRIMARY KEY"),"string"==typeof this.options.after&&(t+=` AFTER \`${this.options.after}\``),t}}!function(t){t.INDEX="INDEX",t.UNIQUE="UNIQUE",t.FULLTEXT="FULLTEXT"}(C||(C={}));class U{constructor(){this.indexColumns=[],this.indexType=C.INDEX}static create(){return new U}defaultName(t){return this.defaultIndexName=t,this}name(t){return this.indexName=t,this}columns(...t){return this.indexColumns.push(...t),this}type(t){return this.indexType=t,this}get(){if(!this.indexColumns.length)throw new Error("No columns defined for index");const t=this.indexName||this.defaultIndexName;let e=t&&this.indexType===C.UNIQUE?`${this.indexType} INDEX`:this.indexType;return t&&(e+=` \`${t}\``),e+=` (${this.indexColumns.map((t=>`\`${t}\``)).join(", ")})`,e}}class F extends B{constructor(e,n){super(e),this.options=Object.assign({type:L.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(L),nullable:t.Validators.boolean(),default:t.Validators.integer({optional:!0}),unsigned:t.Validators.boolean(),autoIncrement:t.Validators.boolean(),zeroFill:t.Validators.boolean(),primaryKey:t.Validators.boolean(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return j.create(this.name,this.options.type).nullable(this.options.nullable).default(this.options.default).unsigned(this.options.unsigned).autoIncrement(this.options.autoIncrement).zeroFill(this.options.zeroFill).primaryKey(this.options.primaryKey).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?U.create().columns(this.name):null}}class P extends F{constructor(t){super(t,{type:L.INT,nullable:!1,default:void 0,unsigned:!0,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}class _ extends B{constructor(e,n){super(e),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),unsigned:t.Validators.boolean(),zeroFill:t.Validators.boolean(),precision:t.Validators.integer(),scale:t.Validators.integer(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return j.create(this.name,`DECIMAL(${this.options.precision}, ${this.options.scale})`).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0).unsigned(this.options.unsigned).zeroFill(this.options.zeroFill).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?U.create().columns(this.name):null}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(V||(V={}));class q extends B{constructor(e,n){super(e);const i=(null==n?void 0:n.type)||V.VARCHAR;this.options=Object.assign({type:i,nullable:!1,primaryKey:!1,default:void 0,length:i!==V.VARCHAR?void 0:255,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(V),nullable:t.Validators.boolean(),primaryKey:t.Validators.boolean(),default:t.Validators.string({optional:!0}),length:t.Validators.integer({optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){let t=this.options.type;return this.options.type!==V.CHAR&&this.options.type!==V.VARCHAR||void 0!==this.options.length&&(t+=`(${this.options.length})`),j.create(this.name,t).nullable(this.options.nullable).primaryKey(this.options.primaryKey).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?U.create().columns(this.name):null}}class z extends B{constructor(e,n){super(e),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return j.create(this.name,"DATE").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?U.create().columns(this.name):null}}class Y extends B{constructor(e,n){super(e),this.options=Object.assign({nullable:!1,default:void 0,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return j.create(this.name,"TIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}}class k extends B{constructor(e,n){super(e),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return j.create(this.name,"DATETIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?U.create().columns(this.name):null}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(R||(R={}));class X extends B{constructor(e,n){super(e),this.options=Object.assign({type:R.BLOB,nullable:!1,addAfter:void 0},n),this.validateOptions(this.options,{type:t.Validators.enumValue(R),nullable:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return j.create(this.name,this.options.type).nullable(this.options.nullable).after(this.options.addAfter)}}class H extends B{constructor(e,n,i){super(e),this.values=n;const{valid:o,message:s}=t.Validators.all([t.Validators.array(t.Validators.all([t.Validators.string(),t.Validators.minLength(1)])),t.Validators.minLength(1)]).validate(this.values);if(!o)throw new TypeError(`Invalid ${this.constructor.name} values. ${s}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i);const r={};for(const t of this.values)r[t]=t;this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.enumValue(r,{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return j.create(this.name,`ENUM('${this.values.join("', '")}')`).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?U.create().columns(this.name):null}}class K extends B{constructor(e,n){if(super(e),this.options=Object.assign({nullable:!1,default:void 0,zeroFill:!1,precision:void 0,scale:void 0,index:!1,addAfter:void 0},n),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),zeroFill:t.Validators.boolean(),precision:t.Validators.integer({optional:!0}),scale:t.Validators.integer({optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})}),!(null==this.options.precision&&null==this.options.scale||null!=this.options.precision&&null!=this.options.scale))throw new Error(`Precision and scale must be both defined or both undefined in column ${this.name}`)}getColumnDefinition(){const t=null!=this.options.precision&&null!=this.options.scale?`DOUBLE(${this.options.precision}, ${this.options.scale})`:"DOUBLE";return j.create(this.name,t).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0).zeroFill(this.options.zeroFill).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?U.create().columns(this.name):null}}var G=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class Q{constructor(t,e,n,i){this.operations=[],this.columnAdditions=[],this.name=t,this.connection=e,this.operations=n,this.tableExists=i,this.operations.push((()=>G(this,void 0,void 0,(function*(){if(0===this.columnAdditions.length)return;const t=yield this.connection.escape(this.name);if(!this.tableExists){const e=[...this.columnAdditions.map((t=>t.getColumnDefinition().get())),...this.columnAdditions.map((t=>{const e=t.getIndexDefinition();return e?e.defaultName(`${this.name.toLowerCase()}_${t.getName().toLowerCase()}_index`).get():null})).filter((t=>null!=t))];yield this.connection.query(`CREATE TABLE ${t} (${e.join(", ")});`),this.tableExists=!0,this.columnAdditions.splice(0,this.columnAdditions.length)}const e=[...this.columnAdditions.map((t=>`ADD COLUMN ${t.getColumnDefinition().get()}`)),...this.columnAdditions.map((t=>{const e=t.getIndexDefinition();return e?(e.defaultName(`${this.name.toLowerCase()}_${t.getName().toLowerCase()}_index`),`ADD ${e.get()}`):null})).filter((t=>null!=t))];0!==e.length&&(yield this.connection.query(`ALTER TABLE ${t} ${e.join(", ")};`))}))))}id(t="id"){return this.columnAdditions.push(new P(t)),this}int(t,e){return this.columnAdditions.push(new F(t,e)),this}decimal(t,e){return this.columnAdditions.push(new _(t,e)),this}double(t,e){return this.columnAdditions.push(new K(t,e)),this}string(t,e){return this.columnAdditions.push(new q(t,e)),this}enum(t,e,n){return this.columnAdditions.push(new H(t,e,n)),this}date(t,e){return this.columnAdditions.push(new z(t,e)),this}time(t,e){return this.columnAdditions.push(new Y(t,e)),this}datetime(t,e){return this.columnAdditions.push(new k(t,e)),this}blob(t,e){return this.columnAdditions.push(new X(t,e)),this}renameColumn(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} RENAME COLUMN ${yield this.connection.escape(t)} TO ${yield this.connection.escape(e)};`)})))),this}dropColumn(t){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP COLUMN ${yield this.connection.escape(t)};`)})))),this}addColumnIndex(t){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} ADD INDEX ${yield this.connection.escape(t)};`)})))),this}dropColumnIndex(t){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP INDEX ${yield this.connection.escape(t)};`)})))),this}setColumnNullable(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} ${e?"NULL":"NOT NULL"};`)})))),this}setColumnDefault(t,e){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} DEFAULT ${"string"==typeof e?`'${e}'`:e};`)})))),this}drop(){return this.operations.push((()=>G(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${yield this.connection.escape(this.name)};`)})))),this}}class Z{constructor(t,e){this.connection=t,this.operations=e}create(t){return new Q(t,this.connection,this.operations,!1)}table(t){return new Q(t,this.connection,this.operations,!0)}}var J=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class W{constructor(t){this.operations=[],this.connections=t}database(t,e){let n;if(e)n=this.connections.get(e);else{const e=this.connections.getAllByDatabaseName(t);if(0===e.length)throw new Error(`No connections found for database "${t}"`);if(e.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);n=e[0]}return this.operations.push((()=>J(this,void 0,void 0,(function*(){yield n.query(`CREATE DATABASE IF NOT EXISTS ${yield n.escape(t)};`)})))),this.operations.push((()=>J(this,void 0,void 0,(function*(){yield n.query(`USE ${yield n.escape(t)};`)})))),new Z(n,this.operations)}executePendingOperations(){return J(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}var tt=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class et extends N{execute(){return tt(this,void 0,void 0,(function*(){const t=E.getConfig(),e=new S(t.connections),n=new W(e);let i=0;const o=yield this.getMigrationsToRollBack();if(o.length){try{for(const{migrationRow:t,migrationFile:e}of o){I.yellow(`Rolling back: ${e.name}`);const o=yield this.getMigrationClassInstance(e);yield o.down(n),yield n.executePendingOperations(),yield E.getMigrationDb().getMigrationRepository().remove(t),i++,I.green(`Success: ${e.name}`),console.log("")}I.green(`Successfully rolled back ${i} migration${1!==i?"s":""}`)}catch(t){I.red(`Failed to roll back migrations: ${t.message}`),I.red(t.stack)}yield e.destroyAllInitialised()}else I.blue("No migrations to rollback")}))}getMigrationsToRollBack(){return tt(this,void 0,void 0,(function*(){const t=yield E.getMigrationDb().getMigrationRepository().getLatestBatch();if(!t)return[];const e=yield E.getMigrationDb().getMigrationRepository().getAllByBatch(t),n=yield E.getProjectMigrations();return Object.values(e).sort(((t,e)=>t.name<e.name?1:-1)).map((t=>{const e=n[t.group].find((e=>e.name===t.name));if(!e)throw new Error(`Could not find migration file for ${t.name} in group ${t.group}`);return{migrationRow:t,migrationFile:e}}))}))}}var nt=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};class it extends N{constructor(t){super(),this.options=t}execute(){var t;return nt(this,void 0,void 0,(function*(){let e=0;const n=E.getConfig(),i=new S(n.connections),o=new W(i),s=yield this.getMigrationFilesToRun(),r=E.getMigrationDb().getMigrationRepository(),a=yield r.getLatestBatch(),l=a?a+1:1;try{for(const t of s){I.yellow(`Running: ${t.name}`);const n=yield this.getMigrationClassInstance(t);yield n.up(o),yield o.executePendingOperations();const i=new d;i.name=t.name,i.group=t.group,i.executed=u.DateTime.now().toSQL({includeOffset:!1}),i.batch=l,yield r.save(i),e++,I.green(`Success: ${t.name}`),console.log("")}I.green(`Successfully ran ${e} migration${1!==e?"s":""}`)}catch(n){I.red(`Failed to run migrations: ${n.message}`),I.red(n.stack),!0===(null===(t=this.options)||void 0===t?void 0:t.rollbackOnError)&&(e>0?(console.log(""),I.yellow("Attempting to roll back migrations..."),yield(new et).execute()):(console.log(""),I.yellow("Nothing to roll back - 0 migrations finished successfully.")))}yield i.destroyAllInitialised()}))}getMigrationFilesToRun(){return nt(this,void 0,void 0,(function*(){const t=yield E.getProjectMigrations({includeExecuted:!1}),e=[];for(const n in t)e.push(...t[n]);return e.sort(((t,e)=>t.name<e.name?-1:1)),e}))}}var ot=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))};function st(t){return(e,n,i)=>ot(this,void 0,void 0,(function*(){yield E.ensureMigrationDbExists(),yield E.getMigrationDb().initialize(),yield t(e,n,i),yield E.getMigrationDb().destroy()}))}ot(void 0,void 0,void 0,(function*(){try{yield E.loadConfig();const{default:t}=yield Promise.resolve().then(o.t.bind(o,562,23));t.name("Electra Migrate").description("MySQL Migrations for Node.js Applications").version(o(147).i8),t.command("status","Show the status of all migrations").action(st((()=>ot(void 0,void 0,void 0,(function*(){yield(new D).execute()}))))),t.command("run","Run all migrations").option("--rollback-on-error","Automatically rollback migrations if an error occurs").action(st(((t,e)=>ot(void 0,void 0,void 0,(function*(){const t=new it({rollbackOnError:e.rollbackOnError||!1});yield t.execute()}))))),t.command("rollback","Rollback the last batch of migrations").action(st((()=>ot(void 0,void 0,void 0,(function*(){yield(new et).execute()}))))),t.parse(process.argv)}catch(t){console.log($().redBright(t.stack))}}))})(),module.exports=s})();
//# sourceMappingURL=migrate.cjs.map