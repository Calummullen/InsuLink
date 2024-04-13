import { Text, View } from "react-native";
import { useFonts } from "expo-font";

export const Header = () => {
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });
  if (fontsLoaded) {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "hussar",
          }}
        >
          Insu<Text style={{ color: "blue" }}>Link</Text>
          {/* <Text style={{ color: "blue" }}>Link</Text> */}
        </Text>
        {/* <Feather
          name="menu"
          size={24}
          color="black"
          onPress={() => alert("pog")}
          style={{
            marginRight: 32,
          }}
        /> */}
      </View>
    );
  }
};
