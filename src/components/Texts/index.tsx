import React, { useEffect } from "react";
import { Colors } from "../../Constants/Colors";
import { ErrorStyle, LabelStyle, TitleStyle } from "./styles";

interface TitleProps extends LabelProps {
  beh?: string;
}

export function Title(props?: TitleProps) {
  return (
    <Label {...props} style={{ ...TitleStyle, ...props?.style }}>
      {props?.children}
    </Label>
  );
}

interface ErrorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error: string;
}
export function Error(props: ErrorProps) {
  const [show, setShow] = React.useState<boolean>();
  const [msg, setMsg] = React.useState(props?.error);
  const [style, setStyle] = React.useState(ErrorStyle);

  useEffect(() => {
    if (props.error) {
      setMsg(props.error);
      setShow(true);
      setTimeout(() => {
        setStyle((s) => {
          return { ...s, opacity: 1 };
        });
      }, 100);
    } else {
      setStyle((s) => {
        return { ...s, opacity: 0 };
      });
      setTimeout(() => {
        setShow(false);
      }, 500);
    }
  }, [props.error]);
  return (
    <>
      {show ? (
        <div style={style} {...props}>
          {msg}
        </div>
      ) : null}
    </>
  );
}
interface LabelProps extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  row?: boolean;
  textBottom?: boolean;
  lightColor?: boolean;
}
export function Label(props?: LabelProps) {
  const { row, textBottom, lightColor, ...restProps } = props;
  return (
    <label
      {...restProps}
      style={{
        ...LabelStyle,
        color: lightColor ? Colors.secondaryLight : LabelStyle.color,
        flexDirection: row ? "row" : LabelStyle.flexDirection,
        alignItems: textBottom ? "end" : row ? "center" : LabelStyle.alignItems,
        ...restProps?.style,
      }}
    >
      {restProps?.children}
    </label>
  );
}
