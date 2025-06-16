/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import LoginPage from './LoginPage';
import { asyncSetAuthUser } from '../states/authUser/action';

// Mock thunk action
jest.mock('../states/authUser/action', () => ({
  asyncSetAuthUser: jest.fn(),
}));

// Setup mock store
const mockStore = configureStore([]);

describe('LoginPage Component', () => {
  let store;

  beforeEach(() => {
    // Reset mock sebelum setiap test
    asyncSetAuthUser.mockClear();
    // Inisialisasi store untuk setiap test
    store = mockStore({});
    // Mock dispatch dari store
    store.dispatch = jest.fn();
  });

  // Skenario 1: Komponen harus me-render semua input dan tombol
  it('should render email input, password input, and login button', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    // Assert
    const emailInput = screen.getByPlaceholderText('Emaile');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // Skenario 2: Pengguna harus bisa mengetik di input email
  it('should allow user to type in email input', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    const emailInput = screen.getByPlaceholderText('Email');

    // Action
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Assert
    expect(emailInput.value).toBe('test@example.com');
  });

  // Skenario 3: Pengguna harus bisa mengetik di input password
  it('should allow user to type in password input', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    const passwordInput = screen.getByPlaceholderText('Password');

    // Action
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  // Skenario 4: Memanggil fungsi login ketika tombol diklik
  it('should call login function with correct data when login button is clicked', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Action
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Assert
    expect(store.dispatch).toHaveBeenCalled();
    expect(asyncSetAuthUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
