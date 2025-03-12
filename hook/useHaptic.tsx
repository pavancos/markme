import { useCallback } from "react";
import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

export function useHaptic() {
  const triggerHaptic = useCallback((type: "light" | "medium" | "heavy" | "success" | "warning" | "error" | "selection") => {
    if (Platform.OS !== "ios" && Platform.OS !== "android") return;

    if (type === "selection") {
      Haptics.selectionAsync();
    } else if (type === "success" || type === "warning" || type === "error") {
      const notificationType = 
        type === "success" ? Haptics.NotificationFeedbackType.Success :
        type === "warning" ? Haptics.NotificationFeedbackType.Warning :
        Haptics.NotificationFeedbackType.Error;

      Haptics.notificationAsync(notificationType);
    } else {
      const impactStyle = 
        type === "light" ? Haptics.ImpactFeedbackStyle.Light :
        type === "medium" ? Haptics.ImpactFeedbackStyle.Medium :
        Haptics.ImpactFeedbackStyle.Heavy;

      Haptics.impactAsync(impactStyle);
    }
  }, []);

  return triggerHaptic;
}