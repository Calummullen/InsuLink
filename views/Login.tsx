import React from "react";
import { Text, View, TextInput, Pressable, SafeAreaView } from "react-native";
import { AuthContext } from "../context/auth-context";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
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
      <View style={{ flexDirection: "column", gap: 4, width: "90%" }}>
        <Text>Email</Text>
        <TextInput
          style={{
            paddingHorizontal: 10,
            height: 50,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 5,
          }}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={{ flexDirection: "column", gap: 4, width: "90%" }}>
        <Text>Password</Text>
        <TextInput
          style={{
            paddingHorizontal: 10,
            height: 50,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 5,
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
          width: "90%",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          backgroundColor: "black",
        }}
        onPress={() => signIn({ email, password })}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
          }}
        >
          Login
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};
