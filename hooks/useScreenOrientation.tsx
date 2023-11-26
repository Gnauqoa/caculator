import { useContext } from "react";
import { ScreenOrientationContext } from "../context/screenOrientation";

const useScreenOrientation = () => {
  return useContext(ScreenOrientationContext);
};

export default useScreenOrientation;
