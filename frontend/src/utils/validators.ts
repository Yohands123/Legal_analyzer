export const isPdf = (file: File | null) => {
  if (!file) return false;
  return file.name.toLowerCase().endsWith(".pdf");
};

export const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
