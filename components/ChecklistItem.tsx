import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Checkbox, Drawer, View } from "react-native-ui-lib";
import { trigger } from "react-native-haptic-feedback";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

trigger("impactLight", options);

const ChecklistItem: FC<{
  item: any;
  listItems: any[];
  setListItems: (item: any) => void;
}> = ({ item, listItems, setListItems }) => {
  return (
    <Drawer
      rightItems={[
        {
          customElement: (
            <View>
              <Ionicons name="trash-outline" size={24} color="white" />
            </View>
          ),

          background: "red",
          onPress: () =>
            setListItems(listItems.filter((i) => i.label !== item.label)),
        },
      ]}
      fullSwipeLeft
      fullSwipeRight
      style={{ borderRadius: 14, marginTop: 14 }}
      // fullLeftThreshold={0.5}
      onFullSwipeRight={() =>
        setListItems(listItems.filter((i) => i.label !== item.label))
      }
      // onFullSwipeLeft={() => console.log("2")}
      fullRightThreshold={0.9}
      // onFullSwipeRight={() =>
      //   setListItems(listItems.filter((i) => i.label !== item.label))
      // }
      useNativeAnimations
    >
      <View
        key={item.label}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 14,
          borderColor: item.isChecked ? "green" : "lightgrey",
          // borderWidth: 2,
          padding: 18,
          backgroundColor: "white",
        }}
      >
        <View style={{ maxWidth: "90%" }}>
          <Checkbox
            key={item.label}
            value={item.isChecked}
            onValueChange={() => {
              const newList = [...listItems];
              const objectToUpdate = newList.find(
                (i) => i.label === item.label
              );
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
        {/* <View>
          <Ionicons
            onPress={() =>
              setListItems(listItems.filter((i) => i.label !== item.label))
            }
            name="trash-outline"
            size={24}
            color="red"
          />
        </View> */}
      </View>
    </Drawer>
  );
};

export default gestureHandlerRootHOC(ChecklistItem);
