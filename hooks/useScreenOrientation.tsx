import { useContext } from "react";
import { ScreenOrientationContext } from "../context/screenOrientation";

const userScreenOrientation = () => {
  return useContext(ScreenOrientationContext);
};

export default userScreenOrientation;
