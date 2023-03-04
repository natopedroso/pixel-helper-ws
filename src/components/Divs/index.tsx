import React, { useEffect, useRef, useState } from "react";
import { FaRegWindowClose, FaRegWindowMaximize, FaRegWindowMinimize, FaWindowClose, FaWindowMaximize, FaWindowMinimize } from "react-icons/fa";
import { FiMaximize, FiMinimize, FiMinimize2, FiUnderline, FiX } from "react-icons/fi";
import { Colors } from "../../Constants/Colors";
import Bt from "../Bt";

interface DivRowProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: any;
}
export function View(props: DivRowProps) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        ...props?.style,
      }}
    >
      {props?.children}
    </div>
  );
}
interface ScrollViewProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: any;
  horizontal?: boolean;
  both?: boolean;
}
export function ScrollView(props: ScrollViewProps) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: props?.horizontal ? "hidden" : "auto",
        overflowX: props?.horizontal ? "auto" : "hidden",
        overflow: props?.both ? "auto" : null,
        gap: 5,
        ...props?.style,
      }}
    >
      {props?.children}
    </div>
  );
}
export function ViewRow(props: DivRowProps) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        gap: 5,
        ...props?.style,
      }}
    >
      {props?.children}
    </div>
  );
}

interface BadgeProps {
  children: number;
}
export function Badge(props: BadgeProps) {
  return (
    <div
      style={{
        display: "flex",
        // marginLeft: 0,
        width: 25,
        minWidth: 25,
        height: 25,
        fontSize: 11,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        backgroundColor: Colors.waiting,
      }}
    >
      {props?.children}
    </div>
  );
}
interface TitleBarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id?: any;
  noMini?: boolean;
  noMax?: boolean;
  noClose?: boolean;
  noIcon?: boolean;
}
interface Point {
  x: number;
  y: number;
}
