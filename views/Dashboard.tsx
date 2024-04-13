import { View, Text } from "react-native";
import { Dimensions } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import { LineChart } from "react-native-gifted-charts";

export const Dashboard = ({ dataTest }) => {
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  const data = dataTest.map((d, index) => {
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
    value: dataTest[dataTest.length - 1].Value,
    time: dataTest[dataTest.length - 1].Timestamp.time,
    index: dataTest.length - 1,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(dataTest.length - 1);
  // const screenWidth = Dimensions.get("window").width;
  // const chartConfig = {
  //   backgroundGradientFrom: "white",
  //   backgroundGradientTo: "white",
  //   color: (opacity = 1) => `black`,
  //   // strokeWidth: 2, // optional, default 3
  //   // barPercentage: 0.5,
  // };
  // const data = {
  //   labels: dataTest.map((d) => d.Timestamp.time),
  //   // labels: ["12", "15", "18", "21"],
  //   datasets: [
  //     {
  //       // data: dataTest.map((d) => {
  //       //   return { value: d.Value, timeStamp: d.Timestamp };
  //       // }),
  //       data: dataTest.map((d) => d.Value),
  //       // data: [1, 2, 3, 4],
  //       strokeWidth: 3, // optional
  //     },
  //   ],
  // };
  return (
    <View style={{ marginTop: 20 }}>
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
              pointerLabelComponent: (data) => {
                console.log(data);
                const index = dataTest.findIndex(
                  (d) => d.Timestamp.time === data[0].dataPointText
                );
                if (index !== currentValue.index) {
                  try {
                    setCurrentValue({
                      value: data[0].value,
                      time: dataTest.find(
                        (d) => d.Timestamp.time == data[0].dataPointText
                      ).Timestamp.time,
                      index,
                    });
                  } catch (e) {
                    console.log("ERROR123", e);
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
            flexDirection: "column",
            backgroundColor: "lightgreen",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 14,
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

      {/* <LineChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        withInnerLines={false}
        withHorizontalLines={true}
        onDataPointClick={(data) => {
          console.log("data1", data);
          setCurrentValue(data.value);
        }}
      />
      {currentValue && (
        <View
          style={{
            height: 125,
            flexDirection: "column",
            backgroundColor: "lightgreen",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 42, fontWeight: "normal", fontFamily: "hussar" }}
          >
            {currentValue}{" "}
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
            {dataTest.find((d) => d.Value === currentValue).Timestamp.time}
          </Text>
        </View>
      )} */}
    </View>
  );
};
