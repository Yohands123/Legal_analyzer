import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Card = ({ children, className = "", onClick }: CardProps) => {
  return (
    <div className={`card ${className}`.trim()} onClick={onClick}>
      {children}
    </div>
  );
};
