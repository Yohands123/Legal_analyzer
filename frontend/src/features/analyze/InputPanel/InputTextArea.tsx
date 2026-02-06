export const InputTextArea = () => {
  return (
    <div className="placeholder-panel">
      <textarea
        className="ghost-input"
        placeholder="Paste legal text here..."
        disabled
      />
      <p className="muted">Paste mode will be enabled once backend accepts raw text.</p>
    </div>
  );
};
