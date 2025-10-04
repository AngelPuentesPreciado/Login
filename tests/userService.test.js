const userService = require('../src/services/userService');


beforeEach(() => userService._resetForTests());


test('create and find user', async () => {
const u = await userService.createUser({ username: 'a', password: 'p' });
expect(u.username).toBe('a');
const found = userService.findUserByUsername('a');
expect(found).not.toBeNull();
});


test('cannot create duplicate user', async () => {
await userService.createUser({ username: 'dup', password: 'p' });
await expect(userService.createUser({ username: 'dup', password: 'p2' })).rejects.toThrow('UserExists');
});


test('authenticate succeeds and fails', async () => {
await userService.createUser({ username: 'login', password: 'secret' });
const good = await userService.authenticate({ username: 'login', password: 'secret' });
expect(good).not.toBeNull();
const bad = await userService.authenticate({ username: 'login', password: 'wrong' });
expect(bad).toBeNull();
});