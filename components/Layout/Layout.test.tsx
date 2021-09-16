import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from './index';

describe('<Layout />', () => {
  test('renders its children', () => {
    const props = {
      text: 'This is a test',
      isAuth: true,
      onSignOutSpy: jest.fn(),
    };

    const component = render(
      <Layout isAuth={props.isAuth} onSignOut={props.onSignOutSpy}>
        <p>{props.text}</p>
      </Layout>
    );

    expect(component.container).toHaveTextContent(props.text);
  });

  test('shows sign in button', () => {
    const props = {
      text: 'This is a test',
      isAuth: false,
      onSignOutSpy: jest.fn(),
    };

    const component = render(
      <Layout isAuth={props.isAuth} onSignOut={props.onSignOutSpy}>
        <p>{props.text}</p>
      </Layout>
    );

    expect(component.getByText('Iniciar sesión')).toBeDefined();
  });

  test('shows sign out button', () => {
    const props = {
      text: 'This is a test',
      isAuth: true,
      onSignOutSpy: jest.fn(),
    };

    const component = render(
      <Layout isAuth={props.isAuth} onSignOut={props.onSignOutSpy}>
        <p>{props.text}</p>
      </Layout>
    );

    expect(component.getByText('Cerrar sesión')).toBeDefined();
  });

  test('clicking the button calls event handler once', () => {
    const props = {
      text: 'This is a test',
      isAuth: true,
      onSignOutSpy: jest.fn(),
    };

    const component = render(
      <Layout isAuth={props.isAuth} onSignOut={props.onSignOutSpy}>
        <p>{props.text}</p>
      </Layout>
    );

    const button = component.getByText('Cerrar sesión');
    fireEvent.click(button);

    expect(props.onSignOutSpy).toHaveBeenCalledTimes(1);
  });
});
