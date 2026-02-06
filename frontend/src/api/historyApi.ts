import { HistoryEntry } from "../state/historyStore";

const STORAGE_KEY = "legal_history";

export const loadHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveHistory = (entries: HistoryEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 20)));
};
