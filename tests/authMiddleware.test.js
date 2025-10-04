const { requireAuth } = require('../src/middleware/authMiddleware');


// We'll call middleware directly


function makeReq(session) {
return { session };
}


function makeRes() {
return {
statusCalled: null,
jsonCalled: null,
status(code) { this.statusCalled = code; return this; },
json(obj) { this.jsonCalled = obj; }
};
}


test('requireAuth allows when session.user exists', () => {
const req = makeReq({ user: { id: 1 } });
const res = makeRes();
let called = false;
requireAuth(req, res, () => { called = true; });
expect(called).toBe(true);
});


test('requireAuth blocks when no user', () => {
const req = makeReq(null);
const res = makeRes();
let called = false;
requireAuth(req, res, () => { called = true; });
expect(called).toBe(false);
expect(res.statusCalled).toBe(401);
expect(res.jsonCalled).toEqual({ error: 'Unauthorized' });
});