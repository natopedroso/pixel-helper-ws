import { Autocomplete, autocompleteClasses, AutocompleteProps, createTheme, Popper, Slider, SliderProps, styled, TextField, TextFieldProps, ThemeProvider } from "@mui/material";
import { memo, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Colors } from "../../Constants/Colors";
import { ControlStyle, FontStyle, InputGroupStyle } from "./styles";

import "./material.css";
import { DatePicker, DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";

import ReactAutoTextArea, { TextareaAutosizeProps } from "react-textarea-autosize";
import React from "react";

import $ from "jquery";
import "jquery-mask-plugin";
import { ViewRow } from "../Divs";

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  uppercase?: boolean;
  refreshOnBlur?: boolean;
}

export default function Input(props: InputProps) {
  const [value, setValue] = useState(props?.value);
  const [defaultValue, setDefaultValue] = useState(props?.defaultValue);
  const [isFocus, setIsfocus] = useState(false);
  const ref = React.useRef<HTMLInputElement>();

  const valueOrDefaultValue = value ? { value } : { defaultValue };

  React.useEffect(() => {
    if (!ref?.current?.setSelectionRange) return;
    ref?.current?.setSelectionRange(0, ref?.current?.value?.length);
  }, [ref]);

  React.useEffect(() => {
    if (props?.refreshOnBlur && isFocus) return;
    console.log("INPUT CHANGE");
    setValue(props?.value);
  }, [props?.value]);
  React.useEffect(() => {
    if (props?.refreshOnBlur && isFocus) return;
    setDefaultValue(props?.defaultValue);
  }, [props?.defaultValue]);
  return (
    <input
      ref={ref}
      {...props}
      {...valueOrDefaultValue}
      style={{
        ...ControlStyle,
        fontSize: props?.type === "number" ? 26 : null,
        ...props?.style,
      }}
      onFocus={(e) => {
        setTimeout(() => {
          if (props.onFocus) props.onFocus(e);
          setIsfocus(true);
          const sender = e.target;
          if (sender.type === "number" && props?.autoFocus) {
            sender.type = "text";
            sender.setSelectionRange(0, sender.value.length);
            sender.type = "number";
          }
        }, 1);
      }}
      onBlur={(e) => {
        if (props?.onBlur) props.onBlur(e);
        setIsfocus(false);
      }}
      onChange={(e) => {
        if (props.uppercase) e.target.value = e.target.value.toLocaleUpperCase();
        if (props.refreshOnBlur) setValue(e.target.value);
        if (props.onChange) props.onChange(e);
      }}
    />
  );
}

export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  mask: string;
}

export function InputMask(props: InputMaskProps): JSX.Element {
  /**
   *  VARS
   */
  const ref = React.useRef();
  /**
   * EFFECTs
   */
  React.useEffect(() => {
    $(ref.current).mask(props.mask ?? "");
  }, []);

  React.useEffect(() => {
    $(ref.current).trigger("input");
  });

  return <input {...props} ref={ref} style={{ ...ControlStyle, ...props?.style }} />;
}

interface AutoTextAreaProps extends TextareaAutosizeProps, React.RefAttributes<HTMLTextAreaElement> {
  style?: React.CSSProperties | any;
}
export function AutoTextArea(props: AutoTextAreaProps) {
  return <ReactAutoTextArea {...props} style={{ ...ControlStyle, ...props?.style }} />;
}

interface TextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  style?: React.CSSProperties;
}
export function Textarea(props: TextAreaProps) {
  return <textarea {...props} style={{ ...ControlStyle, ...props?.style }} />;
}

//@ts-ignore
export interface InputDateTimeProps extends DateTimePickerProps<TInputDate, TDate> {
  renderInput?(props: TextFieldProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  value?: any;
  refe?: any;
}

export const InputDateTime = memo((props: InputDateTimeProps) => {
  const ref = useRef();

  return (
    <div style={{ minWidth: 250 }}>
      {/* @ts-ignore */}
      <DateTimePicker
        {...props}
        renderInput={(ps) => <TextField {...ps} />}
        onChange={(d, k) => {
          const roundedMinutes = Math.round(d.$d.getMinutes() / 5) * 5;
          d.$d.setMinutes(roundedMinutes);
          if (props?.onChange) props.onChange(d, k);
        }}
      />
    </div>
  );
});

//@ts-ignore
export interface InputDateProps extends DateTimePickerProps<TInputDate, TDate> {
  renderInput?(props: TextFieldProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  value?: any;
}

export function InputDate(props: InputDateProps) {
  //@ts-ignore
  return <DatePicker {...props} renderInput={(ps) => <TextField {...ps} readOnly />} />;
}

//@ts-ignore
export interface ComboBoxProps extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  expandWidth?: boolean;
  ignoreEditingByPass?: boolean;
}
export function ComboBox(
  // eslint-disable-next-line no-shadow
  _props: ComboBoxProps
) {
  const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
      // boxSizing: "border-box",
      backgroundColor: Colors.secondary,
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      [`& .${autocompleteClasses.option}`]: {
        color: Colors.secondary,
      },
    },
  });

  const { options: _options, expandWidth, ...props } = _props;
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<any>(props?.value);
  const [options, setOptions] = useState<any>(_options);

  React.useEffect(() => {
    if (editing && !props?.ignoreEditingByPass) return;
    setValue(props?.value);
  }, [props?.value, editing, props?.ignoreEditingByPass]);
  React.useEffect(() => {
    if (editing && !props?.ignoreEditingByPass) return;
    setOptions(_options);
  }, [_options, editing, props?.ignoreEditingByPass]);

  return (
    <Autocomplete
      {...{ ...props }}
      onFocus={(e) => {
        if (props?.onFocus) props?.onFocus(e);
        setEditing(true);
      }}
      onBlur={(e) => {
        if (props?.onBlur) props?.onBlur(e);
        setEditing(false);
      }}
      value={value}
      options={options}
      PopperComponent={StyledPopper}
    />
  );
}

interface ComboBoxItemProps extends React.HTMLAttributes<HTMLLIElement> {
  bg1?: string;
  bg2?: string;
}

export function ComboBoxItem(props: ComboBoxItemProps) {
  const [hover, setHover] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    //@ts-ignore
    <div
      {...props}
      //
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        //@ts-ignore
        props.onClick(e);
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

export function InputComboBox(props: TextFieldProps) {
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiAutocomplete: {
            defaultProps: {
              style: { borderColor: Colors.secondary },
              ListboxProps: {
                style: { backgroundColor: "transparent", padding: 0 },
              },
            },
          },
          MuiIconButton: {
            defaultProps: {
              style: { color: Colors.secondary },
            },
          },
        },
      })}
    >
      <TextField
        {...props}
        variant="outlined"
        InputProps={{
          ...props.InputProps,
          style: {
            border: `solid 1px ${Colors.secondary}`,
            padding: 5,
          },
        }}
        inputProps={{
          ...props.inputProps,
          style: { padding: 0, ...FontStyle, color: Colors.secondary },
        }}
      />
    </ThemeProvider>
  );
}

export interface sliderProps extends SliderProps {
  nada?: string;
}

export function InputSlider(_props: sliderProps) {
  const { nada, ...props } = _props;
  return (
    <ThemeProvider
      theme={createTheme({
        components: {
          MuiAutocomplete: {
            defaultProps: {
              style: { borderColor: Colors.secondary },
            },
          },
          MuiSlider: {
            defaultProps: {
              style: { color: Colors.secondary },
            },
          },
        },
      })}
    >
      <ViewRow style={{ paddingInline: 15, paddingRight: 25 }}>
        <Slider {...props} />
      </ViewRow>
    </ThemeProvider>
  );
}

interface InputSeachProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  expandWidth?: boolean;
}

export function InputSearch(_props: InputSeachProps) {
  const { expandWidth, ...props } = _props;
  return (
    <div style={{ ...InputGroupStyle, width: expandWidth ? "100%" : null }}>
      <FiSearch size={17} style={ControlStyle} />
      <input
        {...{ ...props }}
        style={{
          ...ControlStyle,
          ...props?.style,
          width: expandWidth ? "100%" : null,
        }}
      />
    </div>
  );
}
