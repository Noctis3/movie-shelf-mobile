import { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import { PreferencesContext } from './contexts/theme';

import Home from './pages/Home';
import SignIn from './pages/SignIn';

export default function Routes() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme);
  }, [colorScheme]);

  const Stack = createNativeStackNavigator();

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme
  );

  const preferences = useMemo(
    () => ({
      theme,
    }),
    [theme]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
