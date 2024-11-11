import Cookies from "universal-cookie";


const cookies = new Cookies()

const convertExpiresToDate = (expires?: number | Date): Date | undefined => {
  if (typeof expires === 'number') {
    return new Date(Date.now() + expires);
  }
  return expires;
};

export const setCookie = (key: string, value: string, options?: { path?: string, expires?: number | Date, secure?: boolean }) => {
  const { expires, ...restOptions } = options || {};
  cookies.set(key, value, {
    expires: convertExpiresToDate(expires),
    ...restOptions,
  });
};

export const getCookie = (key: string) => {
  return cookies.get(key)
}

export const removeCookie = (key: string) => {
  return cookies.remove(key)
}