import { CSSProperties } from "react";
import { Colors } from "../../Constants/Colors";

export const BtStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
  border: "none",
  borderRadius: "50px",
  padding: "12px",
  backgroundColor: " var(--secondary)",
  fontSize: 16,
  color: `var(--primary)`,
  cursor: "pointer",
  transition: "all 500ms ease",
  userSelect: "none",
  overflow: "visible",
};

export const BtTabStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  paddingBlock: 8,
  paddingInline: 13,
  paddingBottom: 7,
  backgroundColor: Colors.secondary,
  color: Colors.secondaryDark,
};
