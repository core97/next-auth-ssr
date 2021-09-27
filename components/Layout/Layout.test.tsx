import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useAuth, AuthContextValues } from 'contexts/AuthContext';
import Layout from './index';

jest.mock('contexts/AuthContext');

describe('<Layout />', () => {
  beforeEach(() => {});

  test('renders its children', () => {
    (useAuth as jest.Mock<AuthContextValues>).mockImplementation(() => ({
      user: undefined,
      onChangeUser: jest.fn(),
      onSignIn: jest.fn(),
      onSignOut: jest.fn(),
    }));

    const component = render(
      <Layout>
        <p>This is a text</p>
      </Layout>
    );
    expect(component.container).toHaveTextContent('This is a text');
  });

  test('shows sign in button when user is not logged', () => {
    (useAuth as jest.Mock<AuthContextValues>).mockImplementation(() => ({
      user: undefined,
      onChangeUser: jest.fn(),
      onSignIn: jest.fn(),
      onSignOut: jest.fn(),
    }));

    const component = render(
      <Layout>
        <p>This is a text</p>
      </Layout>
    );

    expect(component.getByText('Iniciar sesión')).toBeDefined();
  });

  test('click sign out button calls onSignOut handler once', () => {
    const onSignOutMock = jest.fn();

    (useAuth as jest.Mock<AuthContextValues>).mockImplementation(() => ({
      user: { email: 'test@gmail.com', uid: '2sfhwofin' },
      onChangeUser: jest.fn(),
      onSignIn: jest.fn(),
      onSignOut: onSignOutMock,
    }));

    const component = render(
      <Layout>
        <p>This is a text</p>
      </Layout>
    );

    const button = component.getByText('Cerrar sesión');
    fireEvent.click(button);

    expect(onSignOutMock).toHaveBeenCalledTimes(1);
  });
});
