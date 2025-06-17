/* eslint-disable no-undef */

import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  // Skenario 1: Mengembalikan state awal jika diberi aksi yang tidak dikenal
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  // Skenario 2: Mengembalikan authUser ketika diberi aksi SET_AUTH_USER
  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const authUser = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(authUser);
  });

  // Skenario 3: Mengembalikan null ketika diberi aksi UNSET_AUTH_USER
  it('should return null when given by UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });
});
