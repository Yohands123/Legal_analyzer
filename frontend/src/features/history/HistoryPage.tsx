import { HistoryList } from "./HistoryList";

export const HistoryPage = () => {
  return (
    <section className="history-page">
      <div className="panel panel-results">
        <h2>History</h2>
        <p className="muted">Recent analyses stored locally in your browser.</p>
        <HistoryList />
      </div>
    </section>
  );
};
