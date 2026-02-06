type TagPillsProps = {
  tags: string[];
};

export const TagPills = ({ tags }: TagPillsProps) => {
  if (!tags.length) return null;
  return (
    <div className="tag-pills">
      {tags.map((tag) => (
        <span key={tag} className="tag-pill">
          {tag}
        </span>
      ))}
    </div>
  );
};
