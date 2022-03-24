const validLocales: Record<string, WinqLocale> = {
  de: 'de',
  en: 'en',
};

export const validateLocale = (localeString: string): WinqLocale => {
  return validLocales[localeString] || 'en';
};
