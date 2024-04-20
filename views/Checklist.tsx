import { useFonts } from "expo-font";
import { useState } from "react";
import { View } from "react-native";
import { ProgressBar } from "../components/ProgressBar";
import { ScrollableList } from "../components/ScrollableList";

export const Checklist = () => {
  const initialItems = [
    {
      label: "Take morning insulin",
      isChecked: false,
    },
    {
      label: "Have breakfast",
      isChecked: false,
    },
  ];
  const [listItems, setListItems] = useState(initialItems);
  const [newChecklistItemText, setNewCheckListItemText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  return (
    <View
      style={{
        margin: 12,
        flexDirection: "column",
        height: "100%",
        gap: 24,
      }}
    >
      <ProgressBar
        title="Progress"
        description="Please note, the checklist will reset daily"
        items={listItems}
      />
      <ScrollableList
        listItemType="checklist"
        listItems={listItems}
        setListItems={setListItems}
      />

      {/* <Dialog
        visible={isModalOpen}
        panDirection={"down"}
        onDismiss={() => setIsModalOpen(false)}
        containerStyle={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        <View style={{ flexDirection: "column", gap: 18 }}>
          <Text style={{ fontFamily: "hussar", fontSize: 18 }}>
            Please enter a new checklist item in the input field below
          </Text>
          <TextInput
            onChangeText={(text) => setNewCheckListItemText(text)}
            mode="outlined"
            label="Checklist item"
            activeOutlineColor="green"
            // underlineColor="transparent"
            // underlineColorAndroid={"transparent"}
          />
          <Button
            disabled={!newChecklistItemText}
            fullWidth
            style={{
              borderRadius: 8,
            }}
            backgroundColor={"#5FA8FF"}
            onPress={() => {
              if (listItems.some((i) => i.label === newChecklistItemText)) {
                return setIsModalOpen(false);
              }
              setListItem([
                ...listItems,
                { isChecked: false, label: newChecklistItemText },
              ]);
              setIsModalOpen(false);
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
          </Button>
        </View>
      </Dialog> */}
    </View>
    // <View
    //   style={{
    //     height: "100%",
    //     margin: 12,
    //     flexDirection: "column",

    //     gap: 24,
    //   }}
    // >
    //   <ProgressBar
    //     title="Progress"
    //     description="Please note, the checklist will reset daily"
    //     items={listItems}
    //   />
    //   <ScrollView>
    //     {listItems.map((item) => (
    //       <View
    //         key={item.label}
    //         style={{
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           borderRadius: 14,
    //           borderColor: item.isChecked ? "green" : "lightgrey",
    //           borderWidth: 2,
    //           padding: 18,
    //           marginTop: 14,
    //         }}
    //       >
    //         <View style={{ maxWidth: "90%" }}>
    //           <Checkbox
    //             key={item.label}
    //             value={item.isChecked}
    //             onValueChange={() => {
    //               const newList = [...listItems];
    //               const objectToUpdate = newList.find(
    //                 (i) => i.label === item.label
    //               );
    //               objectToUpdate!.isChecked = !objectToUpdate?.isChecked;
    //               setListItem(newList);
    //             }}
    //             color="green"
    //             label={item.label}
    //             size={26}
    //             labelStyle={{
    //               fontFamily: "hussar",
    //               fontSize: 18,
    //               textDecorationLine: item.isChecked ? "line-through" : "none",
    //               textDecorationColor: "red",
    //             }}
    //           />
    //         </View>
    //         <View>
    //           <Ionicons
    //             onPress={() =>
    //               setListItem(listItems.filter((i) => i.label !== item.label))
    //             }
    //             name="trash-outline"
    //             size={24}
    //             color="red"
    //           />
    //         </View>
    //       </View>
    //     ))}
    //   </ScrollView>
    //   <View style={{ alignItems: "center", justifyContent: "center" }}>
    //     <Ionicons
    //       onPress={() => {
    //         setNewCheckListItemText("");
    //         setIsModalOpen(true);
    //       }}
    //       name="add-circle-outline"
    //       size={42}
    //       color="black"
    //     />
    //   </View>
    //   <View>
    //     <Button
    //       fullWidth
    //       style={{
    //         borderRadius: 8,
    //         marginBottom: 20,
    //       }}
    //       backgroundColor={"#5FA8FF"}
    //       onPress={() => {
    //         const newList = listItems.map((i) => {
    //           i.isChecked = false;
    //           return i;
    //         });
    //         return setListItem(newList);
    //       }}
    //     >
    //       <Text style={{ fontFamily: "hussar", fontSize: 24, color: "white" }}>
    //         Clear
    //       </Text>
    //     </Button>
    //   </View>

    // </View>
  );
};
