import pTryEach = require('../index');

test('resolve with the result of the first successful task', async () => {
  const iterable = [async () => 10 + 10, () => 20 + 20, async () => 30 + 30];

  const res = await pTryEach(iterable);

  expect(res).toEqual(20);
});

test('reject with the error of the final attempt when all tasks fail', async () => {
  const iterable = [
    async () => Promise.reject('foo'),
    () => Promise.reject('bar'),
    async () => Promise.reject('foobar'),
  ];

  let res;

  try {
    await pTryEach(iterable);
  } catch (err) {
    res = err;
  }

  expect(res).toEqual('foobar');
});

test('throw if element of iterable is not a function', async () => {
  const iterable = ['foo', async () => 10 + 10];

  const error = new TypeError(`Expected element to be a \`Function\`, received \`string\` instead`);

  await expect(pTryEach(iterable)).rejects.toThrow(error);
});
