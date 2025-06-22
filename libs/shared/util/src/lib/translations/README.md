# Translations

This directory contains all translation files for the MyWheels Calculator application.

## Structure

- `en.translations.ts` - English translations (default/fallback language)
- `nl.translations.ts` - Dutch translations
- `index.ts` - Exports all translations and types

## Adding New Languages

1. Create a new translation file (e.g., `fr.translations.ts`):

```typescript
export const frTranslations = {
  'calculator.title': 'Mon Calculateur de Roues',
  // ... other translations
} as const;
```

2. Add the new language to the `LanguageEnum` in `../types/language.enum.ts`:

```typescript
export enum LanguageEnum {
  EN = 'en',
  NL = 'nl',
  FR = 'fr',
}
```

3. Update the `translations` object in `index.ts`:

```typescript
import { frTranslations } from './fr.translations';

export const translations: Record<LanguageEnum, Record<string, string>> = {
  [LanguageEnum.EN]: enTranslations,
  [LanguageEnum.NL]: nlTranslations,
  [LanguageEnum.FR]: frTranslations,
};
```

4. Add the new language to the `availableLanguages` array in `LanguageSelectComponent`.

## Adding New Translation Keys

1. Add the key to `en.translations.ts` first (as it's the source of truth for TypeScript types)
2. Add the same key to all other language files
3. Use the new key in your components with the `translate` pipe:

```html
{{ 'new.translation.key' | translate }}
```

## Translation Key Naming Convention

Use dot notation with descriptive names:

- `calculator.title` - Page/component titles
- `form.label_name` - Form labels
- `common.action` - Common actions (save, cancel, etc.)
- `error.message_type` - Error messages
- `nav.section` - Navigation items

## Type Safety

The `TranslationKey` type is automatically generated from the English translations, providing autocomplete and type safety when using translation keys.
