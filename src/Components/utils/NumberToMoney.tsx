
import { ReactNode } from "react";
export const numberToMoney = (value: number | string | null): ReactNode => {
  if (!value) return 0;

  let intValue = value.toString().replace(/[^0-9.]/g, "");
  const parts = intValue.split(".");
  if (parts.length > 2) {
    intValue = parts[0] + "." + parts.slice(1).join("");
  }

  const [integerPart, decimalPart] = intValue.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <span>
      {formattedInteger}
      {decimalPart !== undefined && (
        <span className="text-xs align-center">.{decimalPart}</span>
      )}
    </span>
  );
};
