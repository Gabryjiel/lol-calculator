export function getURL(importMetaUrl: string, basePath = "") {
  return function (path: string) {
    return new URL(basePath + path, importMetaUrl);
  };
}
