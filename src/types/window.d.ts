/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    kakao: { [key: string]: any };
    naver: { [key: string]: any };
  }
}

export {};
