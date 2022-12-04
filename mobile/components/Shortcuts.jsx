import { StyleSheet, View } from "react-native";
import { Link } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopWidth: 1,
    borderColor: "#000",
  },
  link: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const Shortcuts = () => {
  return (
    <View style={styles.container}>
      <View style={styles.link}>
        <Link to={{ screen: "Home" }}>
            <Icon name="home" size={30} />
        </Link>
      </View>
      <View style={styles.link}>
        <Link to={{ screen: "Timer" }}>
            <Icon name="alarm" size={40} />
        </Link>
      </View>
      <View style={styles.link}>
        <Link to={{ screen: "Earning" }}>
            <Icon name="money" size={30} />
        </Link>
      </View>
    </View>
  );
};
