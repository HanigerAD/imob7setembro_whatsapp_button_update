function isFalse(value: any): Boolean {
  return value === "false" || value === false || value === "0" || value === 0
}

function isTrue(value: any): Boolean {
  return value === "true" || value === true || value === "1" || value === 1
}

export function converterStringParaBoolean(str: any): Number | Boolean | null {
  let value = null;

  if (isFalse(str)) {
    value = 0;
  }

  if (isTrue(str)) {
    value = 1;
  }

  return value;
}

export function converterBooleanParaString(
  bln: any
): string {
  let value = "";

  if (isFalse(bln)) {
    value = "false";
  }

  if (isTrue(bln)) {
    value = "true";
  }

  return value;
}

export function converterParaMoeda(value: string, comDecimal = true) {
  let str = value.replace(/\D/g, "");

  if (comDecimal) {
    return str.replace(/(\d)(\d{2})$/, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g, ".");
  } else {
    return str.slice(0, str.length - 2).split(/(?=(?:...)*$)/).join(".");
  }
}

export function converterMoedaParaNumero(value: string) {
  if (!value) {
    return '0.00';
  } else {
    return value
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1.$2");
  }
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

export function converterParaTelefone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{1})(\d{8})/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}
