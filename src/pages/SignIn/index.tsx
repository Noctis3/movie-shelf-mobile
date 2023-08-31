import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';

import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../contexts/auth';
import { IPageProps } from '../../types/navigation';

type FormData = {
  username: string;
  password: string;
};

const ERROR_MESSAGES = {
  REQUIRED: 'Esse campo é obrigatório',
};

export default function SignIn({ navigation }: IPageProps) {
  const { control, formState, handleSubmit, clearErrors, setError } =
    useForm<FormData>({
      mode: 'onChange',
    });
  const { signIn } = useContext(AuthContext);

  const submit = async (data: { username: string; password: string }) => {
    try {
      clearErrors();
      await signIn(data);
      navigation.navigate('HomeSection');
    } catch (error) {
      setError('root', { type: 'manual', message: 'Erro ao autenticar' });
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
              label="Nome de usuário"
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
              label="Senha"
              style={styles.input}
              onBlur={field.onBlur}
              secureTextEntry
              textContentType="password"
              onChangeText={field.onChange}
              autoCapitalize="none"
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
          Entrar
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
