import React, { CSSProperties, memo, useEffect, useRef, useState } from "react";
import { ViewRow } from "../Divs";

interface DetailsProps
  extends React.DetailedHTMLProps<
    React.DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement
  > {
  summary: any;
  className?: string;
  prop?: CSSProperties;
  ms?: 500;
  mode?: CSSTransition;
  onOpen?(): void;
  onClose?(): void;
  bts?: any;
  btsLeft?: number;
}

export function DetailsComp(props: DetailsProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(props.open);
  const [overflowToggle, setOverflowToggle] = useState<boolean>(false);
  const details = useRef<HTMLDetailsElement>();
  const summary = useRef<HTMLElement>();
  const content = useRef<HTMLDivElement>();

  const [bugFix, setBugFix] = useState(false);
  const summaryHeight = summary.current?.clientHeight ?? 0;
  const [contentHeight, setcontentHeight] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setBugFix(true);
    }, 100);

    const checkSize = setInterval(() => {
      setcontentHeight(content.current.clientHeight);
    }, 100);
    return () => clearInterval(checkSize);
  }, []);
  useEffect(() => {
    if (open) {
      if (props.onOpen) props.onOpen();
      setcontentHeight(content.current.clientHeight);
      setTimeout(() => {
        setOverflowToggle(true);
      }, 500);
    } else {
      if (props.onClose) props.onClose();
      setcontentHeight(0);
      setTimeout(() => {
        setOverflowToggle(false);
      }, 500);
    }
  }, [open]);
  useEffect(() => {
    if (props.open) setOpen(true);
    else setOpen(false);
  }, [props.open]);
  useEffect(() => {
    if (!details) return;
    details.current.addEventListener("mousemove", (e) => {
      if (e?.buttons === 1) {
        console.log(content.current.clientHeight);
        setcontentHeight(content.current.clientHeight);
      }
    });
    details.current.addEventListener("keypress", (e) => {
      setcontentHeight(content.current.clientHeight);
    });
    details.current.addEventListener("keyup", (e) => {
      setcontentHeight(content.current.clientHeight);
    });
    details.current.addEventListener("click", (e) => {
      setcontentHeight(content.current.clientHeight);
    });
  }, [details, setBugFix]);
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <ViewRow
        style={{
          position: "absolute",
          left: props?.btsLeft,
          top: 0,
          zIndex: 10,
        }}
      >
        {props?.bts}
      </ViewRow>
      <details
        className={props.className}
        ref={details}
        style={{
          overflow: overflowToggle ? "visible" : "hidden",
          height: open ? summaryHeight + contentHeight : summaryHeight,
          transition: `${props.prop ?? "all"} ${props.ms ?? "500"}ms ${
            props.mode ?? "ease"
          }`,
        }}
        open={open}
        onDragOver={props?.onDragOver}
        onDrop={props?.onDrop}
      >
        <summary
          ref={summary}
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
            setTimeout(() => {
              setOpen(!open);
            }, 500);
          }}
        >
          {props.summary}
        </summary>
        <div
          ref={content}
          onClick={(e) => {
            if (props?.onClick)
              props?.onClick({} as React.MouseEvent<HTMLDetailsElement>);
          }}
          onMouseDown={(e) => {
            if (props?.onMouseDown)
              props?.onMouseDown({} as React.MouseEvent<HTMLDetailsElement>);
          }}
          style={{
            paddingTop: 5,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            ...props?.style,
          }}
        >
          {props.children}
        </div>
      </details>
    </div>
  );
}

export const Details = memo(DetailsComp);
