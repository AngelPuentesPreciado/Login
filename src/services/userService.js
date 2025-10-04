// Servicio simple en memoria
const bcrypt = require('bcrypt');


const users = [];


async function createUser({ username, password }) {
if (users.find(u => u.username === username)) {
throw new Error('UserExists');
}
const hashed = await bcrypt.hash(password, 10);
const user = { id: users.length + 1, username, password: hashed };
users.push(user);
return { id: user.id, username: user.username };
}


async function authenticate({ username, password }) {
const user = users.find(u => u.username === username);
if (!user) return null;
const ok = await bcrypt.compare(password, user.password);
return ok ? { id: user.id, username: user.username } : null;
}


function findUserByUsername(username) {
return users.find(u => u.username === username) || null;
}


function _resetForTests() {
users.length = 0;
}


module.exports = { createUser, authenticate, findUserByUsername, _resetForTests };