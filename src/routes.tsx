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
import { AuthProvider } from './contexts/auth';

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
    <AuthProvider>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={SignIn} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </AuthProvider>
  );
}
