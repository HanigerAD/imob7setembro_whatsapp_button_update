export function converterStringParaBoolean(str: string): Boolean | null {
  let value = null;

  if (str === "true" || str == "false") {
    value = JSON.parse(str);
  }

  return value;
}

export function converterBooleanParaString(bln: Boolean | null): string {
  let value = "";

  if (bln === true || bln == false) {
    value = `${bln}`;
  }

  return value;
}
