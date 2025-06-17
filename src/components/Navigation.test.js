/* eslint-disable no-undef */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation component', () => {
  // Skenario 1: Komponen harus menampilkan link "Threads" dan "Leaderboards"
  it('should render Threads and Leaderboards links', () => {
    // Arrange
    const authUser = { id: 'user-1', name: 'User Test', avatar: 'https://test.com/avatar.jpg' };
    const mockSignOut = jest.fn();
    render(
      <BrowserRouter>
        <Navigation authUser={authUser} signOut={mockSignOut} />
      </BrowserRouter>,
    );

    // Assert
    const threadsLink = screen.getByRole('link', { name: 'Threads' });
    const leaderboardsLink = screen.getByRole('link', { name: 'Leaderboards' });
    expect(threadsLink).toBeInTheDocument();
    expect(leaderboardsLink).toBeInTheDocument();
  });

  // Skenario 2: Komponen harus menampilkan nama dan avatar pengguna
  it('should display user name and avatar', () => {
    // Arrange
    const authUser = { id: 'user-1', name: 'User Test', avatar: 'https://test.com/avatar.jpg' };
    const mockSignOut = jest.fn();
    render(
      <BrowserRouter>
        <Navigation authUser={authUser} signOut={mockSignOut} />
      </BrowserRouter>,
    );

    // Assert
    const userName = screen.getByText('User Test');
    const userAvatar = screen.getByAltText('User Test');
    expect(userName).toBeInTheDocument();
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute('src', 'https://test.com/avatar.jpg');
  });

  // Skenario 3: Komponen harus memanggil fungsi signOut ketika tombol Logout diklik
  it('should call signOut function when Logout button is clicked', () => {
    // Arrange
    const authUser = { id: 'user-1', name: 'User Test', avatar: 'https://test.com/avatar.jpg' };
    const mockSignOut = jest.fn();
    render(
      <BrowserRouter>
        <Navigation authUser={authUser} signOut={mockSignOut} />
      </BrowserRouter>,
    );
    const logoutButton = screen.getByRole('button', { name: 'Logout' });

    // Action
    fireEvent.click(logoutButton);

    // Assert
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
