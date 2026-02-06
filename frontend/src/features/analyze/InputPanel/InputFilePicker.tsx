import { useRef } from "react";
import { isPdf } from "../../../utils/validators";
import { useAnalyzeStore } from "../../../state/analyzeStore";

type InputFilePickerProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
};

export const InputFilePicker = ({ file, onFileChange }: InputFilePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useAnalyzeStore();

  const handleFile = (next: File | null) => {
    if (next && !isPdf(next)) {
      dispatch({ type: "setError", payload: "Only PDF files are supported." });
      return;
    }
    dispatch({ type: "setError", payload: undefined });
    onFileChange(next);
  };

  return (
    <div className="file-picker">
      <label className="dropzone" htmlFor="file-input">
        <input
          ref={inputRef}
          id="file-input"
          type="file"
          accept="application/pdf"
          onChange={(event) => handleFile(event.target.files?.[0] || null)}
        />
        <div>
          <div className="drop-title">Attach a PDF</div>
          <div className="drop-sub">Drag & drop or click to browse</div>
        </div>
      </label>
      <div className="file-meta">
        {file ? `${file.name} • ${(file.size / 1024 / 1024).toFixed(2)} MB` : "No file selected"}
      </div>
    </div>
  );
};
