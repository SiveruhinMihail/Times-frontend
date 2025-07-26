// types/formkit.d.ts

// Для темы Genesis
declare module "@formkit/themes/genesis" {
  const genesisTheme: string;
  export default genesisTheme;
}

// Для кастомных классов
declare module "@formkit/themes" {
  import { FormKitClasses } from "@formkit/core";
  
  export function generateClasses(
    classes: Record<string, string | FormKitClasses>
  ): Record<string, FormKitClasses>;
}

// Для локализации (русский язык)
declare module "@formkit/i18n" {
  import { FormKitLocale } from "@formkit/core";
  
  export function ru(): FormKitLocale;
}

// Для иконок
declare module "@formkit/icons" {
  import { FormKitIcon } from "@formkit/inputs";
  
  export const genesisIcons: Record<string, string | FormKitIcon>;
}