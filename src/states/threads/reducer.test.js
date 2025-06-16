/* eslint-disable no-undef */

import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer', () => {
  // Skenario 1: Mengembalikan threads awal ketika tidak ada aksi yang diberikan.
  it('should return the initial threads when given unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  // Skenario 2: Mengembalikan threads yang benar ketika aksi RECEIVE_THREADS diberikan.
  it('should return the threads when given RECEIVE_THREADS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2024-01-01T00:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'Redux',
            createdAt: '2024-01-02T00:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.threads);
  });

  // Skenario 3: Mengembalikan threads dengan thread baru ketika aksi ADD_THREAD diberikan.
  it('should return the threads with the new thread when given ADD_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2024-01-01T00:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-baru',
          title: 'Thread Baru',
          body: 'Ini adalah thread yang baru dibuat',
          category: 'Testing',
          createdAt: '2024-06-15T00:00:00.000Z',
          ownerId: 'users-3',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  // Skenario 4: Mengembalikan threads dengan upVotesBy yang diubah ketika aksi UPVOTE_THREAD diberikan.
  it('should return the threads with upVotesBy updated correctly when given UPVOTE_THREAD action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2024-01-01T00:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-1'], // Diubah agar userId ada di downVotesBy awal
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['users-1'],
        downVotesBy: [], // Diharapkan kosong karena users-1 di-filter
      },
    ]);

    // Skenario tambahan: Downvote thread yang sudah di-upvote
    const initialState2 = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2024-01-01T00:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const actionDownvote = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState2 = threadsReducer(initialState2, actionDownvote);
    expect(nextState2).toEqual([
      {
        ...initialState2[0],
        upVotesBy: [],
        downVotesBy: ['users-1'],
      },
    ]);

    // Skenario tambahan: Neutralize vote
    const initialState3 = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2024-01-01T00:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const actionNeutralize = {
      type: ActionType.NEUTRALIZE_THREAD_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    const nextState3 = threadsReducer(initialState3, actionNeutralize);
    expect(nextState3).toEqual([
      {
        ...initialState3[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
