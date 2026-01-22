import React, { useEffect, useRef } from "react";
import {
  LogBox,
  StatusBar,
  StyleSheet,
  Keyboard,
  Animated,
  Easing,
  Platform,
  KeyboardAvoidingView,
  View,
  
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/appNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App(props) {
  LogBox.ignoreAllLogs(true);
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 25 : 0}
        >
          <AppNavigator standalone={true} props={props} />
        </KeyboardAvoidingView>
     
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});
 