import React, { useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../store/actions";
import axios from "axios";

import styles from "./style";

import Input from "../../../components/input";
import Button from "../../../components/button";

export default function index({ navigation }) {
  const [fullName, setfullName] = useState("");
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const flashLogin = useRef();
  const buttonHandler = () => {
    axios
      .post("http://127.0.0.1:8080/api/register", {
        email: mail,
        langKey: "en",
        login: fullName,
        password: password,
      })
      .then(function (response) {
        axios
          .post("http://127.0.0.1:8080/api/authenticate", {
            password: password,
            rememberMe: false,
            username: fullName,
          })
          .then(function (Authresponse) {
            axios
              .get("http://127.0.0.1:8080/api/account", {
                headers: {
                  Authorization: `Bearer ${Authresponse.data.id_token}`,
                },
              })
              .then(function (accountResponse) {
                dispatch(setUser(accountResponse));
                setmail("");
                setfullName("");
                setpassword("");
                navigation.navigate("Home");
              });
          })
          .catch(function (error) {
            console.warn(error);
          });
      })
      .catch(function (error) {
        flashLogin.current.showMessage({
          message: "Name Already in use",
          description: "Login to your account instead!",
          type: "danger",
        });
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#10203C" }}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignSelf: "flex-start" }}
        >
          <Image
            source={require("../../../assets/back.png")}
            style={{ marginLeft: 20, width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={styles.sectionContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            style={styles.headerImg}
            source={require("../../../assets/cats/cat.png")}
          />

          <Input onChangeText={(value) => setmail(value)} value={mail}>
            Email
          </Input>
          <Input onChangeText={(value) => setfullName(value)} value={fullName}>
            Full name
          </Input>
          <Input onChangeText={(value) => setpassword(value)} value={password}>
            Password
          </Input>

          <Button registre onPress={() => buttonHandler()}>
            Sign up!
          </Button>
        </View>
      </KeyboardAvoidingView>

      <FlashMessage position='bottom' ref={flashLogin} />
    </View>
  );
}
