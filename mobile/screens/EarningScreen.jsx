import { useCallback, useState } from "react";
import { Button, View, TextInput, StyleSheet, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { goToTimer } from "../utils/navigation";
import { storeData } from "../hooks/useStorage";
import { AppText } from "../components/AppText";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
  },
  hourlyEarning: {
    color: "green",
    fontWeight: "bold",
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 20,
  },
  slider: {
    flex: 1,
    height: 40,
    marginLeft: -10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "green",
    fontWeight: "bold",
  },
  preferredControl: {
    color: "blue",
    textDecorationLine: "underline",
  },
  readyContainer: {
    marginTop: 20,
  },
});

export const EarningScreen = ({ navigation }) => {
  const [useInput, setUseInput] = useState(false);
  const [hourlyEarning, setHourlyEarning] = useState(0);

  const updateHourlyEarning = useCallback((newValue) => {
    setHourlyEarning(Number(newValue));
  }, []);

  const handleUseInput = useCallback(() => {
    setUseInput((prevUseInput) => !prevUseInput);
  }, []);

  const handleReady = useCallback(async () => {
    await storeData("@hourlyEarning", hourlyEarning.toString());

    goToTimer(navigation);
  }, [hourlyEarning, navigation]);

  return (
    <View style={styles.container}>
      <View>
        <AppText size="h4" style={styles.label}>
          How much $$$ do you make an hour?
        </AppText>
        {!useInput ? (
          <View style={styles.sliderContainer}>
            <Slider
              value={hourlyEarning}
              onValueChange={updateHourlyEarning}
              style={styles.slider}
              minimumValue={0}
              step={5}
              maximumValue={1000}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <AppText size="h3" style={styles.hourlyEarning}>
              {hourlyEarning}$
            </AppText>
          </View>
        ) : null}
        {useInput ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              defaultValue={"0$"}
              value={hourlyEarning}
              onChangeText={updateHourlyEarning}
            />
          </View>
        ) : null}
        <Pressable onPress={handleUseInput}>
          <AppText style={styles.preferredControl}>
            {useInput ? "Use slider" : "Enter manually instead?"}
          </AppText>
        </Pressable>
      </View>

      <View style={styles.readyContainer}>
        <Button
          title="Free $$$"
          onPress={handleReady}
          disabled={hourlyEarning <= 0}
        />
      </View>
    </View>
  );
};
