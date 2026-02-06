const steps = [
  { id: "upload", label: "Upload" },
  { id: "queue", label: "Queued" },
  { id: "extract", label: "Extract text" },
  { id: "chunk", label: "Chunking" },
  { id: "analyze", label: "Scoring risks" },
  { id: "done", label: "Done" },
];

type ProgressStepsProps = {
  active: string;
};

export const ProgressSteps = ({ active }: ProgressStepsProps) => {
  return (
    <ol className="progress-steps">
      {steps.map((step) => (
        <li key={step.id} className={active === step.id ? "active" : ""}>
          {step.label}
        </li>
      ))}
    </ol>
  );
};
