import * as Notifications from "expo-notifications";

export const TestNotification = async () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Second, call the method

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Look at that notification",
      body: "I'm so proud of myself!",
    },
    trigger: {
      seconds: 5,
    },
  });
};
