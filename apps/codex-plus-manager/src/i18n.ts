export type Language = "zh" | "en";

export function getLanguage(): Language {
  return "zh";
}

export function t(zh: string): string {
  return zh;
}

export function tf(key: string, args: Array<string | number>): string {
  return key.replace(/\{(\d+)\}/g, (match, index) => {
    const value = args[Number(index)];
    return value === undefined || value === null ? match : String(value);
  });
}

export function setLanguage(_language: Language): void {
  return;
}

export function toggleLanguage(): void {
  return;
}
