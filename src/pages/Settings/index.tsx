import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SegmentedButtons } from 'react-native-paper';

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
      <Button
        mode="contained"
        onPress={() => {
          signOut();
        }}
      >
        SignOut
      </Button>
      <Text>{t('settingsPage.selectLanguage.label')}</Text>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
