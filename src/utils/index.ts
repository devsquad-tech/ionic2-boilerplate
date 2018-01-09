declare var process;

const processEnv = process.env;
const preffixEnv = 'NG2_APP_';

/**
 * Get value variable assigns via dotenv with DefinePlugin webpack
 *
 * @param {string} varEnv
 * @param {any} defaultValue
 * @return {any}
 */
export function env(varEnv: string, defaultValue?: any) {
  const nameVar = preffixEnv + varEnv;
  if (nameVar in processEnv) {
    return processEnv[nameVar];
  }

  return defaultValue;
}
