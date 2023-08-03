import { useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator as createBottomTabNavigator } from 'react-native-paper/react-navigation';
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
import Settings from './pages/Settings';
import Movie from './pages/Movie';
import { AuthProvider } from './contexts/auth';

function HomeSection() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

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
          <AuthProvider>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={SignIn} />
              <Stack.Screen
                name="HomeSection"
                component={HomeSection}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Movie"
                component={Movie}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
