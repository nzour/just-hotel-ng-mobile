// find the way to avoid `any` type
export function urlParams(...objects: any[]): string {
  let params = Array<string>();

  for (let obj of objects) {
    if (!obj) {
      continue;
    }

    for (let property in obj) {
      if (!obj.hasOwnProperty(property)) {
        continue;
      }

      const value = obj[property];

      if (!value) {
        continue;
      }

      handleParams(params, property, value);
    }
  }

  return params.length ? '?' + params.join('&') : '';
}

/**
 * Если нам нужно добавить в Query-параметры массив,
 * то необходимо объявить параметр несколько раз.
 *
 * @param params
 * @param prop
 * @param value
 */
function handleParams(params: string[], prop: string, value: any): void {
  Array.isArray(value)
    ? value.forEach(item => params.push(prop + '=' + item))
    : params.push(prop + '=' + value);
}
