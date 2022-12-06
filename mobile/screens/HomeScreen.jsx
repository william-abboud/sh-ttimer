import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Button, ImageBackground } from "react-native";
import { AppText } from "../components/AppText";
import { getData, resetStorage } from "../hooks/useStorage";
import { goToEarning, goToTimer } from "../utils/navigation";

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  mainTitle: {
    textAlign: "center",
  },
  subTitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  currentEarning: {
    textAlign: "center",
  },
  storedEarning: {
    color: "green",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonSpacings: {
    marginRight: 10,
  },
  backgroundImage: {
    flex: 1,
  },
});

export const HomeScreen = ({ navigation }) => {
  const [storedEarning, setStoredEarning] = useState(0);

  const getStoredEarning = useCallback(async () => {
    const earning = await getData("@earning");

    if (earning) {
      setStoredEarning(Number.parseFloat(earning));
    } else {
      setStoredEarning(0);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getStoredEarning();
    });

    return unsubscribe;
  }, [getStoredEarning, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./images/background.png")}
        style={styles.backgroundImage}
        imageStyle={{ resizeMode: "repeat", opacity: 0.2 }}
      >
        <View style={styles.contentContainer}>
          <StatusBar style="auto" />
          <View style={styles.titleContainer}>
            <AppText size="h1" style={styles.mainTitle}>
              Sh*t Timer!
            </AppText>
            <AppText size="h4" style={styles.subTitle}>
              Sh*t on company time and get paid for it!
            </AppText>
            {!!storedEarning && (
              <AppText style={styles.currentEarning}>
                You have made{" "}
                <AppText
                  size="h4"
                  style={styles.storedEarning}
                >{`${storedEarning.toFixed(2)}$`}</AppText>
              </AppText>
            )}
          </View>
          <View style={styles.buttonsContainer}>
            {!!!storedEarning && (
              <View style={styles.buttonSpacings}>
                <Button
                  title="Get started"
                  onPress={() => goToEarning(navigation)}
                />
              </View>
            )}
            {!!storedEarning && (
              <View style={styles.buttonSpacings}>
                <Button
                  title="Continue"
                  onPress={() => goToTimer(navigation)}
                />
              </View>
            )}
            {!!storedEarning && (
              <View style={styles.buttonSpacings}>
                <Button
                  title="Clear Storage"
                  onPress={() => {
                    resetStorage();
                    getStoredEarning();
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
