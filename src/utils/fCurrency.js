import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

// ----------------------------------------------------------------------
const locale = "en-US";
export default function FCurrency(number) {
  const { currency: selected } = useSelector((state) => state.settings);
  const [state, setstate] = useState({
    selected: "USD",
  });

  useEffect(() => {
    setstate((oldstate) => ({ ...oldstate, selected }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: state.selected,
  });

  return currency.format(number).slice(0, -1);
}
