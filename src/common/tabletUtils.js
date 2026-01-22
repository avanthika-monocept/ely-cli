import { isTablet } from "react-native-device-info";

let cachedIsTablet = null;
const tabletScale = 1.15;

export const isTabletView = () => {
  if (cachedIsTablet !== null) {
    return cachedIsTablet;
  }

  cachedIsTablet = isTablet();
  return cachedIsTablet;
};

export const scaleForTablet = (size) => {
  return isTabletView() ? size * tabletScale : size;
};

