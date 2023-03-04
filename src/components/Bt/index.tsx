import React, { useState } from "react";
import { Colors, mixColorsToHex } from "../../Constants/Colors";
import { View } from "../Divs";
import { BtStyle, BtTabStyle } from "./styles";

export interface BtProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  bg1?: string;
  bg2?: string;
  tooltip?: string;
  tooltipLeft?: boolean;
  tooltipBottom?: boolean;
  selected?: boolean | any;
  badge?: number;
  icon?: any;
}

export default function Bt(_props: BtProps) {
  const [hover, setHover] = useState(false);
  const { bg1, bg2, tooltip, tooltipBottom, tooltipLeft, ...props } = _props;
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const disabled = props?.disabled;
  return (
    <button
      {...props}
      style={
        hover || props?.selected
          ? {
              ...BtStyle,
              backgroundColor: bg2 ?? `var(--secondaryDark)`,
              color: `var(--secondary)`,
              ...props.style,
            }
          : {
              ...BtStyle,
              ...props.style,
              opacity: disabled ? 0.6 : 1,
              WebkitFilter: disabled ? "grayscale(100%)" : "none",
              backgroundColor: bg1 ?? BtStyle.backgroundColor,
            }
      }
      onMouseDown={(e) => {
        if (props?.onMouseDown) props.onMouseDown(e);
      }}
      onMouseEnter={(e) => {
        setHover(true);
        console.log(e.clientX, e.clientY);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (props?.onClick) props?.onClick(e);
      }}
      disabled={disabled}
    >
      <div
        style={{
          position: "fixed",
          // maxWidth: hover && tooltip ? 200 : 0,
          // minWidth: hover && tooltip ? 150 : 0,
          //bottom: hover && tooltip && tooltipBottom ? "75%" : "none",
          top: tooltipPosition.y, //hover && tooltip && !tooltipBottom ? "75%" : "none",
          left: tooltipPosition.x, //</button>hover && tooltip && !tooltipLeft ? "75%" : "none",
          //right: hover && tooltip && tooltipLeft ? "75%" : "none",
          transform: `translate(${tooltipLeft ? "-100%" : 0},${tooltipBottom ? "-105%" : "0%"})`,
          padding: 5,
          backgroundColor: mixColorsToHex([
            { color: bg1 ?? Colors.secondary, percentage: 0.5 },
            { color: "#fff", percentage: 0.5 },
          ]),
          borderRadius: 10,
          borderBottomLeftRadius: tooltip && !tooltipLeft && tooltipBottom ? 0 : "none",
          borderBottomRightRadius: tooltip && tooltipLeft && tooltipBottom ? 0 : "none",
          borderTopLeftRadius: tooltip && !tooltipLeft && !tooltipBottom ? 0 : "none",
          borderTopRightRadius: tooltip && tooltipLeft && !tooltipBottom ? 0 : "none",
          color: Colors.primary,
          fontSize: 11,
          textAlign: "center",
          opacity: hover && tooltip ? 1 : 0,
          zIndex: hover && tooltip ? 10000 : -100,

          boxShadow: "10x 10px 10px rgba(0,0,0,0.7)",
          WebkitBoxShadow: "0px 0px 10px rgba(0,0,0,0.7)",
          pointerEvents: "none",
          transition: "opacity 500ms ease",
        }}
      >
        {tooltip}
      </div>
      {props.children}
      {props?.badge ? (
        <div
          style={{
            // position: "absolute",
            float: "right",
            display: "flex",
            // right: 10,
            // top: 10,
            minWidth: 25,
            minHeight: 25,
            fontSize: 11,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100%",
            backgroundColor: Colors.waiting,
          }}
        >
          {props?.badge}
        </div>
      ) : null}
    </button>
  );
}

export function BtTab(_props: BtProps) {
  const [hover, setHover] = useState(false);
  const { bg1, bg2, ...props } = _props;
  const Icon = props?.icon;

  const disabled = props?.disabled;
  return (
    <button
      {...props}
      style={{
        ...BtTabStyle,
        ...props?.style,
        opacity: disabled ? 0.6 : 1,
        backgroundColor: !props.selected ? bg1 ?? Colors.secondaryDark : bg2 ?? Colors.primary,
        borderBottomWidth: !props.selected ? 1 : 0,
        borderBottomColor: Colors.secondary,
        color: Colors.secondary,
        cursor: "pointer",
      }}
      onClick={(e) => {
        if (props?.onClick) props?.onClick(e);
      }}
      disabled={disabled}
    >
      {Icon ? Icon() : null}
      {props.children}
    </button>
  );
}

export interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: any;
}
export function Tabs(props?: TabsProps) {
  return (
    <div
      style={{
        display: "flex",
        maxHeight: 44,
        width: "100%",
        alignItems: "flex-end",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      <div
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: Colors.secondary,
        }}
      ></div>
      {props?.children}
      <div
        style={{
          flex: 1,
          borderBottomStyle: "solid",
          borderBottomWidth: 1,
          borderBottomColor: Colors.secondary,
        }}
      ></div>
    </div>
  );
}

export function TabPage({ children }) {
  return (
    <View
      style={{ flex: 1, width: "100%", display: "flex" }}
      // from={{ opacity: 0, top: 20 }}
      // animate={{ opacity: 1, top: 0 }}
      // exit={{ opacity: 0 }}
      // transition={{ type: "spring" }}
    >
      {children}
    </View>
  );
}
