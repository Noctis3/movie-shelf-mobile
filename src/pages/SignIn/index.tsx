import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { useForm, Controller } from 'react-hook-form';
import api from '../../services/api';
import {
  CREATE_REQUEST_TOKEN,
  CREATE_SESSION,
  GET_ACCOUNT_DETAILS,
  VALIDATE_REQUEST_TOKEN,
} from '../../types/requests';

type FormData = {
  username: string;
  password: string;
};

const ERROR_MESSAGES = {
  REQUIRED: 'Esse campo é obrigatório',
};

export default function SignIn() {
  const { control, formState, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
  });

  const submit = async (data: { email: string; password: string }) => {
    try {
      const response = await api.get(CREATE_REQUEST_TOKEN);
      console.log('\nRequest token created');
      console.log(response.data);

      const validateResponse = await api.post(VALIDATE_REQUEST_TOKEN, {
        request_token: response.data.request_token,
        username: data.email,
        password: data.password,
      });
      console.log('\nRequest token validated');
      console.log(validateResponse.data);

      const sessionResponse = await api.post(CREATE_SESSION, {
        request_token: validateResponse.data.request_token,
      });
      console.log('\nSession created');
      console.log(sessionResponse.data);

      const accountResponse = await api.get(
        `${GET_ACCOUNT_DETAILS}?session_id=${sessionResponse.data.session_id}`
      );
      console.log('\nAccount details');
      console.log(accountResponse.data);
    } catch (error) {
      console.log(error.response.data);
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
        render={({ field }) => (
          <TextInput
            value={field.value}
            label="Nome de usuário"
            style={styles.input}
            onBlur={field.onBlur}
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
        render={({ field }) => (
          <TextInput
            value={field.value}
            label="Senha"
            style={styles.input}
            onBlur={field.onBlur}
            secureTextEntry
            textContentType="password"
            onChangeText={field.onChange}
          />
        )}
      />
      <Button
        disabled={!formState.isValid}
        mode="contained"
        onPress={handleSubmit(submit)}
        style={styles.button}
      >
        Entrar
      </Button>

      <View></View>
    </View>
  );
};

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
