import { FC } from "react";
import { View } from "react-native-ui-lib";
import {
  Button,
  Checkbox,
  Dialog,
  GridList,
  ProgressBar,
  TextField,
} from "react-native-ui-lib";
import { Ionicons } from "@expo/vector-icons";

export const ChecklistItem: FC<{
  item: any;
  listItems: any[];
  setListItems: (item: any) => void;
}> = ({ item, listItems, setListItems }) => {
  return (
    <View
      key={item.label}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 14,
        borderColor: item.isChecked ? "green" : "lightgrey",
        borderWidth: 2,
        padding: 18,
        marginTop: 14,
      }}
    >
      <View style={{ maxWidth: "90%" }}>
        <Checkbox
          key={item.label}
          value={item.isChecked}
          onValueChange={() => {
            const newList = [...listItems];
            const objectToUpdate = newList.find((i) => i.label === item.label);
            objectToUpdate!.isChecked = !objectToUpdate?.isChecked;
            setListItems(newList);
          }}
          color="green"
          label={item.label}
          size={26}
          labelStyle={{
            fontFamily: "hussar",
            fontSize: 18,
            textDecorationLine: item.isChecked ? "line-through" : "none",
            textDecorationColor: "red",
          }}
        />
      </View>
      <View>
        <Ionicons
          onPress={() =>
            setListItems(listItems.filter((i) => i.label !== item.label))
          }
          name="trash-outline"
          size={24}
          color="red"
        />
      </View>
    </View>
  );
};
