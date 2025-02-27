// import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// ----------------------------------------------------------------------
interface StateProps {
  unitRate: null | number;
  symbol: null | string;
}
const formatNumber = (number: number, symbol: string, unitRate: number) => {
  const converted = `${symbol} ${(number * Number(unitRate)).toLocaleString(
    undefined,
    { maximumFractionDigits: 1 }
  )}`;
  return converted;
};

export default function ConvertCurrency(number: number) {
  // const { locales } = useRouter();
  // type error
  const { symbol, unitRate } = useSelector(
    ({ settings }: { settings: any }) => settings
  );
  const [state, setstate] = useState<StateProps>({
    unitRate: null,
    symbol: null,
  });

  useEffect(() => {
    setstate((oldstate) => ({ ...oldstate, unitRate, symbol }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitRate]);

  return formatNumber(number, state.symbol as string, state.unitRate as number);
}
