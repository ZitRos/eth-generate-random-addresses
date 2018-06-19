const generate = 2249; // Number of addresses to generate
const decimals = 6; // Number of decimals (no more than 6!)
let totalTokens = 30957882.3626; // Total amount to generate

totalTokens *= Math.pow(10, decimals);
const floor = (x) => Math.floor(Math.pow(10, decimals) * x) / Math.pow(10, decimals);
const median = Math.floor(totalTokens / generate);
const rest = totalTokens - median * generate;
const random = (x) => Math.floor(Math.random() * x);
const randomAddress = () => `0x${ Array.from({ length: 40 }, () => "0123456789abcdef"[random(16)]).join("") }`;
const array = Array.from({ length: generate }, () => [randomAddress(), median] );
array[array.length - 1][1] += rest;
Array.from({ length: generate }).forEach(() => {
  const a = random(generate); const b = random(generate);
  const v = Math.max(0, Math.floor(Math.min(array[a][1], array[b][1]) / (3 - Math.random())));
  array[a][1] -= v;
  array[b][1] += v;
});
//array.forEach((a, i) => array[i][1] /= Math.pow(10, decimals));
//totalTokens /= Math.pow(10, decimals);
console.log(array.map(x => {
  const a = x.slice(); a[1] = a[1].toString();
  const e1 = a[1].slice(0, -6);
  const e2 = a[1].slice(-6);
  a[1] = (e1 || "0") + "." + (e2.length < 6 ? Array.from({ length: 6 - e2.length }, () => "0").join("") + e2 : e2);
  return a.join("\t");
}).join("\n"));
const sum = array.map(x => x[1]).reduce((a, b) => a + b, 0);
console.log(sum, totalTokens, sum === totalTokens);
