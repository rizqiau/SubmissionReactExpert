/* eslint-disable no-undef */

import { asyncAddThread, ActionType } from './action';
import apiService from '../../utils/api';
import { showLoadingBar, hideLoadingBar } from '../loadingBar/action';

// Mock apiService
const fakeThreadResponse = {
  id: 'thread-123',
  title: 'Test Thread',
  body: 'This is a test thread body',
  category: 'Test',
  createdAt: '2024-06-15T00:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = {
  error: true,
  message: 'Something went wrong', // Ini adalah pesan yang diharapkan saat error API
};

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    // Memastikan mock direset sebelum setiap pengujian
    apiService.createThread = jest.fn();
    global.alert = jest.fn(); // Mocking alert
  });

  afterEach(() => {
    // Membersihkan mock setelah setiap pengujian
    jest.restoreAllMocks();
  });

  // Skenario 1: Dispatch action dengan benar ketika pembuatan thread berhasil
  it('should dispatch actions correctly when adding a thread is successful', async () => {
    // Arrange
    apiService.createThread.mockResolvedValue({ error: false, data: { thread: fakeThreadResponse } });
    const dispatch = jest.fn();
    const getState = () => ({}); // Tidak ada state yang dibutuhkan untuk skenario ini

    // Action
    await asyncAddThread({
      title: 'Test Thread',
      body: 'This is a test thread body',
      category: 'Test',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(3); // showLoadingBar, addThreadActionCreator, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_THREAD,
      payload: {
        thread: fakeThreadResponse,
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(apiService.createThread).toHaveBeenCalledWith({
      title: 'Test Thread',
      body: 'This is a test thread body',
      category: 'Test',
    });
    expect(global.alert).not.toHaveBeenCalled(); // Pastikan alert tidak dipanggil jika berhasil
  });

  // Skenario 2: Dispatch error dan tampilkan alert ketika pembuatan thread gagal
  it('should dispatch error and alert when adding a thread failed', async () => {
    // Arrange
    apiService.createThread.mockResolvedValue(fakeErrorResponse);
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    await asyncAddThread({
      title: 'Test Thread',
      body: 'This is a test thread body',
      category: 'Test',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2); // showLoadingBar, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(apiService.createThread).toHaveBeenCalledWith({
      title: 'Test Thread',
      body: 'This is a test thread body',
      category: 'Test',
    });
    // UBAH KEMBALI EKSPEKTASI INI
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message); // Kembali mengharapkan pesan dari fakeErrorResponse
  });

  // Skenario 3: Menangani error tak terduga dengan benar
  it('should handle unexpected error correctly', async () => {
    // Arrange
    const errorMessage = 'Network error';
    apiService.createThread.mockRejectedValue(new Error(errorMessage)); // Mock untuk melempar error
    const dispatch = jest.fn();
    const getState = () => ({});

    // Action
    await asyncAddThread({
      title: 'Test Thread',
      body: 'This is a test thread body',
      category: 'Test',
    })(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2); // showLoadingBar, hideLoadingBar
    expect(dispatch).toHaveBeenCalledWith(showLoadingBar());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingBar());
    expect(global.alert).toHaveBeenCalledWith('An unexpected error occurred while creating thread.');
  });
});
