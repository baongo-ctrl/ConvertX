/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_SCRIPT_URL?: string;
  readonly VITE_EVENT_SCRIPT_URL?: string;
  readonly VITE_HS_FORM_CONTACT?: string;
  readonly VITE_HS_FORM_EVENT?: string;
  readonly VITE_HS_FORM_RESOURCE?: string;
  readonly VITE_HS_FORM_CHAT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
