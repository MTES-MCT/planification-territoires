export function prettifyNumber(number: number) {
  if (Number.isFinite(number)) {
    let suffix = "";
    if (number > 10e6) {
      number /= 1e6;
      suffix = " M";
    } else if (number > 10000) {
      number /= 1000;
      suffix = " K";
    }
    return `${number.toLocaleString("fr-FR", {
      maximumFractionDigits: 2,
    })}${suffix}`;
  }
  return "";
}

export function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(max, x));
}
