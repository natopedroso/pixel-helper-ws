import { Dialog as MuiDialog, DialogProps as MuiDialogProps } from "@mui/material";
import React from "react";
import "./material.css";

//@ts-ignore
interface ModalProps extends MuiDialogProps {
  children?: any;
  visible: boolean;
  open?: boolean;
}

export function Modal(props: ModalProps) {
  return (
    <MuiDialog {...props} open={props?.visible}>
      <div style={{ ...props.style, padding: 10 }}>{props?.children}</div>
    </MuiDialog>
  );
}
