import { Ionicons } from "@expo/vector-icons";
import { FC, useCallback, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Button, Dialog, Drawer, SortableList } from "react-native-ui-lib";
import { ReminderListItem } from "./ReminderListItem";
import ChecklistItem from "./ChecklistItem";
import SortableListView from "react-native-sortable-listview";

export const ScrollableList: FC<{
  listItemType: "checklist" | "reminder";
  listItems: any[];
  setListItems: (item: any) => void;
}> = ({ listItems, setListItems, listItemType }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newChecklistItemText, setNewCheckListItemText] = useState<string>("");
  const [pogItems, setPogItems] = useState(listItems);
  const test = useRef<any[]>(pogItems);
  const onOrderChange = useCallback((newData: any) => {
    console.log("New order:", newData);
    test.current = newData;
  }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      {/* <Drawer
        rightItems={[
          {
            text: "Read",
            background: "red",
            onPress: () => console.log("read pressed"),
          },
        ]}
        style={{ borderRadius: 14 }}
      >
        <View
          style={{
            height: 60,
            alignItems: "center",
            backgroundColor: "green",
            borderRadius: 14,
          }}
        >
          <Text style={{ fontSize: 48 }}>Item</Text>
        </View>
      </Drawer> */}

      <SortableList
        data={pogItems}
        onOrderChange={() => console.log("hwere")}
        renderItem={(data) => (
          <View>
            <Text style={{ padding: 30 }}>{data.item.label}</Text>
          </View>
        )}
      />
      <ScrollView>
        {listItems.map((item, index) => {
          return listItemType === "checklist" ? (
            <ChecklistItem
              key={index}
              item={item}
              listItems={listItems}
              setListItems={setListItems}
            />
          ) : (
            <ReminderListItem
              key={index}
              item={item}
              listItems={listItems}
              setListItems={setListItems}
            />
          );
        })}
      </ScrollView>
      <View style={{ flexDirection: "column", gap: 12 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Ionicons
            onPress={() => {
              setIsModalOpen(true);
            }}
            name="add-circle-outline"
            size={42}
            color="black"
          />
        </View>
        <View>
          <Button
            fullWidth
            style={{
              borderRadius: 8,
              marginBottom: 20,
            }}
            backgroundColor={"#5FA8FF"}
            onPress={() => {
              const newList = listItems.map((i) => {
                i.isChecked = false;
                return i;
              });
              return setListItems(newList);
            }}
          >
            <Text
              style={{ fontFamily: "hussar", fontSize: 24, color: "white" }}
            >
              Clear
            </Text>
          </Button>
        </View>
      </View>
      <Dialog
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
            Please enter a new item in the input field below
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
              setListItems([
                ...listItems,
                { isChecked: false, label: newChecklistItemText },
              ]);
              setIsModalOpen(false);
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Add</Text>
          </Button>
        </View>
      </Dialog>
    </View>
  );
};
