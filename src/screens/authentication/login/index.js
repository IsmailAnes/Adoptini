import React, { useState, useRef } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { PacmanIndicator } from "react-native-indicators";
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./style";

import Input from "../../../components/input";
import Button from "../../../components/button";

export default function index({ navigation }) {
  // useRefs
  const flashLogin = useRef();
  const flashLoginSucess = useRef();

  // useStatess
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // handle Login
  const HandleLogin = () => {
    setLoading(true);
    Keyboard.dismiss();
    axios
      .post("http://localhost:8080/api/authenticate", {
        password: password,
        rememberMe: false,
        username: mail,
      })
      .then(function (Authresponse) {
        axios
          .get("http://localhost:8080/api/account", {
            headers: {
              Authorization: `Bearer ${Authresponse.data.id_token}`,
            },
          })
          .then(async function (accountResponse) {
            dispatch(setUser(accountResponse));
            const storedUser = JSON.stringify(accountResponse);
            await AsyncStorage.setItem('@stored_User', storedUser);
            setMail('');
            setPassword('');
            navigation.navigate("Home");
          });
        setLoading(false);
      })
      .catch(function (error) {
        console.warn(error)
        flashLogin.current.showMessage({
          message: "Can't connect",
          description: "Email or password incorrect",
          type: "danger",
        },);
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.sectionContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.imgContainer}>
        <Image
          style={styles.headerImg}
          source={require("../../../assets/cats/cat.png")}
        />
      </View>
      <Input onChangeText={(value) => setMail(value)} value={mail}>
        Username
      </Input>
      <Input
        password
        onChangeText={(value) => setPassword(value)}
        value={password}
      >
        Password
      </Input>
      <TouchableOpacity
        style={{
          height: 25,
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
        }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#D4BFD2", fontFamily: "Montserrat-Regular", fontSize:12,marginRight:20 }}>
          Don't have an account? Registre now!
        </Text>
      </TouchableOpacity>

      {!loading ? (
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button onPress={() => HandleLogin()}>Login</Button>
        </View>
      ) : (
        <View style={{ height: 100, marginTop: 20 }}>
          <PacmanIndicator color="#D4BFD2" />
        </View>
      )}
      <FlashMessage position="bottom" ref={flashLogin} />
      <FlashMessage position='bottom' ref={flashLoginSucess} />
    </KeyboardAvoidingView>
  );
}
