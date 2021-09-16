declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_PAGE_URL: string;
      NEXT_PUBLIC_LOGIN_PAGE_URL: string;
    }
  }
}

export {};
