import * as Notifications from "expo-notifications";

export const TestNotification = async ({
  title,
  body,
  date,
  hours,
}: {
  title: string;
  body: string;
  date?: Date | undefined;
  hours?: number | undefined;
}) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Second, call the method
  console.log("date", date, "hours", hours);
  const trigger = date ? { date: date } : { seconds: hours! };
  const triggerTest = date ? new Date(date!) : { seconds: hours! };

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: triggerTest,
  });
};
