import OneSignal from "react-native-onesignal";

export const tagUserInfoCreate = (email: string) => {
  OneSignal.sendTags({ user_name: "Diogo", email: "diogojoser@email.com" });
};
