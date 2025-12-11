/// <reference types="vite/client" />

declare module "*.css" {
  const content: { readonly [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.json" {
  const value: unknown;
  export default value;
}
