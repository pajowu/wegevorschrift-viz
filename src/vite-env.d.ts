/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "virtual:csv:*" {
  const content: Record;
  export default content;
}
