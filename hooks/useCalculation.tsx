import { useState } from "react";
import useHistory from "./useHistory";
import { useClipboard } from "./useClipboard";

export enum Operator {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "x",
  Division = "/",
}

const useCalculation = () => {
  const [display, setDisplay] = useState("");
  const [operator, setOperator] = useState("");
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

  const handleOperatorPress = (value: string) => {
    if (value === "%") {
      const currentValue = parseFloat(display);
      const result = currentValue / 100;
      setDisplay(result.toString());
    } else if (value === "+/-") {
      setDisplay((parseFloat(display) * -1).toString());
    } else {
      setOperator(value);
      setStoredValue(display);
      setDisplay("0");
    }
  };

  const handleEqualsPress = () => {
    const currentValue = parseFloat(display);
    const storedValueFloat = parseFloat(storedValue);
    let result = 0;
    switch (operator) {
      case "+":
        result = storedValueFloat + currentValue;
        break;
      case "-":
        result = storedValueFloat - currentValue;
        break;
      case "x":
        result = storedValueFloat * currentValue;
        break;
      case "/":
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
    setOperator("");
    setStoredValue("");
  };

  const handleClearPress = () => {
    setDisplay("0");
    setOperator("");
    setStoredValue("");
  };

  return {
    display:
      operator === "" ? display : display !== "0" ? display : storedValue,
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
