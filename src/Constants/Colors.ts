export const Colors = {
  primary: "#050f1f",
  secondary: "#538daf",
  secondaryLight: "#83cdff",
  secondaryDark: "#052f4f",
  danger: "#611",
  dangerLight: "#955",
  waiting: "#611",
  in: "#116",
  out: "#161",
};

interface ColorProps {
  color: string;
  percentage: number;
}
class RGBProps {
  r: number;
  g: number;
  b: number;
}

export function mixColorsToCssRgb(colors: ColorProps[]) {
  let color = new RGBProps();
  colors.forEach((c) => {
    let cur_c = c.color;
    //if (isCssVar(cur_c)) cur_c = getColorFromCssVar(cur_c);

    const cur_c_rgb = isRGB(cur_c) ? toRGB(cur_c) : hexToRGB(cur_c);
    color = {
      r: (color.r ?? 0) + cur_c_rgb.r * c.percentage,
      g: (color.g ?? 0) + cur_c_rgb.g * c.percentage,
      b: (color.b ?? 0) + cur_c_rgb.b * c.percentage,
    };
  });
  return `rgb(${color.r},${color.g},${color.b})`;
}
export function mixColorsToHex(colors: ColorProps[]) {
  let color = new RGBProps();
  colors.forEach((c) => {
    let cur_c = c.color;
    //if (isCssVar(cur_c)) cur_c = getColorFromCssVar(cur_c);

    const cur_c_rgb = isRGB(cur_c) ? toRGB(cur_c) : hexToRGB(cur_c);
    color = {
      r: (color.r ?? 0) + cur_c_rgb.r * c.percentage,
      g: (color.g ?? 0) + cur_c_rgb.g * c.percentage,
      b: (color.b ?? 0) + cur_c_rgb.b * c.percentage,
    };
  });
  return `#${Math.round(color.r).toString(16)}${Math.round(color.g).toString(16)}${Math.round(color.b).toString(16)}`;
}

export function hexToRGB(val: string) {
  if (!isHex(val)) return null;
  val = val.replace("#", "");
  let color = { r: 0, g: 0, b: 0 };

  //RGB HEX
  if (val.length === 6) {
    const hex = {
      r: val.substring(0, 2),
      g: val.substring(2, 4),
      b: val.substring(4, 6),
    };
    color = {
      r: parseInt(hex.r, 16),
      g: parseInt(hex.g, 16),
      b: parseInt(hex.b, 16),
    };
    return color;
  }
  //RGB HEX 8 chars
  if (val.length === 8) {
    const hex = {
      r: val.substring(0, 2),
      g: val.substring(2, 4),
      b: val.substring(4, 6),
      a: val.substring(6, 8),
    };
    const a = parseInt(hex?.a, 16) / 255;
    color = {
      r: parseInt(hex.r, 16) * a,
      g: parseInt(hex.g, 16) * a,
      b: parseInt(hex.b, 16) * a,
    };
    return color;
  }
  //RGB HEX 3 chars
  if (val.length === 3) {
    const hex = {
      r: val.substring(0, 1),
      g: val.substring(1, 2),
      b: val.substring(2, 3),
    };
    color = {
      r: parseInt(hex.r.toString() + hex.r, 16),
      g: parseInt(hex.g.toString() + hex.g, 16),
      b: parseInt(hex.b.toString() + hex.b, 16),
    };
    return color;
  }
}
function toRGB(cssVar: string) {
  let val = cssVar.replace("rgb(", "");
  val = val.replace(")", "");
  const vals = val.split(",");
  return {
    r: parseInt(vals[0]),
    g: parseInt(vals[1]),
    b: parseInt(vals[2]),
  };
}
// function getColorFromCssVar(cssVar: string) {
//   let val = cssVar.replace("var(", "");
//   val = val.replace(")", "");

//   //val = getComputedStyle(document.documentElement).getPropertyValue(val);
//   return val;
// }
function isCssVar(val: string) {
  if (val.includes("var(")) return true;
  return false;
}
function isHex(val: string) {
  if (val.includes("#")) return true;
  return false;
}
function isRGB(val: string) {
  if (val.includes("rgb(")) return true;
  return false;
}
