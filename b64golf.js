// Base64 alphabet lookup table
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Transform input string into array of chars
const b64Encode = str => str.split('')
  // Map character bytes to 8-bit binary values
  // unescape(encodeURIComponent(c)).split('') allows us to correctly handle multibyte characters
  .map(c => unescape(encodeURIComponent(c)).split('').map(c => c.charCodeAt(0).toString(2).padStart(8, 0)).join(''))
  // Join 8-bit binary values to produce binary string
  .join('')
  // Split binary string out into 6-bit values
  .match(/.{1,6}/g)
  // Map 6-bit binary values into Base64 characters by converting binary value to alphabet index
  // Make sure to pad with zeroes if we have less than 6 bits
  .map(b => alphabet[parseInt(parseInt(b.padEnd(6, 0), 10), 2)])
  // Join the Base64 characters to produce encoded string
  // Pad with '=' if string length isn't a multiple of 4
  .reduce((s, c, i, a) => (s += c) + ((i !== a.length - 1) ? '' : '='.repeat((Math.ceil(s.length / 4) * 4) - s.length)));
