/* eslint-disable no-undef */

import { asyncSetAuthUser, asyncRegisterUser, ActionType, setAuthUserActionCreator } from './action';
import apiService from '../../utils/api';
import { showLoadingBar, hideLoadingBar } from '../loadingBar/action';

// Mock data untuk respons sukses
const fakeLoginResponse = {
  token: 'mock_token_123',
};

const fakeUserProfile = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

// Mock data untuk respons error
const fakeApiErrorResponse = {
  error: true,
  message: 'Failed to authenticate',
};

const fakeUnexpectedError = new Error('Network error');

describe('asyncSetAuthUser thunk (Login)', () => {
  beforeEach(() => {
    // Memastikan mock direset sebelum setiap pengujian
    apiService.login = jest.fn();
    apiService.getOwnProfile = jest.fn();
    apiService.putAccessToken = jest.fn();
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Skenario 1: Dispatch action dengan benar ketika login berhasil
  it('should dispatch actions correctly when login is successful', async () => {
    // Arrange
    apiService.login.mockResolvedValue({ error: false, data: fakeLoginResponse });
    apiService.getOwnProfile.mockResolvedValue({ error: false, data: { user: fakeUserProfile } });
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(3); // showLoadingBar, setAuthUserActionCreator, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(apiService.putAccessToken).toHaveBeenCalledWith(fakeLoginResponse.token);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserProfile));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(result).toEqual({ success: true });
    expect(global.alert).not.toHaveBeenCalled();
  });

  // Skenario 2: Menampilkan alert dan tidak dispatch setAuthUser jika login gagal
  it('should alert and not dispatch setAuthUser when login fails', async () => {
    // Arrange
    apiService.login.mockResolvedValue(fakeApiErrorResponse);
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'wrong_password',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2); // showLoadingBar, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(apiService.putAccessToken).not.toHaveBeenCalled(); // Access token tidak boleh disimpan
    expect(dispatch).not.toHaveBeenCalledWith(setAuthUserActionCreator(expect.any(Object))); // setAuthUserActionCreator tidak boleh dipanggil
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(result).toEqual({ success: false, message: fakeApiErrorResponse.message });
    expect(global.alert).toHaveBeenCalledWith(fakeApiErrorResponse.message);
  });

  // Skenario 3: Menangani error tak terduga (mis. jaringan) saat login
  it('should handle unexpected errors during login', async () => {
    // Arrange
    apiService.login.mockRejectedValue(fakeUnexpectedError);
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2); // showLoadingBar, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(result).toEqual({ success: false, message: 'An unexpected error occurred during login.' });
    expect(global.alert).toHaveBeenCalledWith('An unexpected error occurred during login.');
  });
});

describe('asyncRegisterUser thunk (Register)', () => {
  beforeEach(() => {
    apiService.register = jest.fn();
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Skenario 1: Dispatch action dengan benar ketika registrasi berhasil
  it('should dispatch actions correctly when registration is successful', async () => {
    // Arrange
    apiService.register.mockResolvedValue({ error: false, message: 'User registered successfully' });
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    const result = await asyncRegisterUser({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2); // showLoadingBar, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(result).toEqual({ success: true });
    expect(global.alert).toHaveBeenCalledWith('Pendaftaran berhasil! Silakan login.');
  });

  // Skenario 2: Menampilkan alert ketika registrasi gagal
  it('should alert when registration fails', async () => {
    // Arrange
    apiService.register.mockResolvedValue(fakeApiErrorResponse);
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    const result = await asyncRegisterUser({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2); // showLoadingBar, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(result).toEqual({ success: false, message: fakeApiErrorResponse.message });
    expect(global.alert).toHaveBeenCalledWith(fakeApiErrorResponse.message);
  });

  // Skenario 3: Menangani error tak terduga (mis. jaringan) saat registrasi
  it('should handle unexpected errors during registration', async () => {
    // Arrange
    apiService.register.mockRejectedValue(fakeUnexpectedError);
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    const result = await asyncRegisterUser({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2); // showLoadingBar, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(result).toEqual({ success: false, message: 'An unexpected error occurred during registration.' });
    expect(global.alert).toHaveBeenCalledWith('An unexpected error occurred during registration.');
  });
});
