// global.d.ts
export {}

declare global {
  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?:    () => Promise<void>
  }
  interface Document {
    webkitExitFullscreen?:   () => Promise<void>
    msExitFullscreen?:       () => Promise<void>
  }
}
