import { createContext, useContext, useEffect, useState } from "react";
import { loadHistory, saveHistory } from "../api/historyApi";
import { formatDateTime } from "../utils/formatters";

export type HistoryEntry = {
  jobId: number;
  documentId: number;
  filename: string;
  risks: number;
  actions: number;
  createdAt: string;
};

type HistoryContextValue = {
  entries: HistoryEntry[];
  addEntry: (entry: HistoryEntry) => void;
  clear: () => void;
};

const HistoryContext = createContext<HistoryContextValue | null>(null);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setEntries(loadHistory());
  }, []);

  const addEntry = (entry: HistoryEntry) => {
    const next = [entry, ...entries.filter((item) => item.jobId !== entry.jobId)];
    setEntries(next);
    saveHistory(next);
  };

  const clear = () => {
    setEntries([]);
    saveHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ entries, addEntry, clear }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryStore = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) {
    throw new Error("useHistoryStore must be used within HistoryProvider");
  }
  return ctx;
};

export const formatHistoryLabel = (entry: HistoryEntry) => {
  return `${entry.filename} • ${entry.risks} risks • ${entry.actions} actions • ${formatDateTime(
    entry.createdAt
  )}`;
};
