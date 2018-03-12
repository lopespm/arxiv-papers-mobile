import { Platform, Dimensions } from "react-native";

import variable from "../attributes";

const deviceHeight = Dimensions.get("window").height;
export default (variables = variable) => {
  const theme = {
    flex: 1,
    backgroundColor: variables.containerColorBackground,
    height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
  };

  return theme;
};
