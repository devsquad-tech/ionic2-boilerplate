'use strict';
/**
 * @see Create React App
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/env.js
 */
const fs = require('fs');

const ENV = process.env.NODE_ENV || process.env.IONIC_ENV;
if (!ENV) {
  throw new Error(
    'The ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `.env.${ENV}.local`,
  `.env.${ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  ENV !== 'test' && `.env.local`,
  '.env',
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    });
  }
});

// injetado para aplicação via DefinePlugin do Webpack.
const APP = /^NG2_APP_/i;

const raw = Object.keys(process.env)
  .filter(key => APP.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    }, {}
  );

const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {}),
};

module.exports = stringified;
