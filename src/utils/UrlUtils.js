const getValuesFromFragment = fragment => {
  return fragment
    .substring(1)
    .split('&')
    .map(keyValueString => keyValueString.split('='))
    .reduce((acc, cur) => {
      if (cur.length === 2) {
        return ({ ...acc, [cur[0]]: cur[1] });
      }
      return acc;
    }, {});
};

export const getValueFromFragment = (name, fragment) => {
  return getValuesFromFragment(fragment)[name] || null;
};

const stringifyParams = params => {
  return Object.entries(params).map(([ key, value ]) => `${key}=${value}`);
};

export function toFragment(params, currentFragment = '') {
  const existingParams = getValuesFromFragment(currentFragment);
  const stringifiedParams = stringifyParams({
    ...existingParams,
    ...params,
  });
  return '#' + stringifiedParams.join('&');
}
