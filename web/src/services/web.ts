export const isLocalhost = () =>
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  !!window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/);

export const isLocalnet = () =>
  isLocalhost() ||
  !!window.location.hostname.match(
    // for brevity, testing only 24-bit block and 16-bit blocks
    /^(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})$/
  );

export const fullUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return [window.location.protocol, '', window.location.host, cleanPath].join('/');
};
