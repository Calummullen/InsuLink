import { useFonts } from "expo-font";
import { useState } from "react";
import { Text, View } from "react-native";
import { ScrollableList } from "../components/ScrollableList";

export const Reminders = () => {
  const [fontsLoaded] = useFonts({
    hussar: require("../assets/fonts/hussar/HussarPrintA-M9nY.otf"),
  });

  const initialReminderItems = [
    {
      label: "Long-acting Insulin",
      isChecked: false,
    },
  ];

  const [listItems, setListItems] = useState(initialReminderItems);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string>("");
  const [time, setTime] = useState<Date>();
  const [duration, setDuration] = useState<number>();

  return (
    <View
      style={{
        height: "100%",
        margin: 12,
        flexDirection: "column",

        gap: 24,
      }}
    >
      <Text style={{ fontFamily: "hussar", fontSize: 18 }}>
        Configure notifications to keep track of important times of the day,
        such as when to take your long-acting insulin
      </Text>
      <ScrollableList
        listItemType={"reminder"}
        listItems={listItems}
        setListItems={setListItems}
      />
      {/* <View>
        {listItems.map((item, index) => (
          <ReminderListItem
            key={index}
            item={item}
            listItems={listItems}
            setListItems={setListItems}
          />
        ))}
      </View> */}
      {/* <Dialog
        visible={isModalOpen}
        panDirection={"down"}
        onDismiss={() => {
          if (!time && !duration) {
            const newList = [...listItems];
            const objectToUpdate = newList.find((i) => i.label === activeModal);
            objectToUpdate!.isChecked = !objectToUpdate?.isChecked;
            setListItems(newList);
          }
          setIsModalOpen(false);
        }}
        containerStyle={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 6,
        }}
      >
        <View style={{ flexDirection: "column", gap: 18 }}>
          <View
            style={
              time
                ? {
                    padding: 12,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderColor: "#60FF5F",
                  }
                : {}
            }
          >
            <Text style={{ fontFamily: "hussar", fontSize: 18 }}>
              Please enter the time you'd like the notification to appear
            </Text>

            <DateTimePicker
              // floatingPlaceholderStyle={{ fontSize: 24 }}
              value={time}
              onChange={(e) => {
                setDuration(undefined);
                setTime(e);
              }}
              dateTimeFormatter={(date) =>
                date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              style={{ fontSize: 18, marginTop: 16 }}
              placeholder={"Click here to select a date"}
              mode={"time"}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text
              style={{
                borderBottomWidth: 1,
                width: 75,
                bottom: 7.5,
                borderColor: "grey",
              }}
            />
            <Text style={{ fontFamily: "hussar" }}>Alternatively</Text>
            <Text
              style={{
                borderBottomWidth: 1,
                width: 75,
                bottom: 7.5,
                borderColor: "grey",
              }}
            />
          </View>
          <View
            style={
              duration
                ? {
                    padding: 12,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderColor: "#60FF5F",
                  }
                : {}
            }
          >
            <Text style={{ fontFamily: "hussar", fontSize: 18 }}>
              Enter duration (in hours)
            </Text>

            <Picker
              style={{ fontSize: 18, marginTop: 16 }}
              value={duration}
              placeholder={"Click here to select a duration"}
              onChange={(text) => {
                setTime(undefined);
                setDuration(Number(text));
              }}
              items={[...Array(24).keys()].map((i) => {
                return { label: (i + 1).toString(), value: i + 1 };
              })}
            />
          </View>
          <Button
            disabled={!duration && !time}
            fullWidth
            style={{
              borderRadius: 8,
            }}
            backgroundColor={"#5FA8FF"}
            onPress={async () => {
              // if (time) {
              //   await TestNotification({ date: time });
              // }

              // if (duration) {
              //   await TestNotification({ hours: duration });
              // }

              setIsModalOpen(false);
              if (duration) {
                await TestNotification({ hours: duration });
              }

              if (time) {
                await TestNotification({ date: time });
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Set reminder{" "}
              {time &&
                `for ${time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              {duration && `for ${duration} hours`}
            </Text>
          </Button>
        </View>
      </Dialog> */}
    </View>
  );
};
