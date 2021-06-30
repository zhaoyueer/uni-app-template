import { parseUrl } from 'query-string';

export function parseParams<T = Record<string, unknown>>(url?: string): T {
  if (!url) {
    const pages = getCurrentPages<{ options: T }>();
    const page = pages[pages.length - 1];
    return page.options;
  }
  return parseUrl(url).query;
}

export function addParams(
  url: string,
  params: Record<string, unknown>,
  encode = true,
) {
  const oldParams = parseParams(url);
  const origin = url.split('?')[0];
  const newParams = { ...oldParams, ...params };
  const temp = Object.keys(newParams).reduce((acc: Array<string>, key) => {
    const value = newParams[key];
    if (value !== null && value !== undefined)
      acc.push(
        `${key}=${encode ? encodeURIComponent(value as string) : value}`,
      );
    return acc;
  }, []);
  const queries = temp.join('&');
  return `${origin}${queries.length ? '?' : ''}${queries}`;
}

export function removeParams(url: string, params: string[]) {
  const newParams = parseParams(url);
  const origin = url.split('?')[0];
  params.forEach((param) => {
    newParams[param] = null;
  });
  return addParams(origin, newParams);
}

export function getCurrentUrl() {
  let url = '';
  try {
    const pages = getCurrentPages<{ options: Record<string, unknown> }>();
    const page = pages[pages.length - 1];
    url = addParams(`/${page.route}`, page.options, false);
  } catch (e) {
    console.log(e);
  }
  return url;
}
