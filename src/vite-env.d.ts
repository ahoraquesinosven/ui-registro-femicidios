/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_AQSNV_SERVER: string
  readonly VITE_API_AQSNV_CLIENT_ID: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
