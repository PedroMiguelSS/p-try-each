export default async (iterable: any[]) => {
  let error;

  for (const element of iterable) {
    const type = typeof element;

    if (type !== 'function') {
      throw new TypeError(`Expected element to be a \`Function\`, received \`${type}\` instead`);
    }

    try {
      const res = await element();

      return res;
    } catch (err) {
      error = err;
    }
  }

  throw error;
}
