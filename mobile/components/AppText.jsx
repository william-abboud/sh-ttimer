import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
  },
});

export const AppText = ({ children, size, style = {} }) => {
  const conditionalStyles = {
    h1: {
      fontSize: 48,
      fontFamily: "Lato-Black",
    },
    h2: {
      fontSize: 32,
      fontFamily: "Lato-Black",
    },
    h3: {
      fontSize: 24,
      fontFamily: "Lato-Black",
    },
    h4: {
      fontSize: 20,
      fontFamily: "Lato-Black",
    },
  };

  const conditionalStyle = conditionalStyles[size] || {};

  const combinedStyle = {
    ...styles.text,
    ...conditionalStyle,
    ...style,
  };

  return <Text style={combinedStyle}>{children}</Text>;
};
