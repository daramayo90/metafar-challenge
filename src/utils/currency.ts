/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl */

export const format = (value: string) => {
   const formatter = new Intl.NumberFormat('en-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   });

   return formatter.format(Number(value));
};
