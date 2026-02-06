import { useState } from "react";
import { Tabs } from "../../../components/Tabs";
import { InputFilePicker } from "./InputFilePicker";
import { InputTextArea } from "./InputTextArea";
import { InputUrlField } from "./InputUrlField";
import { AnalysisOptions } from "./AnalysisOptions";
import { SubmitBar } from "./SubmitBar";
import { ProgressSteps } from "./ProgressSteps";
import { useAnalyzeStore } from "../../../state/analyzeStore";

type InputPanelProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
};

export const InputPanel = ({ file, onFileChange, onSubmit }: InputPanelProps) => {
  const [tab, setTab] = useState("upload");
  const { state } = useAnalyzeStore();

  return (
    <aside className="panel panel-input">
      <div className="panel-header">
        <h2>Input + Options</h2>
        <p className="muted">
          Drop in a PDF to extract risks and actions with citations.
        </p>
      </div>
      <Tabs
        options={[
          { id: "upload", label: "Upload" },
          { id: "paste", label: "Paste" },
          { id: "url", label: "URL" },
        ]}
        value={tab}
        onChange={setTab}
      />
      <div className="panel-body">
        {tab === "upload" && <InputFilePicker file={file} onFileChange={onFileChange} />}
        {tab === "paste" && <InputTextArea />}
        {tab === "url" && <InputUrlField />}
      </div>
      <AnalysisOptions />
      <SubmitBar status={state.status} onSubmit={onSubmit} disabled={!file} />
      <ProgressSteps active={state.stage} />
    </aside>
  );
};
