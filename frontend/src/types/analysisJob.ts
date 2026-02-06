export type AnalysisJob = {
  id: number;
  document_id: number;
  status: "queued" | "processing" | "done" | "failed";
  error?: string | null;
};
