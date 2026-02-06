import { AnalyzeStatus } from "../../../state/analyzeStore";
import { ErrorBanner } from "../../../components/ErrorBanner";
import { useAnalyzeStore } from "../../../state/analyzeStore";

type SubmitBarProps = {
  status: AnalyzeStatus;
  onSubmit: () => void;
  disabled: boolean;
};

export const SubmitBar = ({ status, onSubmit, disabled }: SubmitBarProps) => {
  const { state } = useAnalyzeStore();
  const label =
    status === "uploading"
      ? "Uploading..."
      : status === "processing"
        ? "Processing..."
        : "Analyze Document";

  return (
    <div className="submit-bar">
      {state.error && <ErrorBanner message={state.error} />}
      <button className="primary-btn" type="button" onClick={onSubmit} disabled={disabled}>
        {label}
      </button>
      <div className="status-pill">
        <span>Status</span>
        <strong>{status}</strong>
      </div>
    </div>
  );
};
