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
  Sin = "sin",
  Cos = "cos",
  Tan = "tan",
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
  const handleTrigPress = (trigFunction: Operator) => {
    const currentValue = parseFloat(display);
    let result = 0;
    switch (trigFunction) {
      case Operator.Sin:
        result = Math.sin(currentValue);
        break;
      case Operator.Cos:
        result = Math.cos(currentValue);
        break;
      case Operator.Tan:
        result = Math.tan(currentValue);
        break;
      default:
        break;
    }
    setDisplay(result.toString());
  };

  const handleLogPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.log10(currentValue);
    setDisplay(result.toString());
  };

  const handleLnPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.log(currentValue);
    setDisplay(result.toString());
  };

  const handleInversePress = () => {
    const currentValue = parseFloat(display);
    const result = 1 / currentValue;
    setDisplay(result.toString());
  };

  const handleExponentialPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.exp(currentValue);
    setDisplay(result.toString());
  };

  const handleSquarePress = () => {
    const currentValue = parseFloat(display);
    const result = Math.pow(currentValue, 2);
    setDisplay(result.toString());
  };

  const handlePowerPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.pow(currentValue, parseFloat(storedValue));
    setDisplay(result.toString());
  };
  const handleAbsolutePress = () => {
    const currentValue = parseFloat(display);
    const result = Math.abs(currentValue);
    setDisplay(result.toString());
  };

  const handlePiPress = () => {
    setDisplay(Math.PI.toString());
  };

  const handleEPress = () => {
    setDisplay(Math.E.toString());
  };
  const handleRadPress = () => {
    const currentValue = parseFloat(display);
    const result = currentValue * (Math.PI / 180); // Convert degrees to radians
    setDisplay(result.toString());
  };

  const handleSquareRootPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.sqrt(currentValue);
    setDisplay(result.toString());
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
    handleTrigPress,
    handleLogPress,
    handleLnPress,
    handleInversePress,
    handleExponentialPress,
    handleSquarePress,
    handlePowerPress,
    handleAbsolutePress,
    handlePiPress,
    handleEPress,
    handleRadPress,
    handleSquareRootPress,
  };
};

export default useCalculation;
