import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';

import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../contexts/auth';
import { IPageProps } from '../../types/navigation';

import { useTranslation } from 'react-i18next';

type FormData = {
  username: string;
  password: string;
};

export default function SignIn({ navigation }: IPageProps) {
  const { control, formState, handleSubmit, clearErrors, setError } =
    useForm<FormData>({
      mode: 'onChange',
    });
  const { signIn } = useContext(AuthContext);
  const { t } = useTranslation();

  const ERROR_MESSAGES = {
    REQUIRED: t('signIn.required'),
  };
  
  const submit = async (data: { username: string; password: string }) => {
    try {
      clearErrors();
      await signIn(data);
      navigation.navigate('HomeSection');
    } catch (error) {
      setError('root', { type: 'manual', message: t('signIn.error') });
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        defaultValue=""
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              testID="username"
              value={field.value}
              label={t('signIn.username')}
              style={styles.input}
              onBlur={field.onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={field.onChange}
            />
            {fieldState.error && (
              <HelperText type="error">{fieldState.error.message}</HelperText>
            )}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
        render={({ field, fieldState }) => (
          <>
            <TextInput
              testID="password"
              value={field.value}
              label={t('signIn.password')}
              style={styles.input}
              onBlur={field.onBlur}
              secureTextEntry
              textContentType="password"
              onChangeText={field.onChange}
            />
            {fieldState.error && (
              <HelperText type="error">{fieldState.error.message}</HelperText>
            )}
          </>
        )}
      />
      <View>
        <Button
          testID="submit"
          mode="contained"
          onPress={handleSubmit(submit)}
          style={styles.button}
          loading={formState.isSubmitting}
        >
          {t('signIn.signIn')}
        </Button>
        {formState.errors.root && (
          <HelperText type="error">{formState.errors.root.message}</HelperText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 30 },
  input: { marginVertical: 5 },
  button: {
    marginTop: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
});
