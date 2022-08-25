const md5 = require('md5');

const passwordHash = (password) => md5(password);
const passwordCompare = (password, passwordHash) => passwordHash === md5(password);

module.exports = {
passwordHash,
passwordCompare,
}; 