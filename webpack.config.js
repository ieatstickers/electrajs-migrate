const nodeExternals = require('webpack-node-externals');

const baseConfig = {
  target: "node",
  externals: [ nodeExternals() ],
  plugins: [],
  mode:    process.env.ENV === "dev" ? "development" : "production",
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".json" ]
  },
  // Loaders
  module: {
    rules: [
      // TypeScript
      {
        test: /\.(ts|tsx)$/,
        use:  [ { loader: "ts-loader" } ]
      }
    ]
  }
};

module.exports = [
  // migrate-entry.ts
  Object.assign({}, baseConfig, {
    entry: "./migrate-entry.ts",
    // Output
    output:  {
      filename: "migrate.js",
      path: `${__dirname}/dist`,
      library:      {
        type: "umd"
      },
      globalObject: "this"
    },
  }),
  // migrate.ts (cjs)
  Object.assign({}, baseConfig, {
    // Entry
    entry: "./migrate.ts",
    // Output
    output:  {
      filename: "migrate.js",
      path: `${__dirname}/dist/cjs`,
      library:      {
        type: "commonjs2"
      },
      globalObject: "this"
    },
  }),
  // migrate.ts (esm)
  Object.assign({}, baseConfig, {
    // Entry
    entry: "./migrate.ts",
    // Output
    output:  {
      filename: "migrate.js",
      path: `${__dirname}/dist/esm`,
      library:      {
        type: "module"
      },
      chunkFormat: 'module',
      globalObject: "this"
    },
    experiments: {
      outputModule: true,
    },
  }),
  // index.ts (cjs)
  Object.assign({}, baseConfig, {
    // Entry
    entry: "./index.ts",
    // Output
    output:  {
      filename: "index.js",
      path: `${__dirname}/dist/cjs`,
      library:      {
        type: "commonjs2"
      },
      globalObject: "this"
    },
  }),
  // index.ts (esm)
  Object.assign({}, baseConfig, {
    // Entry
    entry: "./index.ts",
    // Output
    output:  {
      filename: "index.js",
      path: `${__dirname}/dist/esm`,
      library:      {
        type: "module"
      },
      chunkFormat: 'module',
      globalObject: "this"
    },
    experiments: {
      outputModule: true,
    },
  }),
];
