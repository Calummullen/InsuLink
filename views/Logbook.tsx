import { useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { AuthContext, getGraphData } from "../context/auth-context";

export const Logbook = () => {
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
                  backgroundColor: `${
                    item.Value < 4
                      ? "#FF8B8B"
                      : item.Value >= 4 && item.Value < 10
                      ? "#BCFCB4"
                      : "#FFCC8B"
                  }`,
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
                    fontSize: 52,
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.Timestamp.time}
                  </Text>
                  <Text style={{ fontSize: 18 }}>{item.Timestamp.date}</Text>
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
