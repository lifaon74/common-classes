import { ILocale, ILocales } from './locales.type';

export function localeToString(
  locale: ILocale,
): string {
  if (typeof locale === 'string') {
    return locale;
  } else {
    return locale.toString();
  }
}

export function isArrayLike<GValue>(
  value: any
): value is ArrayLike<GValue> {
  return Array.isArray(value)
    || (
      (typeof value.length === 'number')
      && (
        (value.length === 0)
        || ((0 in value) && ((value.length - 1) in value))
      )
    );
}

export function localesToStringArray(
  locales: ILocales,
): string[] {
  if (typeof locales === 'string') {
    return [locales];
  } else if (isArrayLike(locales)) {
    return Array.prototype.map.call(locales, localeToString);
  } else {
    return [localeToString(locales)];
  }
}

