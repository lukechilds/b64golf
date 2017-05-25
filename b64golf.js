// Generate Base64 alphabet lookup table
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

// Transform input string into array of chars
const b64Encode = str => str.split('')
  // Map character bytes to 8-bit binary values
  .map(c => ('000000000' + c.charCodeAt(0).toString(2)).substr(-8))
  // Join 8-bit binary values to produce binary string
  .join('')
  // Split binary string out into 6-bit values
  .match(/.{1,6}/g)
  // Map 6-bit binary values into Base64 characters by converting binary value to alphabet index
  // Make sure to pad with zeroes if we have less than 6 bits
  .map(b => alphabet[parseInt(parseInt(b + '0'.repeat(6 - b.length), 10), 2)])
  // Join the Base64 characters to produce encoded string
  .join('');
