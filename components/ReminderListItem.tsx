import { FC, useState } from "react";
import { Text, View } from "react-native";
import {
  Button,
  DateTimePicker,
  Dialog,
  Picker,
  Switch,
} from "react-native-ui-lib";
import { TestNotification } from "../notifications/notifications";

export const ReminderListItem: FC<{
  item: any;
  listItems: any[];
  setListItems: (items: any[]) => void;
}> = ({ item, listItems, setListItems }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string>("");
  const [time, setTime] = useState<Date>();
  const [duration, setDuration] = useState<number>();
  return (
    <View
      key={item.label}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 8,
        paddingVertical: 18,
        borderBottomWidth: 2,

        borderColor: "lightgrey",
      }}
    >
      <Text style={{ fontFamily: "hussar" }}>{item.label}</Text>
      <Switch
        value={item.isChecked}
        onValueChange={() => {
          const newList = [...listItems];
          const objectToUpdate = newList.find((i) => i.label === item.label);
          objectToUpdate!.isChecked = !objectToUpdate?.isChecked;
          setListItems(newList);
          if (item.isChecked) {
            setDuration(undefined);
            setTime(undefined);
            setIsModalOpen(true);
            setActiveModal(item.label);
          }
        }}
      />

      <Dialog
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
              setIsModalOpen(false);
              console.log("POG123");
              if (duration) {
                await TestNotification({
                  title: item.label,
                  body: item.label,
                  hours: duration,
                });
              }

              if (time) {
                await TestNotification({
                  title: item.label,
                  body: item.label,
                  date: time,
                });
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
      </Dialog>
    </View>
  );
};
