import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import loginScreen from "./src/screens/authentication/login";
import registerScreen from "./src/screens/authentication/register";
import homeScreen from "./src/screens/content/home";
import animalDetails from "./src/screens/content/animalDetails";
import wishList from "./src/screens/content/wishList";
import newPost from "./src/screens/content/newPost";

const Stack = createNativeStackNavigator();

export function AppStack() {
  useEffect(() => {
    // console.warn(user);
  }, []);
  const user = useSelector((state) => state.useReducer.users);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Register" component={registerScreen} />
        <Stack.Screen name="Home" component={homeScreen} />
        <Stack.Screen name="animalDetails" component={animalDetails} />
        <Stack.Screen name="wishList" component={wishList} />
        <Stack.Screen name="newPost" component={newPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
