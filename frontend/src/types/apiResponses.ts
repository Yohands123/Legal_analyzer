import { ActionItem } from "./actionItem";
import { Risk } from "./risk";

export type UploadResponse = {
  ok: boolean;
  document_id: number;
  job_id: number;
  status: string;
  poll: string;
  results: string;
};

export type ResultsResponse = {
  job_id: number;
  document_id: number;
  status: string;
  filename: string;
  risks: Risk[];
  actions: ActionItem[];
};
