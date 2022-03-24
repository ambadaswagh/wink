const hex = (b: number) => b.toString(16).padStart(2, '0');

export const getRandomString = (length: number) => {
  if (!crypto?.getRandomValues) {
    // not on https
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      .toString()
      .substr(0, length);
  }
  const a = new Uint8Array(length / 2);
  crypto.getRandomValues(a);
  return Array.from(a).map(hex).join('');
};
