import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SegmentedButtons } from 'react-native-paper';
import { Image } from 'react-native-expo-image-cache';

import { IPageProps } from '../../types/navigation';
import { AuthContext } from '../../contexts/auth';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }: IPageProps) {
  // get auth context
  const { user, signOut } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.userWrapper}>
        <View style={styles.userIconWrapper}>
          <Image
            uri={`https://image.tmdb.org/t/p/original/${user.avatar.tmdb.avatar_path}`}
            preview={{
              uri: `https://image.tmdb.org/t/p/w200/${user.avatar.tmdb.avatar_path}`,
            }}
            style={styles.img}
          />
          <Text>{user.username}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            signOut();
          }}
        >
          {t('settingsPage.signOut')}
        </Button>
      </View>
      <Text style={styles.text}>{t('settingsPage.selectLanguage.label')}</Text>
      <SegmentedButtons
        value={i18n.language}
        onValueChange={(value) => {
          i18n.changeLanguage(value);
          AsyncStorage.setItem('language', value);
        }}
        buttons={[
          {
            value: 'pt',
            label: t('settingsPage.selectLanguage.pt'),
          },
          {
            value: 'en',
            label: t('settingsPage.selectLanguage.en'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  userIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    borderRadius: 100,
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
});
