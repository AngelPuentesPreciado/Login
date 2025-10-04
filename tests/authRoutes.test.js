const request = require('supertest');
const createApp = require('../src/app');
const userService = require('../src/services/userService');


let app;


beforeEach(() => {
userService._resetForTests();
app = createApp();
});


test('register -> login -> access main', async () => {
const agent = request.agent(app);


// register
const r = await agent.post('/auth/register').send({ username: 'u1', password: 'p1' });
expect(r.status).toBe(201);
expect(r.body.user.username).toBe('u1');


// access main (should work because session created)
const m = await agent.get('/main');
expect(m.status).toBe(200);
expect(m.body.user.username).toBe('u1');


// logout
const out = await agent.post('/auth/logout');
expect(out.status).toBe(200);


// after logout, should be 401
const m2 = await agent.get('/main');
expect(m2.status).toBe(401);
});


test('login with wrong creds returns 401', async () => {
const agent = request.agent(app);
await userService.createUser({ username: 'u2', password: 'p2' });
const r = await agent.post('/auth/login').send({ username: 'u2', password: 'bad' });
expect(r.status).toBe(401);
});