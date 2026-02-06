import { createContext, useContext, useReducer } from "react";
import { ActionItem } from "../types/actionItem";
import { Risk } from "../types/risk";

export type AnalyzeStatus = "idle" | "uploading" | "queued" | "processing" | "done" | "failed";

export type SelectedItem =
  | { type: "risk"; item: Risk }
  | { type: "action"; item: ActionItem }
  | null;

export type AnalyzeState = {
  apiBase: string;
  status: AnalyzeStatus;
  stage: string;
  jobId?: number;
  documentId?: number;
  filename?: string;
  risks: Risk[];
  actions: ActionItem[];
  error?: string;
  selected: SelectedItem;
};

type AnalyzeAction =
  | { type: "setApiBase"; payload: string }
  | { type: "setStatus"; payload: AnalyzeStatus }
  | { type: "setStage"; payload: string }
  | { type: "setJob"; payload: { jobId: number; documentId: number; filename: string } }
  | { type: "setResults"; payload: { risks: Risk[]; actions: ActionItem[] } }
  | { type: "setError"; payload?: string }
  | { type: "setSelected"; payload: SelectedItem };

const initialState: AnalyzeState = {
  apiBase: localStorage.getItem("legal_api_base") || "http://localhost:8000/api",
  status: "idle",
  stage: "upload",
  risks: [],
  actions: [],
  selected: null,
};

const reducer = (state: AnalyzeState, action: AnalyzeAction): AnalyzeState => {
  switch (action.type) {
    case "setApiBase":
      return { ...state, apiBase: action.payload };
    case "setStatus":
      return { ...state, status: action.payload };
    case "setStage":
      return { ...state, stage: action.payload };
    case "setJob":
      return {
        ...state,
        jobId: action.payload.jobId,
        documentId: action.payload.documentId,
        filename: action.payload.filename,
      };
    case "setResults":
      return { ...state, risks: action.payload.risks, actions: action.payload.actions };
    case "setError":
      return { ...state, error: action.payload };
    case "setSelected":
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

const AnalyzeContext = createContext<{
  state: AnalyzeState;
  dispatch: React.Dispatch<AnalyzeAction>;
} | null>(null);

export const AnalyzeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AnalyzeContext.Provider value={{ state, dispatch }}>{children}</AnalyzeContext.Provider>;
};

export const useAnalyzeStore = () => {
  const ctx = useContext(AnalyzeContext);
  if (!ctx) {
    throw new Error("useAnalyzeStore must be used within AnalyzeProvider");
  }
  return ctx;
};
