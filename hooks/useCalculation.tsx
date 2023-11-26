import { useState } from "react";
import useHistory from "./useHistory";
import { useClipboard } from "./useClipboard";

export enum Operator {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "x",
  Division = "/",
  Division100 = "%",
  ToggleSign = "+/-",
  Empty = "",
}

const useCalculation = () => {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState<Operator>(Operator.Empty);
  const [storedValue, setStoredValue] = useState("");
  const { addHistory } = useHistory();
  const { copy, paste } = useClipboard();

  const handleCopy = () => copy(display);
  const handlePaste = () => paste(setDisplay);

  const handleNumberPress = (value: string) => {
    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    if (parseFloat(display) < 0) {
      setDisplay("-" + display);
    }
  };

  const handleDecimalPress = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperatorPress = (value: Operator) => {
    if (value === Operator.Division100) {
      const currentValue = parseFloat(display);
      const result = currentValue / 100;
      setDisplay(result.toString());
    } else if (value === Operator.ToggleSign) {
      setDisplay((parseFloat(display) * -1).toString());
    } else {
      setOperator(value);
      if (operator === Operator.Empty) {
        setStoredValue(display);
        setDisplay("0");
      }
    }
  };

  const handleEqualsPress = () => {
    const currentValue = parseFloat(display);
    const storedValueFloat = parseFloat(storedValue);
    let result = 0;
    switch (operator) {
      case Operator.Addition:
        result = storedValueFloat + currentValue;
        break;
      case Operator.Subtraction:
        result = storedValueFloat - currentValue;
        break;
      case Operator.Multiplication:
        result = storedValueFloat * currentValue;
        break;
      case Operator.Division:
        result = storedValueFloat / currentValue;
        break;
      default:
        break;
    }
    addHistory({
      calculation: `${storedValue}${operator}${currentValue}`,
      result,
    });
    setDisplay(result.toString());
    setOperator(Operator.Empty);
    setStoredValue("");
  };

  const handleClearPress = () => {
    setDisplay("0");
    setOperator(Operator.Empty);
    setStoredValue("");
  };

  return {
    display:
      operator === Operator.Empty
        ? display
        : display !== "0"
        ? display
        : storedValue,
    operator,
    handleCopy,
    handlePaste,
    handleNumberPress,
    handleDecimalPress,
    handleOperatorPress,
    handleEqualsPress,
    handleClearPress,
  };
};

export default useCalculation;
