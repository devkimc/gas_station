/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    kakao: { [key: string]: any };
    Kakao: { [key: string]: any };
  }
}

export {};
