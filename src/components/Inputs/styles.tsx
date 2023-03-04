import { CSSProperties } from "react";

export const ControlStyle: CSSProperties = {
  borderRadius: "5px",
  padding: "5px",
  paddingTop: "6.5px",
  paddingBottom: "6px",
  border: "solid 1px currentColor",
  backgroundColor: "transparent",
  fontSize: 14,
  outlineColor: "currentColor",
};
export const FontStyle: CSSProperties = {
  backgroundColor: "transparent",
  fontSize: 14,
  outlineColor: "currentColor",
};

export const InputGroupStyle: CSSProperties = {
  padding: 0,
  backgroundColor: "transparent",
  fontSize: 14,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

export const ComboBoxItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  borderRadius: "50px",
  padding: "5px",
  backgroundColor: " var(--secondary)",
  fontSize: 14,
  color: `var(--primary)`,
  cursor: "pointer",
  transition: "all 500ms ease",
  userSelect: "none",
};
