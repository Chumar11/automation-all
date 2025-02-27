import { replace } from "lodash";
import numeral from "numeral";

// ----------------------------------------------------------------------

const locale = "en-US";
// const selectedCurrency = process.env.REACT_APP_CURRENCY;
export function fCurrency(number) {
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: process.env.CURRENCY,
  });

  return currency.format(number).slice(0, -1);
}

export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number) {
  return numeral(number).format("0.0 b");
}
