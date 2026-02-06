import { Drawer } from "../../../components/Drawer";
import { useAnalyzeStore } from "../../../state/analyzeStore";
import { DetailHeader } from "./DetailHeader";
import { DetailBody } from "./DetailBody";
import { EvidenceList } from "./EvidenceList";
import { CopyExportButtons } from "./CopyExportButtons";

export const DetailsDrawer = () => {
  const { state, dispatch } = useAnalyzeStore();
  const open = Boolean(state.selected);

  return (
    <Drawer
      title="Evidence"
      open={open}
      onClose={() => dispatch({ type: "setSelected", payload: null })}
    >
      {!state.selected && (
        <p className="muted">Select a risk or action item to see evidence.</p>
      )}
      {state.selected && (
        <div className="detail-stack">
          <DetailHeader item={state.selected} />
          <DetailBody item={state.selected} />
          <EvidenceList item={state.selected} />
          <CopyExportButtons />
        </div>
      )}
    </Drawer>
  );
};
