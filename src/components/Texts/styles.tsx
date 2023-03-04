import { CSSProperties } from "react";
import { Colors } from "../../Constants/Colors";

export const TitleStyle: CSSProperties = {
  fontSize: 30,
  userSelect: "none",
};

export const ErrorStyle: CSSProperties = {
  fontSize: 14,
  opacity: 0,
  borderRadius: 5,
  padding: 5,
  backgroundColor: Colors.danger,
  transition: "all 500ms ease",
};

export const LabelStyle: CSSProperties = {
  paddingTop: 5,
  color: Colors.secondary,
  display: "flex",
  flexDirection: "column",
  fontSize: 20,
  gap: 5,
};
