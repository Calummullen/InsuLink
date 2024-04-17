import * as Notifications from "expo-notifications";

export const TestNotification = async ({
  date,
  hours,
}: {
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
  const trigger = date ? { date: date } : { seconds: hours! };
  const triggerTest = new Date(date!);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Look at that notification",
      body: "I'm so proud of myself!",
    },
    trigger: triggerTest,
  });
};
