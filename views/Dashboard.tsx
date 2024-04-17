import { View, Text } from "react-native";
import { Dimensions } from "react-native";
import { FC, useState } from "react";
import { useFonts } from "expo-font";
import { LineChart } from "react-native-gifted-charts";

export const Dashboard: FC<any> = ({ graphData }) => {
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  const data = graphData.map((d: any, index: number) => {
    if (index % 10 === 0) {
      return {
        value: d.Value,
        dataPointText: d.Timestamp.time,
        label: d.Timestamp.time,
      };
    } else {
      return { value: d.Value, dataPointText: d.Timestamp.time };
    }
  });

  const commonStripStyle = { position: "absolute", width: "100%", height: 40 };
  const screenWidth = Dimensions.get("window").width;

  const [currentValue, setCurrentValue] = useState({
    value: graphData[graphData.length - 1].Value,
    time: graphData[graphData.length - 1].Timestamp.time,
    index: graphData.length - 1,
  });

  return (
    <View
      style={{
        marginTop: 20,
        height: "100%",
        flexDirection: "column",
      }}
    >
      {data && (
        <>
          <LineChart
            data={data}
            initialSpacing={0}
            spacing={6.5}
            noOfSections={5}
            height={250}
            thickness={4}
            hideDataPoints
            color="orange"
            yAxisThickness={1}
            xAxisLabelTextStyle={{
              width: 80,
              color: "black",
              fontWeight: "bold",
              textAlign: "left",
              fontFamily: "hussar",
            }}
            xAxisIndicesHeight={10}
            xAxisIndicesWidth={2}
            yAxisTextStyle={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "hussar",
            }}
            pointerConfig={{
              pointerStripWidth: 5,
              pointerStripColor: "black",
              pointerStripUptoDataPoint: false,
              pointerVanishDelay: 999999999999,
              initialPointerIndex: currentValue.index,
              pointerLabelComponent: (data: any) => {
                const index = graphData.findIndex(
                  (d: any) => d.Timestamp.time === data[0].dataPointText
                );
                if (index !== currentValue.index) {
                  try {
                    setCurrentValue({
                      value: data[0].value,
                      time: graphData.find(
                        (d: any) => d.Timestamp.time == data[0].dataPointText
                      ).Timestamp.time,
                      index,
                    });
                  } catch (e) {
                    console.log("Error setting current value", e);
                  }
                }
              },
              pointerComponent: () => (
                <View
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: -4,
                  }}
                >
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 4,
                      backgroundColor: "red",
                    }}
                  />
                </View>
              ),
            }}
          />
          <View style={{ position: "absolute", top: -16, left: 6 }}>
            <Text style={{ fontSize: 10, fontFamily: "hussar" }}>mmol/L</Text>
          </View>
        </>
      )}

      {currentValue && (
        <View
          style={{
            height: 125,
            // flexDirection: "column",
            marginBottom: 20,
            backgroundColor: `${
              currentValue.value < 4
                ? "#FF8B8B"
                : currentValue.value >= 4 && currentValue.value < 10
                ? "#BCFCB4"
                : "#FFCC8B"
            }`,
            alignItems: "center",
            justifyContent: "center",
            marginTop: "auto",
          }}
        >
          <Text
            style={{ fontSize: 42, fontWeight: "normal", fontFamily: "hussar" }}
          >
            {currentValue.value}{" "}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "normal",
                fontFamily: "hussar",
              }}
            >
              mmol/L
            </Text>
          </Text>
          <Text style={{ fontSize: 24, fontFamily: "hussar" }}>
            {currentValue.time}
          </Text>
        </View>
      )}
    </View>
  );
};
