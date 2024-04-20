import { useFonts } from "expo-font";
import { FC } from "react";
import {
  ProgressBar as ProgressBarUiLib,
  Text,
  View,
} from "react-native-ui-lib";

export const ProgressBar: FC<{
  title: string;
  description: string;
  items: any[];
}> = ({ title, description, items }) => {
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  return (
    <View style={{ flexDirection: "column", gap: 12 }}>
      <Text style={{ fontFamily: "hussar", fontSize: 24 }}>{title}</Text>
      <ProgressBarUiLib
        progress={
          (items.filter((i) => i.isChecked).length / items.length) * 100
        }
        progressColor={"green"}
      />
      <Text style={{ fontSize: 10, fontFamily: "hussar" }}>{description}</Text>
    </View>
  );
};
