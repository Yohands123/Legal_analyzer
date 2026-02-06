export const PageHeader = () => {
  return (
    <header className="page-header">
      <div>
        <h1>Legal Lens</h1>
        <p className="muted">Document-to-decisions dashboard</p>
      </div>
      <div className="header-actions">
        <button className="ghost-btn" type="button">
          Export
        </button>
        <button className="primary-btn" type="button">
          New Analysis
        </button>
      </div>
    </header>
  );
};
