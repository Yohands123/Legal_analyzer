import { apiFetch } from "./client";
import { UploadResponse, ResultsResponse } from "../types/apiResponses";
import { AnalysisJob } from "../types/analysisJob";

export const uploadDocument = async (baseUrl: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch(`${baseUrl}/documents/upload`, {
    method: "POST",
    body: formData,
  }) as Promise<UploadResponse>;
};

export const getJobStatus = async (baseUrl: string, jobId: number) => {
  return apiFetch(`${baseUrl}/jobs/${jobId}`) as Promise<AnalysisJob>;
};

export const getResults = async (baseUrl: string, jobId: number) => {
  return apiFetch(`${baseUrl}/jobs/${jobId}/results`) as Promise<ResultsResponse>;
};
