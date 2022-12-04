import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  BackHandler,
} from "react-native";
import { intervalToDuration } from "date-fns";
import { useEarning } from "../hooks/useEarning";
import { storeData, getData } from "../hooks/useStorage";
import { useTimer } from "../hooks/useTimer";
import { useFocusEffect } from "@react-navigation/native";
import { goToHome } from "../utils/navigation";
import { AppText } from "../components/AppText";
import { combinator } from "../hooks/useCongratulations";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
  },
  timeEllapsed: {
    textAlign: "center",
    marginTop: 10,
  },
  moneySymbol: {
    color: "gray",
    position: "absolute",
    left: -15,
    top: 10,
  },
  moneyEarned: {
    textAlign: "center",
  },
  moneyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  moneyInnerContainer: {
    position: "relative",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  timerButton: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  homeButton: {
    marginRight: 20,
  },
  homeButtonText: {
    fontWeight: "bold",
  },
});

export const TimerScreen = ({ navigation }) => {
  const { timeInSeconds, startTimer, pauseTimer, isPlaying } = useTimer();
  const [storedEarning, setStoredEarning] = useState(0);

  const earning = useEarning(timeInSeconds, storedEarning);

  const storeEarning = useCallback(async () => {
    try {
      await storeData("@earning", earning.toString());
    } catch (error) {
      console.log(error);
    }
  }, [earning]);

  const getStoredEarning = useCallback(async () => {
    const earningInStorage = await getData("@earning");

    if (earningInStorage) {
      setStoredEarning(Number.parseFloat(earningInStorage));
    }
  }, []);

  const handleStart = useCallback(() => {
    startTimer();
  }, [startTimer]);

  const handlePause = useCallback(() => {
    pauseTimer();
    storeEarning();
  }, [pauseTimer, storeEarning]);

  const backAction = useCallback(async () => {
    await pauseTimer();
    await storeEarning();

    goToHome(navigation);

    return true;
  }, [pauseTimer, storeEarning, navigation]);

  useFocusEffect(
    useCallback(() => {
      getStoredEarning();
    }, [getStoredEarning])
  );

  useFocusEffect(
    useCallback(() => {
      return async () => {
        await storeEarning();
      };
    }, [storeEarning])
  );

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [backAction]);

  const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration({
    start: 0,
    end: timeInSeconds * 1000,
  });

  useEffect(() => {
    if (isPlaying) {
      const result = combinator({ 
        duration: {
          hours,
          minutes,
          seconds,
        },
        moneyEarned: earning,
      });

      if (result.length > 0) {
        console.log(result);
      }
    }
  }, [isPlaying, earning, hours, minutes, seconds]);

  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");
  const secondsString = seconds.toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <View style={styles.moneyContainer}>
          <View style={styles.moneyInnerContainer}>
            <AppText size="h1" style={styles.moneyEarned}>
              {`${earning.toFixed(2)}`}
            </AppText>
            <AppText size="h3" style={styles.moneySymbol}>
              {"$"}
            </AppText>
          </View>
        </View>
        <AppText size="h4" style={styles.timeEllapsed}>
          {`${hoursString}:${minutesString}:${secondsString}`}
        </AppText>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.timerButton}>
          <Button
            onPress={handleStart}
            title={timeInSeconds === 0 ? "Start" : "Continue"}
            disabled={isPlaying}
          />
        </View>
        <View style={styles.timerButton}>
          <Button
            style={styles.timerButton}
            onPress={handlePause}
            title="Pause"
            disabled={!isPlaying}
          />
        </View>
      </View>
    </View>
  );
};
