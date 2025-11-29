export const i18nConfig = {
  locales: [
    { code: 'en' as const, name: 'English', dir: 'ltr' as const },
    { code: 'ur' as const, name: 'Urdu', dir: 'rtl' as const },
    { code: 'ar' as const, name: 'Arabic', dir: 'rtl' as const },
    { code: 'hi' as const, name: 'Hindi', dir: 'ltr' as const },
    { code: 'fa' as const, name: 'Farsi', dir: 'rtl' as const },
    { code: 'pa' as const, name: 'Punjabi', dir: 'ltr' as const },
    { code: 'sd' as const, name: 'Sindhi', dir: 'ltr' as const },
    { code: 'ps' as const, name: 'Pashto', dir: 'rtl' as const },
    { code: 'tr' as const, name: 'Turkish', dir: 'ltr' as const },
    { code: 'fr' as const, name: 'French', dir: 'ltr' as const },
  ],
  defaultLocale: 'en' as const,
}

export type Locale = typeof i18nConfig.locales[number]['code']