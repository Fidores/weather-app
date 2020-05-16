export const transformObjectToParams = (object: any): string => {
  return Object.entries(object)
    .map(item => {
      const key = item[0];
      const value = item[1];
      return [key, value].join('=');
    })
    .join('&');
};
