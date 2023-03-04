import React, { useEffect, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Colors } from "../../Constants/Colors";

export interface CheckBoxProps {
  size?: number;
  checked?: boolean | any;
  readOnly?: boolean | any;
  //FUNCTIONS
  onCheck?(): void;
  onUncheck?(): void;
}

export default function CheckBox(props: CheckBoxProps) {
  const size = props?.size ?? 20;
  const [checked, setChecked] = useState<boolean>(props?.checked);
  const ref = useRef<HTMLDivElement>();

  function handleClick() {
    if (props?.readOnly) return;
    setChecked((c) => !c);
    // console.log("CHECK", checked);
    if (!checked) {
      if (props.onCheck) props?.onCheck();
    } else {
      if (props.onUncheck) props?.onUncheck();
    }
  }
  const parent: HTMLElement = ref?.current?.parentElement;
  const parent_is_label = parent?.tagName === "LABEL";
  if (parent_is_label) {
    parent.onclick = () => {
      handleClick();
    };
  }

  useEffect(() => {
    console.log(props?.checked, checked);
    if (props?.checked == checked) return;
    setChecked(props?.checked);
  }, [props?.checked]);
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "solid 1px " + Colors.secondary,
        borderRadius: 5,
        width: size,
        height: size,
        color: Colors.secondary,
        cursor: "pointer",
      }}
      onClick={
        !parent_is_label
          ? (e) => {
              handleClick();
            }
          : null
      }
    >
      {checked ? <FiCheck size={size * 0.9} /> : null}
    </div>
  );
}
