import { ResultsResponse } from "../types/apiResponses";

export const mapResults = (data: ResultsResponse) => {
  return {
    jobId: data.job_id,
    documentId: data.document_id,
    filename: data.filename,
    risks: data.risks ?? [],
    actions: data.actions ?? [],
  };
};
