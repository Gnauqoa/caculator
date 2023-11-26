import { useState } from "react";
import useHistory from "./useHistory";
import { useClipboard } from "./useClipboard";

const useCalculation = () => {
  const [calculation, setCalculation] = useState("");
  const [operator, setOperator] = useState("");
  const [storedValue, setStoredValue] = useState("");
  const { addHistory } = useHistory();
  const { copy, paste } = useClipboard();

  const handleCopy = () => copy(calculation);
  const handlePaste = () => paste(setCalculation);

  const handleNumberPress = (value: string) => {
    if (calculation === "0") {
      setCalculation(value);
    } else {
      setCalculation(calculation + value);
    }
    if (parseFloat(calculation) < 0) {
      setCalculation("-" + calculation);
    }
  };

  const handleDecimalPress = () => {
    if (!calculation.includes(".")) {
      setCalculation(calculation + ".");
    }
  };

  const handleOperatorPress = (value: string) => {
    if (value === "%") {
      const currentValue = parseFloat(calculation);
      const result = currentValue / 100;
      setCalculation(result.toString());
    } else if (value === "+/-") {
      setCalculation((parseFloat(calculation) * -1).toString());
    } else {
      setOperator(value);
      setStoredValue(calculation);
      setCalculation("0");
    }
  };

  const handleEqualsPress = () => {
    const currentValue = parseFloat(calculation);
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
    setCalculation(result.toString());
    setOperator("");
    setStoredValue("");
  };

  const handleClearPress = () => {
    setCalculation("0");
    setOperator("");
    setStoredValue("");
  };

  return {
    calculation,
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
