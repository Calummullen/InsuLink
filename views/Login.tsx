import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/auth-context";
import { TextInput } from "react-native-paper";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    authContext: { signIn },
    errorText,
    isLoginLoading,
    setErrorText,
  } = React.useContext(AuthContext);
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  return (
    <SafeAreaView
      style={{
        height: "100%",
        flexDirection: "column",
        gap: 14,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Modal animationType="slide" transparent={true} visible={true}>
        <ActivityIndicator
          style={{ position: "absolute", top: 300, left: 150, zIndex: 10 }}
          size={"large"}
        />
      </Modal> */}

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 32,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 64,
            fontFamily: "hussar",
            width: "100%",
            textAlign: "center",
          }}
        >
          Insu<Text style={{ color: "blue" }}>Link</Text>
        </Text>
        <Text
          style={{
            fontFamily: "hussar",
            //
            width: "100%",
            textAlign: "center",
          }}
        >
          Your Libre companion app
        </Text>
      </View>
      <View style={{ flexDirection: "column", gap: 4, width: "90%" }}>
        <TextInput
          onChangeText={(email) => {
            if (errorText) setErrorText("");
            setEmail(email);
          }}
          mode="outlined"
          label="Email"
          activeOutlineColor="blue"
          outlineStyle={{ borderRadius: 12 }}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View
        style={{ flexDirection: "row", width: "90%", alignItems: "center" }}
      >
        <TextInput
          onChangeText={(password) => {
            if (errorText) setErrorText("");
            setPassword(password);
          }}
          mode="outlined"
          label="Password"
          style={{ flex: 1 }}
          activeOutlineColor="blue"
          outlineStyle={{ borderRadius: 12 }}
          value={password}
          secureTextEntry={!showPassword}
        />
        {!showPassword ? (
          <Entypo
            name="eye"
            size={24}
            color="black"
            style={{ position: "absolute", right: 15, top: 17.5 }}
            onPress={() => setShowPassword(!showPassword)}
          />
        ) : (
          <Entypo
            name="eye-with-line"
            size={24}
            color="black"
            style={{ position: "absolute", right: 15, top: 17.5 }}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>
      {errorText && (
        <View>
          <Text style={{ fontSize: 14, color: "red", fontFamily: "hussar" }}>
            {errorText}
          </Text>
        </View>
      )}

      {/* <TouchableOpacity style={{ width: "90%" }}> */}
      <Pressable
        disabled={(!email && !password) || isLoginLoading}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          width: "90%",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 12,
          backgroundColor:
            email === "" && password === ""
              ? "lightgrey"
              : isLoginLoading
              ? "#A3D3A3"
              : "#27D227",
        }}
        onPress={() => signIn({ email, password })}
      >
        {isLoginLoading ? (
          <ActivityIndicator color="blue" />
        ) : (
          <Text
            style={{
              fontSize: 18,
              color: "white",
              fontFamily: "hussar",
              lineHeight: 25,
              width: "100%",
              height: "auto",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        )}
        {/* </Pressable> */}
      </Pressable>
    </SafeAreaView>
  );
};
