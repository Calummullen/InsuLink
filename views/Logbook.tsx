import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  getPatientData,
  getPatientGraphData,
  libreLogin,
} from "../services/diabetes-service";
import { format, parse } from "date-fns";
import { ConvertLibreDateToFormattedDate } from "../utils/date-helper";
import { TestNotification } from "../notifications/notifications";
import { useDeviceOrientation } from "@react-native-community/hooks";

export const Logbook = () => {
  const [sensorData, setSensorData] = useState();

  useEffect(() => {
    const getPatientId = async () => {
      const patientDataResponse = await getPatientData();
      // Handle Error

      const patientGraphDataResponse = await getPatientGraphData(
        patientDataResponse.data[0].patientId
      );
      const graphData = patientGraphDataResponse.data.graphData;

      graphData.map((item) => {
        const convertedDate = ConvertLibreDateToFormattedDate(item.Timestamp);
        item.Timestamp = convertedDate;
        if (!item.Value.toString().includes(".")) {
          item.Value = item.Value.toLocaleString("en", {
            minimumFractionDigits: 1,
          });
        }
      });
      setSensorData(patientGraphDataResponse.data);
    };

    getPatientId();
  }, []);

  return (
    <View>
      {sensorData && (
        <View
          style={{
            width: "100%",
          }}
        >
          <FlatList
            data={sensorData.graphData}
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
