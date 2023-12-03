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
  Power = "x^y",
}

const useCalculation = () => {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState<Operator>(Operator.Empty);
  const [storedValue, setStoredValue] = useState("");
  const { addHistory } = useHistory();
  const { copy, paste } = useClipboard();
  const handleDelete = () => {
    setDisplay(display.slice(0, -1));
  };
  const handleCopy = () => copy(display);
  const handlePaste = () => paste(setDisplay);
  const handleCubeRootPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.cbrt(currentValue);
    addHistory({ calculation: `∛(${currentValue})`, result });
    setDisplay(result.toString());
  };
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
      addHistory({
        calculation: `${display}%}`,
        result: result,
      });
    } else if (value === Operator.ToggleSign) {
      const result = parseFloat(display) * -1;
      setDisplay(result.toString());
      addHistory({
        calculation: `-${display}`,
        result,
      });
    } else {
      if (operator === Operator.Empty) {
        setStoredValue(display);
        setDisplay("0");
      } else {
        handleEqualsPress(false);
      }
      setOperator(value);
    }
  };

  const handleEqualsPress = (clearOperator: boolean = true): void => {
    const currentValue: number = parseFloat(display);
    const storedValueFloat: number = parseFloat(storedValue);
    let result: number = 0;
    let c_operator: string = operator;
    switch (c_operator) {
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
      case Operator.Power:
        result = Math.pow(storedValueFloat, currentValue);
        c_operator = "^";
        break;
      default:
        break;
    }
    addHistory({
      calculation: `${storedValue} ${c_operator} ${currentValue}`,
      result,
    });
    setDisplay(result.toString());
    if (clearOperator) setOperator(Operator.Empty);
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
    addHistory({
      calculation: `${trigFunction.toLocaleLowerCase()}(${currentValue})`,
      result,
    });
    setDisplay(result.toString());
  };

  const handleLogPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.log10(currentValue);
    addHistory({ calculation: `log(${currentValue})`, result });
    setDisplay(result.toString());
  };

  const handleLnPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.log(currentValue);
    addHistory({ calculation: `ln(${currentValue})`, result });
    setDisplay(result.toString());
  };

  const handleInversePress = () => {
    const currentValue = parseFloat(display);
    const result = 1 / currentValue;
    addHistory({ calculation: `1/${currentValue}`, result });
    setDisplay(result.toString());
  };

  const handleExponentialPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.exp(currentValue);
    addHistory({ calculation: `e^${currentValue}`, result });
    setDisplay(result.toString());
  };

  const handleSquarePress = () => {
    const currentValue = parseFloat(display);
    const result = Math.pow(currentValue, 2);
    addHistory({ calculation: `${currentValue}^2`, result });
    setDisplay(result.toString());
  };

  const handlePowerPress = () => {
    handleOperatorPress(Operator.Power);
  };
  const handleAbsolutePress = () => {
    const currentValue = parseFloat(display);
    const result = Math.abs(currentValue);
    addHistory({ calculation: `abs(${currentValue})`, result });
    setDisplay(result.toString());
  };

  const handlePiPress = () => {
    addHistory({ calculation: Math.PI.toString(), result: Math.PI });
    setDisplay(Math.PI.toString());
  };

  const handleEPress = () => {
    addHistory({ calculation: Math.E.toString(), result: Math.E });
    setDisplay(Math.E.toString());
  };
  const handleRadPress = () => {
    const currentValue = parseFloat(display);
    const result = currentValue * (Math.PI / 180); // Convert degrees to radians
    addHistory({ calculation: `${currentValue}°`, result });
    setDisplay(result.toString());
  };

  const handleSquareRootPress = () => {
    const currentValue = parseFloat(display);
    const result = Math.sqrt(currentValue);

    addHistory({
      calculation: `√(${currentValue})`,
      result,
    });
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
    handleDelete,
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
    handleCubeRootPress,
    handleRadPress,
    handleSquareRootPress,
  };
};

export default useCalculation;
