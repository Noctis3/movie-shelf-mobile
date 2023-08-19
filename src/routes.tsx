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
import { StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Settings from './pages/Settings';
import Movie from './pages/Movie';
import FavoriteMovies from './pages/FavoriteMovies';
import { AuthProvider } from './contexts/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

function HomeSection() {
  const Tab = createBottomTabNavigator();
  const { t, i18n } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início' || route.name === 'Home') {
            iconName = focused ? 'home-variant' : 'home-variant-outline';
          } else if (route.name === 'Favoritos' || route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (
            route.name === 'Configurações' ||
            route.name === 'Settings'
          ) {
            if (focused) {
              return <IonIcons name="settings" size={24} color={color} />;
            }
            return <IonIcons name="settings-outline" size={24} color={color} />;
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={24} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name={t('tabNavigation.home')} component={Home} />
      <Tab.Screen
        name={t('tabNavigation.favorites')}
        component={FavoriteMovies}
      />
      <Tab.Screen name={t('tabNavigation.settings')} component={Settings} />
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
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <AuthProvider>
            <Stack.Navigator initialRouteName="SignIn">
              <Stack.Screen name="SignIn" component={SignIn} />
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
