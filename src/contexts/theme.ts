import { createContext } from "react";
import { MD3LightTheme } from "react-native-paper";

export const PreferencesContext = createContext({
  theme: MD3LightTheme,
});
