export function converterStringParaBoolean(str: string): Boolean | null {
  let value = null;

  if (str === "true" || str == "false") {
    value = JSON.parse(str);
  }

  return value;
}

export function converterBooleanParaString(
  bln: Boolean | number | null
): string {
  let value = "";

  if (bln === false || bln === 0) {
    value = "false";
  }

  if (bln === true || bln === 1) {
    value = "true";
  }

  return value;
}

export function converterParaMoeda(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
}

export function converterParaCep(value: string) {
  return value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
}

export function converterParaCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
}
