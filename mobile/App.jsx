import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Shortcuts } from "./components/Shortcuts";

import { EarningScreen } from "./screens/EarningScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { TimerScreen } from "./screens/TimerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato/Lato-Regular.ttf"),
    "Lato-Black": require("./assets/fonts/Lato/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Earning" component={EarningScreen} />
      </Stack.Navigator>
      <Shortcuts />
    </NavigationContainer>
  );
}
