import { useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext, getGraphData } from "../context/auth-context";
import { useFonts } from "expo-font";
import { getReadingStyles } from "../utils/reading-style-helper";

export const Logbook = () => {
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  const {
    state: { graphData },
  } = useContext(AuthContext);

  useEffect(() => {
    const awaitGraphData = async () => {
      console.log("getting g data");
      await getGraphData();
    };

    awaitGraphData();
  }, []);

  return (
    <View>
      {graphData && (
        <View
          style={{
            width: "100%",
          }}
        >
          <FlatList
            data={graphData}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: getReadingStyles(item.Value).background,
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 38,
                    fontFamily: "hussar",
                  }}
                >
                  {item.Value}
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 4,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={{ fontSize: 16, fontFamily: "hussar" }}>
                    {item.Timestamp.time}
                  </Text>
                  <Text style={{ fontSize: 12, fontFamily: "hussar" }}>
                    {item.Timestamp.date}
                  </Text>
                </View>
              </View>
            )}
          ></FlatList>
        </View>
      )}
      {/* {date && (
        <Text
          style={{
            marginTop: 12,
          }}
        >
          Current Reading:{" "}
          {sensorData.graphData[sensorData.graphData.length - 1].Value} at{" "}
          {format(date, "HH:mm:ss")} on {format(date, "dd/MM/yyyy")}
        </Text>
      )} */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};
