declare module "@formkit/themes" {
  import { FormKitClasses } from "@formkit/core";
  export function generateClasses(
    classes: Record<string, FormKitClasses>
  ): Record<string, FormKitClasses>;
}

declare module "@formkit/i18n" {
  export function ru(): any;
}

declare module "@formkit/icons" {
  export const genesisIcons: any;
}
