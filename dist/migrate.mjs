import*as t from"caporal";import*as n from"@electra/utility";import*as e from"typeorm";import*as i from"luxon";import{createRequire as o}from"module";import*as s from"chalk";import*as a from"reflect-metadata";var r={704:n=>{n.exports=t},147:t=>{t.exports={i8:"1.0.0"}}},l={};function c(t){var n=l[t];if(void 0!==n)return n.exports;var e=l[t]={exports:{}};return r[t](e,e.exports,c),e.exports}c.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return c.d(n,{a:n}),n},c.d=(t,n)=>{for(var e in n)c.o(n,e)&&!c.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},c.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),(()=>{const t=(a={Objects:()=>n.Objects,Validators:()=>n.Validators},r={},c.d(r,a),r);var a,r;const l=(t=>{var n={};return c.d(n,t),n})({Column:()=>e.Column,DataSource:()=>e.DataSource,Entity:()=>e.Entity,PrimaryGeneratedColumn:()=>e.PrimaryGeneratedColumn});var d=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class u{constructor(t){this.dataSource=new l.DataSource(t)}initialize(){return d(this,void 0,void 0,(function*(){yield this.dataSource.initialize()}))}destroy(){return d(this,void 0,void 0,(function*(){yield this.dataSource.destroy()}))}}class h{constructor(t){this.entityManager=t}}var p=function(t,n,e,i){var o,s=arguments.length,a=s<3?n:null===i?i=Object.getOwnPropertyDescriptor(n,e):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,n,e,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(n,e,a):o(n,e))||a);return s>3&&a&&Object.defineProperty(n,e,a),a},f=function(t,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)};let m=class{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}};p([(0,l.PrimaryGeneratedColumn)(),f("design:type",Number)],m.prototype,"id",void 0),p([(0,l.Column)(),f("design:type",String)],m.prototype,"group",void 0),p([(0,l.Column)(),f("design:type",String)],m.prototype,"name",void 0),p([(0,l.Column)(),f("design:type",String)],m.prototype,"executed",void 0),p([(0,l.Column)(),f("design:type",Number)],m.prototype,"batch",void 0),p([(0,l.Column)(),f("design:type",String)],m.prototype,"created",void 0),p([(0,l.Column)(),f("design:type",String)],m.prototype,"updated",void 0),m=p([(0,l.Entity)("migration")],m);class g{constructor(){this.id=null,this.group=null,this.name=null,this.executed=null,this.batch=null,this.created=null,this.updated=null}}const y=(t=>{var n={};return c.d(n,t),n})({DateTime:()=>i.DateTime});var v=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class b extends h{getAll(){return v(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.find(m))}))}getById(t){return v(this,void 0,void 0,(function*(){return this.toEntity(yield this.entityManager.findOneBy(m,{id:t}))}))}getLatestBatch(){return v(this,void 0,void 0,(function*(){const t=yield this.entityManager.createQueryBuilder(m,"migration").select("MAX(migration.batch)","maxBatch").getRawOne();return t&&t.maxBatch?parseInt(t.maxBatch):null}))}getAllByBatch(t){return v(this,void 0,void 0,(function*(){return this.toEntityMap(yield this.entityManager.createQueryBuilder(m,"m").where("m.batch = :batch",{batch:t}).orderBy("executed","DESC").getMany())}))}remove(...t){return v(this,void 0,void 0,(function*(){yield this.entityManager.remove(t.map((t=>this.toModel(t))))}))}save(...t){return v(this,void 0,void 0,(function*(){yield this.entityManager.save(t.map((t=>{const n=y.DateTime.now().toSQL({includeOffset:!1});return t.id||(t.created=n),t.updated=n,this.toModel(t)})))}))}toEntityMap(t){const n={};return t.forEach((t=>{n[t.id]=this.toEntity(t)})),n}toEntity(n){return t.Objects.hydrate(new g,n)}toModel(n){return t.Objects.hydrate(new m,n)}getModel(){return m}}var w=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class E extends u{constructor(t){super({type:"mysql",database:t.database,host:t.host,port:t.port,username:t.username,password:t.password,entities:[m]})}transaction(t){return w(this,void 0,void 0,(function*(){yield this.dataSource.transaction((n=>w(this,void 0,void 0,(function*(){const e={migration:new b(n)};return t(e)}))))}))}getMigrationRepository(){return new b(this.dataSource.manager)}}const A=o(import.meta.url)("path");var x=c.n(A);const T=o(import.meta.url)("fs");var $=c.n(T),D=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class I{static import(...t){return D(this,void 0,void 0,(function*(){const[n,e]=t,i=null!=e?n:null,o=null!=e?e:n,s=yield import(`${o}`);return i?s[i]:s}))}static require(...t){const[n,e]=t,i=null!=e?n:null,s=null!=e?e:n,a=o(import.meta.url)(`${s}`);return i?a[i]:a}static isCommonJS(){return D(this,void 0,void 0,(function*(){const t=`${process.cwd()}/package.json`;let n;try{n=JSON.parse(yield $().promises.readFile(t,{encoding:"utf-8"}))}catch(t){throw new Error("Command must be run from the root of your project containing a valid package.json file.")}return"module"!==n.type}))}}var N=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class M{static ensureMigrationDbExists(){return N(this,void 0,void 0,(function*(){const t=this.getMigrationDbConnectionOptions(),n=new l.DataSource({type:"mysql",host:t.host,port:t.port,username:t.username,password:t.password});yield n.initialize();const e=n.createQueryRunner();yield e.connect(),yield e.query(`CREATE DATABASE IF NOT EXISTS ${t.database};`),yield e.query(`USE ${t.database}`),yield e.query("\n      CREATE TABLE IF NOT EXISTS migration (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        `group` VARCHAR(255) NOT NULL,\n        name VARCHAR(255) NOT NULL,\n        executed DATETIME NOT NULL,\n        batch INT NOT NULL,\n        created DATETIME NOT NULL,\n        updated DATETIME NOT NULL\n      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n      "),yield e.release(),yield n.destroy()}))}static getMigrationDb(){return this.migrationDb||(this.migrationDb=new E(this.getMigrationDbConnectionOptions())),this.migrationDb}static loadConfig(){return N(this,void 0,void 0,(function*(){let n;const e=global.process.env.NODE_ENV;if(e)try{n=yield I.import("default",x().join(process.cwd(),`migrate.config.${e}.js`))}catch(t){throw new Error(`Failed to read migrate.config.${e}.js file: ${t.message}`)}try{this.config=t.Objects.merge(yield I.import("default",x().join(process.cwd(),"migrate.config.js")),n||{})}catch(t){throw new Error(`Failed to read migrate.config.js file: ${t.message}`)}const{valid:i,message:o}=t.Validators.schema({migrationDatabase:t.Validators.string(),connections:t.Validators.object(t.Validators.schema({host:t.Validators.string(),port:t.Validators.integer(),username:t.Validators.string(),password:t.Validators.string(),databases:t.Validators.array(t.Validators.string())})),migrationDirs:t.Validators.object(t.Validators.schema({name:t.Validators.string(),path:t.Validators.string()}))}).validate(this.config);if(!i)throw new Error(`Invalid migrate.config.js file: ${o}`);return this.config}))}static getConfig(){if(!this.config)throw new Error("Config not loaded");return this.config}static getProjectMigrations(n){return N(this,void 0,void 0,(function*(){const e={},i=this.getConfig().migrationDirs,o=yield this.getMigrationDb().getMigrationRepository().getAll(),s={};for(const a in i){e[a]=[];const{name:r,path:l}=i[a];let c;const d=x().join(process.cwd(),l);try{c=yield $().promises.readdir(d)}catch(t){throw new Error(`Failed to read migration directory ${l}: ${t.message}`)}for(const i of c){const[l]=i.split("."),{valid:c,message:u}=t.Validators.regex(/^(19|20)\d{2}_(0[1-9]|1[0-2])_(0[1-9]|[12][0-9]|3[01])_([0-1][0-9]|2[0-3])([0-5][0-9]){2}_[A-Za-z][A-Za-z0-9_]*$/,"YYYY_MM_DD_HHMMSS_MigrationName").validate(l);if(!c)throw new Error(`Invalid migration file name: ${u}`);const[h,p,f,m]=l.split("_"),g=`${h}_${p}_${f}_${m}`;if(s[g])throw new Error(`Duplicate migration timestamp "${g}" found in ${s[g]} and ${i}`);s[g]=i;const y=Object.values(o).find((t=>t.name===l));if(!1===(null==n?void 0:n.includeExecuted)&&(null==y?void 0:y.executed))continue;const v={filepath:`${d}/${i}`,group:a,groupDisplayName:r,name:l,executed:(null==y?void 0:y.executed)||null,batch:(null==y?void 0:y.batch)||null};e[a].push(v)}}return e}))}static getMigrationDbConnectionOptions(){const t=this.getConfig(),{migrationDatabase:n}=t;let e;for(const i in t.connections)if(t.connections[i].databases.includes(n)){if(e)throw new Error(`Multiple connections found for migration database "${n}"`);e=t.connections[i]}if(!e)throw new Error(`Cannot connect to migration database - no connection found for database "${n}"`);return{database:n,host:e.host,port:e.port,username:e.username,password:e.password}}}const C=(t=>{var n={};return c.d(n,t),n})({default:()=>s.default});c.d({},{});class L{getMigrationClassInstance(t){return n=this,e=void 0,o=function*(){const n=(yield I.isCommonJS())?I.require(t.filepath):yield I.import(t.filepath);let e;const i=t.name.split("_").pop();if(n[i])e=n[i];else{if(!n.default)throw new Error(`Could not find migration class in ${t.filepath}`);e=n.default}return new e},new((i=void 0)||(i=Promise))((function(t,s){function a(t){try{l(o.next(t))}catch(t){s(t)}}function r(t){try{l(o.throw(t))}catch(t){s(t)}}function l(n){var e;n.done?t(n.value):(e=n.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}l((o=o.apply(n,e||[])).next())}));var n,e,i,o}}class O{static red(t){console.log(C.default.redBright(t))}static blue(t){console.log(C.default.blueBright(t))}static green(t){console.log(C.default.greenBright(t))}static yellow(t){console.log(C.default.yellowBright(t))}}class V extends L{execute(){return t=this,n=void 0,i=function*(){const t=M.getConfig().migrationDirs,n=yield M.getProjectMigrations();for(const e in n){const i=n[e],{name:o}=t[e];if(O.yellow(o),0!==i.length)for(const t of i)t.executed?O.green(`  ${t.name}`):O.red(`  ${t.name}`);else O.red("  * No migrations found *")}},new((e=void 0)||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}));var t,n,e,i}}var R=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class B{constructor(t){this.connectionConfig=t}query(t,n=[]){return R(this,void 0,void 0,(function*(){return console.log("connection.query",t,n),(yield this.get()).query(t,n)}))}destroy(){return R(this,void 0,void 0,(function*(){this.connection&&(yield this.connection.destroy(),this.connection=void 0)}))}isInitialised(){return!!this.connection}escape(t){return R(this,void 0,void 0,(function*(){return(yield this.get()).driver.escape(t)}))}get(){return R(this,void 0,void 0,(function*(){return this.connection||(this.connection=new l.DataSource({type:"mysql",host:this.connectionConfig.host,port:this.connectionConfig.port,username:this.connectionConfig.username,password:this.connectionConfig.password}),yield this.connection.initialize()),this.connection}))}}var S,U,F,j,_,P;class z{constructor(t){this.config={},this.connections={},this.config=t}get(t){if(this.connections[t])return this.connections[t];if(!this.config[t])throw new Error(`Config for connection "${t}" not found`);const{host:n,port:e,username:i,password:o}=this.config[t];return this.connections[t]=new B({host:n,port:e,username:i,password:o}),this.connections[t]}getAllByDatabaseName(t){const n=[];for(const e in this.config)this.config[e].databases.includes(t)&&n.push(this.get(e));return n}destroyAllInitialised(){return t=this,n=void 0,i=function*(){const t=this.getAllInitialised();for(const n of t)yield n.destroy()},new((e=void 0)||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}));var t,n,e,i}getAllInitialised(){return Object.values(this.connections).filter((t=>t.isInitialised()))}}!function(t){t.INT="INT",t.TINYINT="TINYINT",t.SMALLINT="SMALLINT",t.MEDIUMINT="MEDIUMINT",t.BIGINT="BIGINT"}(S||(S={}));class Y{constructor(t){this.name=t,this.validateName(this.name)}getIndexDefinition(){return null}getName(){return this.name}validateName(n){const{valid:e,message:i}=t.Validators.all([t.Validators.string(),t.Validators.minLength(1),t.Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/,"A-z, 0-9 and/or _")]).validate(n);if(!e)throw new TypeError(`Invalid ${this.constructor.name} name: ${i}`);return!0}validateOptions(n,e){const{valid:i,message:o}=t.Validators.schema(e).validate(n);if(!i)throw new TypeError(`Invalid ${this.constructor.name} options. ${o}`);return!0}addNullableStatement(t,n){return n?`${t} NULL`:`${t} NOT NULL`}addDefaultStatement(t,n){return void 0!==n?`${t} DEFAULT ${n}`:t}addIndexStatement(t,n,e){return n?`${t}, ADD INDEX (${e})`:t}addUnsignedStatement(t,n){return n?`${t} UNSIGNED`:t}addZeroFillStatement(t,n){return n?`${t} ZEROFILL`:t}addAutoIncrementStatement(t,n){return n?`${t} AUTO_INCREMENT`:t}addPrimaryKeyStatement(t,n){return n?`${t} PRIMARY KEY`:t}addAfterStatement(t,n,e){return!e&&n&&O.yellow("WARNING: addAfter option is ignored when creating a new table."),e?(n&&(t+=` AFTER ${n}`),t):t}}class q{constructor(t,n){this.options={nullable:void 0,default:void 0,unsigned:void 0,autoIncrement:void 0,zeroFill:void 0,primaryKey:void 0,after:void 0},this.name=t,this.type=n}static create(t,n){return new q(t,n)}nullable(t){return this.options.nullable=t,this}default(t){return this.options.default=t,this}unsigned(t){return this.options.unsigned=t,this}autoIncrement(t){return this.options.autoIncrement=t,this}zeroFill(t){return this.options.zeroFill=t,this}primaryKey(t){return this.options.primaryKey=t,this}after(t){return this.options.after=t,this}get(){let t=`\`${this.name}\` ${this.type}`;return!0===this.options.unsigned&&(t+=" UNSIGNED"),"boolean"==typeof this.options.nullable&&(t+=this.options.nullable?" NULL":" NOT NULL"),void 0!==this.options.default&&(t+=` DEFAULT ${this.options.default}`),!0===this.options.autoIncrement&&(t+=" AUTO_INCREMENT"),!0===this.options.zeroFill&&(t+=" ZEROFILL"),!0===this.options.primaryKey&&(t+=" PRIMARY KEY"),"string"==typeof this.options.after&&(t+=` AFTER \`${this.options.after}\``),t}}!function(t){t.INDEX="INDEX",t.UNIQUE="UNIQUE",t.FULLTEXT="FULLTEXT"}(U||(U={}));class k{constructor(){this.indexColumns=[],this.indexType=U.INDEX}static create(){return new k}defaultName(t){return this.defaultIndexName=t,this}name(t){return this.indexName=t,this}columns(...t){return this.indexColumns.push(...t),this}type(t){return this.indexType=t,this}get(){if(!this.indexColumns.length)throw new Error("No columns defined for index");const t=this.indexName||this.defaultIndexName;let n=t&&this.indexType===U.UNIQUE?`${this.indexType} INDEX`:this.indexType;return t&&(n+=` \`${t}\``),n+=` (${this.indexColumns.map((t=>`\`${t}\``)).join(", ")})`,n}}class X extends Y{constructor(n,e){super(n),this.options=Object.assign({type:S.INT,nullable:!1,default:void 0,unsigned:!1,autoIncrement:!1,zeroFill:!1,primaryKey:!1,index:!1,addAfter:void 0},e),this.validateOptions(this.options,{type:t.Validators.enumValue(S),nullable:t.Validators.boolean(),default:t.Validators.integer({optional:!0}),unsigned:t.Validators.boolean(),autoIncrement:t.Validators.boolean(),zeroFill:t.Validators.boolean(),primaryKey:t.Validators.boolean(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return q.create(this.name,this.options.type).nullable(this.options.nullable).default(this.options.default).unsigned(this.options.unsigned).autoIncrement(this.options.autoIncrement).zeroFill(this.options.zeroFill).primaryKey(this.options.primaryKey).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?k.create().columns(this.name):null}}class H extends X{constructor(t){super(t,{type:S.INT,nullable:!1,default:void 0,unsigned:!0,autoIncrement:!0,zeroFill:!1,primaryKey:!0,index:!1})}}class K extends Y{constructor(n,e){super(n),this.options=Object.assign({nullable:!1,default:void 0,unsigned:!1,zeroFill:!1,precision:10,scale:2,index:!1,addAfter:void 0},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),unsigned:t.Validators.boolean(),zeroFill:t.Validators.boolean(),precision:t.Validators.integer(),scale:t.Validators.integer(),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return q.create(this.name,`DECIMAL(${this.options.precision}, ${this.options.scale})`).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0).unsigned(this.options.unsigned).zeroFill(this.options.zeroFill).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?k.create().columns(this.name):null}}!function(t){t.CHAR="CHAR",t.VARCHAR="VARCHAR",t.TEXT="TEXT",t.TINYTEXT="TINYTEXT",t.MEDIUMTEXT="MEDIUMTEXT",t.LONGTEXT="LONGTEXT"}(F||(F={}));class G extends Y{constructor(n,e){super(n);const i=(null==e?void 0:e.type)||F.VARCHAR;this.options=Object.assign({type:i,nullable:!1,primaryKey:!1,default:void 0,length:i!==F.VARCHAR?void 0:255,index:!1,addAfter:void 0},e),this.validateOptions(this.options,{type:t.Validators.enumValue(F),nullable:t.Validators.boolean(),primaryKey:t.Validators.boolean(),default:t.Validators.string({optional:!0}),length:t.Validators.integer({optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){let t=this.options.type;return this.options.type!==F.CHAR&&this.options.type!==F.VARCHAR||void 0!==this.options.length&&(t+=`(${this.options.length})`),q.create(this.name,t).nullable(this.options.nullable).primaryKey(this.options.primaryKey).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?k.create().columns(this.name):null}}class Q extends Y{constructor(n,e){super(n),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,"YYYY-MM-DD",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return q.create(this.name,"DATE").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?k.create().columns(this.name):null}}class Z extends Y{constructor(n,e){super(n),this.options=Object.assign({nullable:!1,default:void 0,addAfter:void 0},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"HH:MM:SS",{optional:!0}),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return q.create(this.name,"TIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}}class J extends Y{constructor(n,e){super(n),this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,"YYYY-MM-DD HH:MM:SS",{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return q.create(this.name,"DATETIME").nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?k.create().columns(this.name):null}}!function(t){t.BLOB="BLOB",t.TINYBLOB="TINYBLOB",t.MEDIUMBLOB="MEDIUMBLOB",t.LONGBLOB="LONGBLOB"}(j||(j={}));class W extends Y{constructor(n,e){super(n),this.options=Object.assign({type:j.BLOB,nullable:!1,addAfter:void 0},e),this.validateOptions(this.options,{type:t.Validators.enumValue(j),nullable:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return q.create(this.name,this.options.type).nullable(this.options.nullable).after(this.options.addAfter)}}class tt extends Y{constructor(n,e,i){super(n),this.values=e;const{valid:o,message:s}=t.Validators.all([t.Validators.array(t.Validators.all([t.Validators.string(),t.Validators.minLength(1)])),t.Validators.minLength(1)]).validate(this.values);if(!o)throw new TypeError(`Invalid ${this.constructor.name} values. ${s}`);this.options=Object.assign({nullable:!1,default:void 0,index:!1,addAfter:void 0},i);const a={};for(const t of this.values)a[t]=t;this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.enumValue(a,{optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})})}getColumnDefinition(){return q.create(this.name,`ENUM('${this.values.join("', '")}')`).nullable(this.options.nullable).default(this.options.default?`'${this.options.default}'`:void 0).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?k.create().columns(this.name):null}}class nt extends Y{constructor(n,e){if(super(n),this.options=Object.assign({nullable:!1,default:void 0,zeroFill:!1,precision:void 0,scale:void 0,index:!1,addAfter:void 0},e),this.validateOptions(this.options,{nullable:t.Validators.boolean(),default:t.Validators.number({optional:!0}),zeroFill:t.Validators.boolean(),precision:t.Validators.integer({optional:!0}),scale:t.Validators.integer({optional:!0}),index:t.Validators.boolean(),addAfter:t.Validators.string({optional:!0})}),!(null==this.options.precision&&null==this.options.scale||null!=this.options.precision&&null!=this.options.scale))throw new Error(`Precision and scale must be both defined or both undefined in column ${this.name}`)}getColumnDefinition(){const t=null!=this.options.precision&&null!=this.options.scale?`DOUBLE(${this.options.precision}, ${this.options.scale})`:"DOUBLE";return q.create(this.name,t).nullable(this.options.nullable).default("number"==typeof this.options.default?this.options.default.toFixed(this.options.scale):void 0).zeroFill(this.options.zeroFill).after(this.options.addAfter)}getIndexDefinition(){return this.options.index?k.create().columns(this.name):null}}!function(t){t.UTF8="utf8",t.UTF8MB4="utf8mb4"}(_||(_={})),function(t){t.UTF8_GENERAL_CI="utf8_general_ci",t.UTF8MB4_GENERAL_CI="utf8mb4_general_ci",t.UTF8MB4_UNICODE_CI="utf8mb4_unicode_ci"}(P||(P={}));var et=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class it{constructor(t,n,e,i,o){this.operations=[],this.columnAdditions=[],this.name=t,this.connection=n,this.operations=e,this.tableExists=i;const s=Object.assign({},{encoding:_.UTF8MB4,collation:P.UTF8MB4_GENERAL_CI},o);this.operations.push((()=>et(this,void 0,void 0,(function*(){if(0===this.columnAdditions.length)return;const t=yield this.connection.escape(this.name);if(!this.tableExists){const n=[...this.columnAdditions.map((t=>t.getColumnDefinition().get())),...this.columnAdditions.map((t=>{const n=t.getIndexDefinition();return n?n.defaultName(`${this.name.toLowerCase()}_${t.getName().toLowerCase()}_index`).get():null})).filter((t=>null!=t))];let e="";s.encoding&&(e+=` DEFAULT CHARACTER SET ${s.encoding}`),s.collation&&(e+=` DEFAULT COLLATE ${s.collation}`),yield this.connection.query(`CREATE TABLE ${t} (${n.join(", ")})${e};`),this.tableExists=!0,this.columnAdditions.splice(0,this.columnAdditions.length)}const n=[...this.columnAdditions.map((t=>`ADD COLUMN ${t.getColumnDefinition().get()}`)),...this.columnAdditions.map((t=>{const n=t.getIndexDefinition();return n?(n.defaultName(`${this.name.toLowerCase()}_${t.getName().toLowerCase()}_index`),`ADD ${n.get()}`):null})).filter((t=>null!=t))];0!==n.length&&(yield this.connection.query(`ALTER TABLE ${t} ${n.join(", ")};`))}))))}id(t="id"){return this.columnAdditions.push(new H(t)),this}int(t,n){return this.columnAdditions.push(new X(t,n)),this}decimal(t,n){return this.columnAdditions.push(new K(t,n)),this}double(t,n){return this.columnAdditions.push(new nt(t,n)),this}string(t,n){return this.columnAdditions.push(new G(t,n)),this}enum(t,n,e){return this.columnAdditions.push(new tt(t,n,e)),this}date(t,n){return this.columnAdditions.push(new Q(t,n)),this}time(t,n){return this.columnAdditions.push(new Z(t,n)),this}datetime(t,n){return this.columnAdditions.push(new J(t,n)),this}blob(t,n){return this.columnAdditions.push(new W(t,n)),this}renameColumn(t,n){return this.operations.push((()=>et(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} RENAME COLUMN ${yield this.connection.escape(t)} TO ${yield this.connection.escape(n)};`)})))),this}dropColumn(t){return this.operations.push((()=>et(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP COLUMN ${yield this.connection.escape(t)};`)})))),this}addColumnIndex(t){return this.operations.push((()=>et(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} ADD INDEX ${yield this.connection.escape(t)};`)})))),this}dropColumnIndex(t){return this.operations.push((()=>et(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} DROP INDEX ${yield this.connection.escape(t)};`)})))),this}setColumnNullable(t,n){return this.operations.push((()=>et(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} ${n?"NULL":"NOT NULL"};`)})))),this}setColumnDefault(t,n){return this.operations.push((()=>et(this,void 0,void 0,(function*(){yield this.connection.query(`ALTER TABLE ${yield this.connection.escape(this.name)} MODIFY COLUMN ${yield this.connection.escape(t)} DEFAULT ${"string"==typeof n?`'${n}'`:n};`)})))),this}drop(){return this.operations.push((()=>et(this,void 0,void 0,(function*(){yield this.connection.query(`DROP TABLE ${yield this.connection.escape(this.name)};`)})))),this}}class ot{constructor(t,n){this.connection=t,this.operations=n}create(t,n){return new it(t,this.connection,this.operations,!1,n)}table(t){return new it(t,this.connection,this.operations,!0)}}var st=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class at{constructor(t){this.operations=[],this.connections=t}database(t,n){let e;if(n)e=this.connections.get(n);else{const n=this.connections.getAllByDatabaseName(t);if(0===n.length)throw new Error(`No connections found for database "${t}"`);if(n.length>1)throw new Error(`Multiple connections found for database "${t}". Connection name must be specified.`);e=n[0]}return this.operations.push((()=>st(this,void 0,void 0,(function*(){yield e.query(`CREATE DATABASE IF NOT EXISTS ${yield e.escape(t)};`)})))),this.operations.push((()=>st(this,void 0,void 0,(function*(){yield e.query(`USE ${yield e.escape(t)};`)})))),new ot(e,this.operations)}executePendingOperations(){return st(this,void 0,void 0,(function*(){for(;this.operations.length>0;){const t=this.operations.shift();yield t()}}))}}var rt=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class lt extends L{execute(){return rt(this,void 0,void 0,(function*(){const t=M.getConfig(),n=new z(t.connections),e=new at(n);let i=0;const o=yield this.getMigrationsToRollBack();if(o.length){try{for(const{migrationRow:t,migrationFile:n}of o){O.yellow(`Rolling back: ${n.name}`);const o=yield this.getMigrationClassInstance(n);yield o.down(e),yield e.executePendingOperations(),yield M.getMigrationDb().getMigrationRepository().remove(t),i++,O.green(`Success: ${n.name}`),console.log("")}O.green(`Successfully rolled back ${i} migration${1!==i?"s":""}`)}catch(t){O.red(`Failed to roll back migrations: ${t.message}`),O.red(t.stack)}yield n.destroyAllInitialised()}else O.blue("No migrations to rollback")}))}getMigrationsToRollBack(){return rt(this,void 0,void 0,(function*(){const t=yield M.getMigrationDb().getMigrationRepository().getLatestBatch();if(!t)return[];const n=yield M.getMigrationDb().getMigrationRepository().getAllByBatch(t),e=yield M.getProjectMigrations();return Object.values(n).sort(((t,n)=>t.name<n.name?1:-1)).map((t=>{const n=e[t.group].find((n=>n.name===t.name));if(!n)throw new Error(`Could not find migration file for ${t.name} in group ${t.group}`);return{migrationRow:t,migrationFile:n}}))}))}}var ct=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};class dt extends L{constructor(t){super(),this.options=t}execute(){var t;return ct(this,void 0,void 0,(function*(){let n=0;const e=M.getConfig(),i=new z(e.connections),o=new at(i),s=yield this.getMigrationFilesToRun(),a=M.getMigrationDb().getMigrationRepository(),r=yield a.getLatestBatch(),l=r?r+1:1;try{for(const t of s){O.yellow(`Running: ${t.name}`);const e=yield this.getMigrationClassInstance(t);yield e.up(o),yield o.executePendingOperations();const i=new g;i.name=t.name,i.group=t.group,i.executed=y.DateTime.now().toSQL({includeOffset:!1}),i.batch=l,yield a.save(i),n++,O.green(`Success: ${t.name}`),console.log("")}O.green(`Successfully ran ${n} migration${1!==n?"s":""}`)}catch(e){O.red(`Failed to run migrations: ${e.message}`),O.red(e.stack),!0===(null===(t=this.options)||void 0===t?void 0:t.rollbackOnError)&&(n>0?(console.log(""),O.yellow("Attempting to roll back migrations..."),yield(new lt).execute()):(console.log(""),O.yellow("Nothing to roll back - 0 migrations finished successfully.")))}yield i.destroyAllInitialised()}))}getMigrationFilesToRun(){return ct(this,void 0,void 0,(function*(){const t=yield M.getProjectMigrations({includeExecuted:!1}),n=[];for(const e in t)n.push(...t[e]);return n.sort(((t,n)=>t.name<n.name?-1:1)),n}))}}var ut=function(t,n,e,i){return new(e||(e=Promise))((function(o,s){function a(t){try{l(i.next(t))}catch(t){s(t)}}function r(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(a,r)}l((i=i.apply(t,n||[])).next())}))};function ht(t){return(n,e,i)=>ut(this,void 0,void 0,(function*(){yield M.ensureMigrationDbExists(),yield M.getMigrationDb().initialize(),yield t(n,e,i),yield M.getMigrationDb().destroy()}))}ut(void 0,void 0,void 0,(function*(){try{yield M.loadConfig();const{default:t}=yield Promise.resolve().then(c.bind(c,704));t.name("Electra Migrate").description("MySQL Migrations for Node.js Applications").version(c(147).i8),t.command("status","Show the status of all migrations").action(ht((()=>ut(void 0,void 0,void 0,(function*(){yield(new V).execute()}))))),t.command("run","Run all migrations").option("--rollback-on-error","Automatically rollback migrations if an error occurs").action(ht(((t,n)=>ut(void 0,void 0,void 0,(function*(){const t=new dt({rollbackOnError:n.rollbackOnError||!1});yield t.execute()}))))),t.command("rollback","Rollback the last batch of migrations").action(ht((()=>ut(void 0,void 0,void 0,(function*(){yield(new lt).execute()}))))),t.parse(process.argv)}catch(t){console.log(C.default.redBright(t.stack))}}))})();
//# sourceMappingURL=migrate.mjs.map