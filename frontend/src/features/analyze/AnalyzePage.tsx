import { useEffect, useMemo, useState } from "react";
import { InputPanel } from "./InputPanel/InputPanel";
import { ResultsPanel } from "./ResultsPanel/ResultsPanel";
import { DetailsDrawer } from "./DetailsDrawer/DetailsDrawer";
import { useAnalyzeStore } from "../../state/analyzeStore";
import { getJobStatus, getResults, uploadDocument } from "../../api/analyzeApi";
import { mapResults } from "../../utils/mappers";
import { useHistoryStore } from "../../state/historyStore";

const stages = ["upload", "queue", "extract", "chunk", "analyze", "done"];

export const AnalyzePage = () => {
  const { state, dispatch } = useAnalyzeStore();
  const { addEntry } = useHistoryStore();
  const [file, setFile] = useState<File | null>(null);
  const [polling, setPolling] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  const apiBase = useMemo(() => state.apiBase, [state.apiBase]);

  const startStageCycle = () => {
    setStageIndex(2);
    dispatch({ type: "setStage", payload: stages[2] });
  };

  useEffect(() => {
    if (state.status !== "processing") return;
    startStageCycle();
    const timer = setInterval(() => {
      setStageIndex((prev) => {
        const next = Math.min(prev + 1, stages.length - 2);
        dispatch({ type: "setStage", payload: stages[next] });
        return next;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, [state.status, dispatch]);

  useEffect(() => {
    if (!polling || !state.jobId) return;
    const timer = setInterval(async () => {
      try {
        const job = await getJobStatus(apiBase, state.jobId);
        if (job.status === "queued") {
          dispatch({ type: "setStatus", payload: "queued" });
          dispatch({ type: "setStage", payload: "queue" });
        }
        if (job.status === "processing") {
          dispatch({ type: "setStatus", payload: "processing" });
        }
        if (job.status === "done") {
          dispatch({ type: "setStatus", payload: "done" });
          dispatch({ type: "setStage", payload: "done" });
          const results = await getResults(apiBase, state.jobId);
          const mapped = mapResults(results);
          dispatch({ type: "setResults", payload: { risks: mapped.risks, actions: mapped.actions } });
          addEntry({
            jobId: mapped.jobId,
            documentId: mapped.documentId,
            filename: mapped.filename,
            risks: mapped.risks.length,
            actions: mapped.actions.length,
            createdAt: new Date().toISOString(),
          });
          setPolling(false);
        }
        if (job.status === "failed") {
          dispatch({ type: "setStatus", payload: "failed" });
          dispatch({ type: "setError", payload: job.error || "Job failed" });
          setPolling(false);
        }
      } catch (err: any) {
        dispatch({ type: "setStatus", payload: "failed" });
        dispatch({ type: "setError", payload: err.message || "Polling failed" });
        setPolling(false);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [polling, state.jobId, apiBase, dispatch, addEntry]);

  const handleUpload = async () => {
    if (!file) return;
    dispatch({ type: "setStatus", payload: "uploading" });
    dispatch({ type: "setStage", payload: "upload" });
    dispatch({ type: "setError", payload: undefined });
    try {
      const response = await uploadDocument(apiBase, file);
      dispatch({
        type: "setJob",
        payload: {
          jobId: response.job_id,
          documentId: response.document_id,
          filename: file.name,
        },
      });
      dispatch({ type: "setStatus", payload: "queued" });
      dispatch({ type: "setStage", payload: "queue" });
      setPolling(true);
    } catch (err: any) {
      dispatch({ type: "setStatus", payload: "failed" });
      dispatch({ type: "setError", payload: err.message || "Upload failed" });
    }
  };

  return (
    <section className="analyze-layout">
      <InputPanel file={file} onFileChange={setFile} onSubmit={handleUpload} />
      <ResultsPanel />
      <DetailsDrawer />
    </section>
  );
};
