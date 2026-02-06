import { ReactNode } from "react";

type DrawerProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Drawer = ({ title, open, onClose, children }: DrawerProps) => {
  return (
    <aside className={`drawer ${open ? "open" : ""}`}>
      <div className="drawer-header">
        <h3>{title}</h3>
        <button className="ghost-btn" type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="drawer-body">{children}</div>
    </aside>
  );
};
