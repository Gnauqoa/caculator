import { AntDesign, Feather } from "@expo/vector-icons";
import { SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useCalculation, { Operator } from "../../hooks/useCalculation";
import Button, { ButtonProps } from "../../components/Button";
import Row from "../../components/Row";

const Landscape = () => {
  const {
    display,
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
    handleRadPress,
    handleSquareRootPress,
    handleCubeRootPress,
    operator,
  } = useCalculation();
  const render: ButtonProps[][] = [
    [
      {
        operator: operator,
        value: "rad",
        onPress: handleRadPress,
      },
      {
        operator: operator,
        value: "∛",
        onPress: handleCubeRootPress,
      },
      {
        operator: operator,
        value: "√",
        onPress: handleSquareRootPress,
      },
      {
        operator: operator,
        value: "C",
        style: "secondary",
        onPress: handleClearPress,
      },
      {
        operator: operator,
        value: Operator.ToggleSign,
        style: "secondary",
        onPress: () => handleOperatorPress(Operator.ToggleSign),
      },
      {
        operator: operator,
        value: Operator.Division100,
        style: "secondary",
        onPress: () => handleOperatorPress(Operator.Division100),
      },
      {
        operator: operator,
        value: Operator.Division,
        style: "accent",
        onPress: () => handleOperatorPress(Operator.Division),
      },
    ],
    [
      {
        operator: operator,
        value: "sin",
        onPress: () => handleTrigPress(Operator.Sin),
      },
      {
        operator: operator,
        value: "cos",
        onPress: () => handleTrigPress(Operator.Cos),
      },
      {
        operator: operator,
        value: "tan",
        onPress: () => handleTrigPress(Operator.Tan),
      },
      {
        operator: operator,
        value: "7",
        onPress: () => handleNumberPress("7"),
      },
      {
        operator: operator,
        value: "8",
        onPress: () => handleNumberPress("8"),
      },
      {
        operator: operator,
        value: "9",
        onPress: () => handleNumberPress("9"),
      },
      {
        operator: operator,
        value: Operator.Multiplication,
        style: "accent",
        onPress: () => handleOperatorPress(Operator.Multiplication),
      },
    ],
    [
      {
        operator: operator,
        value: "ln",
        onPress: handleLnPress,
      },
      {
        operator: operator,
        value: "log",
        onPress: handleLogPress,
      },
      {
        operator: operator,
        value: "1/x",
        onPress: handleInversePress,
      },
      {
        operator: operator,
        value: "4",
        onPress: () => handleNumberPress("4"),
      },
      {
        operator: operator,
        value: "5",
        onPress: () => handleNumberPress("5"),
      },
      {
        operator: operator,
        value: "6",
        onPress: () => handleNumberPress("6"),
      },
      {
        operator: operator,
        value: Operator.Subtraction,
        style: "accent",
        onPress: () => handleOperatorPress(Operator.Subtraction),
      },
    ],
    [
      {
        operator: operator,
        value: "e^x",
        onPress: handleExponentialPress,
      },
      {
        operator: operator,
        value: "x^2",
        onPress: handleSquarePress,
      },
      {
        operator: operator,
        value: "x^y",
        onPress: handlePowerPress,
      },
      {
        operator: operator,
        value: "1",
        onPress: () => handleNumberPress("1"),
      },
      {
        operator: operator,
        value: "2",
        onPress: () => handleNumberPress("2"),
      },
      {
        operator: operator,
        value: "3",
        onPress: () => handleNumberPress("3"),
      },
      {
        operator: operator,
        value: Operator.Addition,
        style: "accent",
        onPress: () => handleOperatorPress(Operator.Addition),
      },
    ],
    [
      {
        operator: operator,
        value: "|x|",
        onPress: handleAbsolutePress,
      },
      {
        operator: operator,
        value: "π",
        onPress: handlePiPress,
      },
      {
        operator: operator,
        value: "e",
        onPress: handleEPress,
      },
      {
        operator: operator,
        value: "0",
        onPress: () => handleNumberPress("0"),
      },
      {
        operator: operator,
        value: ".",
        onPress: handleDecimalPress,
      },
      {
        operator: operator,
        value: "Paste",
        style: "accent",
        onPress: handlePaste,
      },
      {
        operator: operator,
        value: "=",
        style: "accent",
        onPress: handleEqualsPress,
      },
    ],
  ];

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          flexDirection: "column",
          backgroundColor: "#202020",
          gap: 4,
        }}
      >
        <View
          style={{
            paddingBottom: 20,
            paddingRight: 20,
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 40,
              textAlign: "right",
              marginLeft: "auto",
            }}
          >
            {display}
          </Text>
          <TouchableOpacity onPress={handleDelete}>
            <Feather name="delete" size={24} color="white" />
          </TouchableOpacity>
          <View
            style={{
              zIndex: 20,
              position: "absolute",
              left: 10,
              top: 0,
            }}
          >
            <TouchableOpacity onPress={handleCopy}>
              <AntDesign name="copy1" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {render.map((row, index) => (
          <Row key={index + "row"}>
            {row.map((button, b_index) => (
              <Button key={index + b_index + "button"} {...button} />
            ))}
          </Row>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Landscape;
