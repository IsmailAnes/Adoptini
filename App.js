import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { AppStack } from "./navigation";
import { store } from "./src/store/configStore";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useFonts } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { setUser } from "./src/store/actions";

const customFonts = {
  "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
  "Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
  "Montserrat-ExtraBold": require("./src/assets/fonts/Montserrat-ExtraBold.ttf"),
  "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
  "Montserrat-Light": require("./src/assets/fonts/Montserrat-Light.ttf"),
};
const AdoptiniApp = () => {
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    await AsyncStorage.getItem("@stored_User").then((value) => {
      if (value !== null) {
        dispatch(setUser(JSON.parse(value)));
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}



export default AdoptiniApp;
