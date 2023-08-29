import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../pages/SignIn/'; // Adjust the import path based on your project structure
import Routes from '../routes';
jest.useFakeTimers();

test('fails to log in a user', async () => {
  // Render the login screen
  let props: any;
  const { getByText, getByTestId } = render(<SignIn {...props} />);

  // Simulate user input
  const emailInput = getByTestId('username');
  const passwordInput = getByTestId('password');

  fireEvent.changeText(emailInput, 'test@example.com');
  fireEvent.changeText(passwordInput, 'password123');

  // Simulate user clicking the "Log In" button
  const loginButton = getByTestId('submit');
  fireEvent.press(loginButton);

  // Wait for the login to complete
  await waitFor(() => {
    // Check if the user is logged in or appropriate UI changes
    // For example, you might have a component that renders when the user is logged in
    // You can use getByText or getByTestId to query the rendered UI
    const loggedInMessage = getByText('Erro ao autenticar');
    expect(loggedInMessage).toBeDefined();
  });
});

test('log in a user', async () => {
  // Render the login screen
  let props: any;
  const { getByText, getByTestId } = render(<Routes />);

  // Simulate user input
  const emailInput = getByTestId('username');
  const passwordInput = getByTestId('password');

  fireEvent.changeText(emailInput, 'test@example.com');
  fireEvent.changeText(passwordInput, 'password123');

  // Simulate user clicking the "Log In" button
  const loginButton = getByTestId('submit');
  fireEvent.press(loginButton);

  // Wait for the login to complete
  await waitFor(() => {
    // Check if the user is logged in or appropriate UI changes
    // For example, you might have a component that renders when the user is logged in
    // You can use getByText or getByTestId to query the rendered UI
    const homeScreen = getByTestId('searchBar');
    expect(homeScreen).toBeDefined();
  });
});