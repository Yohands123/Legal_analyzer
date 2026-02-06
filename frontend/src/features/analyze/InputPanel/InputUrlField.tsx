export const InputUrlField = () => {
  return (
    <div className="placeholder-panel">
      <input className="ghost-input" placeholder="https://example.com/terms" disabled />
      <p className="muted">URL mode will be enabled once backend supports scraping.</p>
    </div>
  );
};
