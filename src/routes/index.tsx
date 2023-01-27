import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from "react-native-onesignal";
import { Notification } from "../components/Notification";
import * as Linking from "expo-linking";
const linking = {
  prefixes: ["igniteshoesapp://", "com.mrpapaia.igniteshoes://"],
  config: {
    screens: {
      details: { path: "details/:productId" },
    },
  },
};
export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  const [notification, setNotification] = useState<OSNotification>();

  useEffect(() => {
    const subscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (reciver: NotificationReceivedEvent) => {
        setNotification(reciver.getNotification());
      }
    );

    return () => subscribe;
  }, []);

  useEffect(() => {
    const subscribe = OneSignal.setNotificationOpenedHandler((reciver) => {
      console.log(reciver);
    });

    return () => subscribe;
  }, []);
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification && (
        <Notification
          data={notification}
          onClose={() => {
            setNotification(undefined);
          }}
        />
      )}
    </NavigationContainer>
  );
}
