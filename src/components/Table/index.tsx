import React, { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { mixColorsToHex } from "../../Constants/Colors";
import { TdStyle, ThStyle, TrStyle } from "./styles";

export default function Table(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >,
) {
  return (
    <table {...props} style={{ width: "100%", ...props.style }}>
      {props.children}
    </table>
  );
}
export function THead(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >,
) {
  return (
    <thead
      {...props}
      style={{ position: "sticky", top: 0, zIndex: 200, ...props.style }}
    >
      {props.children}
    </thead>
  );
}
export function TRH(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >,
) {
  return (
    <tr {...props} style={{ whiteSpace: "nowrap", ...props.style }}>
      {props.children}
    </tr>
  );
}

interface TrProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  selected?: boolean | any;
}
export function Tr(props: TrProps) {
  const [hover, setHover] = useState(false);
  return (
    <tr
      {...props}
      style={
        hover || props?.selected
          ? {
              ...TrStyle,
              ...props.style,
              backgroundColor: props?.style?.backgroundColor
                ? mixColorsToHex([
                    { color: `#fff`, percentage: 0.2 },
                    { color: props?.style?.backgroundColor, percentage: 0.8 },
                  ])
                : `#fff2`,
            }
          : {
              ...TrStyle,
              ...props.style,
            }
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.children}
    </tr>
  );
}

interface TdProps
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  > {
  colSpan?: number;
}
export function Td(props: TdProps) {
  const [hover, setHover] = useState(false);
  return (
    <td
      {...props}
      style={
        hover
          ? {
              ...TdStyle,
              backgroundColor: `#fff2`,
              ...props.style,
            }
          : { ...TdStyle, ...props.style }
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.children}
    </td>
  );
}

interface ThProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  > {
  selected?: string;
  direction?: "ASC" | "DESC";
}

export function Th(props: ThProps) {
  const [hover, setHover] = useState(false);
  return (
    <td
      {...props}
      style={
        hover
          ? {
              ...ThStyle,
              backgroundColor: `var(--secondaryDark)`,
              color: `var(--secondary)`,
              ...props.style,
            }
          : { ...ThStyle, ...props.style }
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.children}
      {props.id === props?.selected && props?.id ? (
        <>{props?.direction === "ASC" ? <FiArrowDown /> : <FiArrowUp />}</>
      ) : null}
    </td>
  );
}
