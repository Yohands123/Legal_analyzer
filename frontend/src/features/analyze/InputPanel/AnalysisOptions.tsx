import { useState } from "react";
import { useAnalyzeStore } from "../../../state/analyzeStore";

export const AnalysisOptions = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAnalyzeStore();

  return (
    <div className="options-panel">
      <button className="ghost-btn" type="button" onClick={() => setOpen((v) => !v)}>
        Advanced options
      </button>
      {open && (
        <div className="options-grid">
          <label>
            <span>API Base URL</span>
            <input
              className="ghost-input"
              value={state.apiBase}
              onChange={(event) => {
                const value = event.target.value;
                dispatch({ type: "setApiBase", payload: value });
                localStorage.setItem("legal_api_base", value);
              }}
            />
          </label>
          <label>
            <span>Output</span>
            <select className="ghost-input" defaultValue="both">
              <option value="both">Risks + Actions</option>
              <option value="risks">Risks only</option>
              <option value="actions">Actions only</option>
            </select>
          </label>
          <label>
            <span>Strictness</span>
            <select className="ghost-input" defaultValue="balanced">
              <option value="balanced">Balanced</option>
              <option value="conservative">Conservative</option>
              <option value="sensitive">High sensitivity</option>
            </select>
          </label>
          <label>
            <span>Model</span>
            <select className="ghost-input" defaultValue="auto">
              <option value="auto">Auto</option>
              <option value="openai">OpenAI</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
};
