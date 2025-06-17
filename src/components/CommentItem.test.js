/* eslint-disable no-undef */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommentItem from './CommentItem';

/**
 * Skenario Pengujian untuk Komponen CommentItem:
 *
 * 1. Menampilkan konten komentar, nama pemilik, dan avatar dengan benar.
 * 2. Menampilkan jumlah up-votes dan down-votes dengan benar.
 * 3. Memanggil fungsi onUpVote dengan ID komentar saat tombol up-vote diklik.
 * 4. Memanggil fungsi onDownVote dengan ID komentar saat tombol down-vote diklik.
 */

describe('CommentItem component', () => {
  // Mock data untuk pengujian
  const mockComment = {
    id: 'comment-1',
    content: 'Ini adalah komentar tes.',
    createdAt: '2023-01-01T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://test.com/avatar.jpg',
    },
    upVotesBy: ['users-2', 'users-3'],
    downVotesBy: ['users-4'],
  };

  const mockAuthUser = {
    id: 'users-1',
  };

  const mockOnUpVote = jest.fn();
  const mockOnDownVote = jest.fn();

  // Skenario 1: Menampilkan konten komentar, nama, dan avatar
  it('should display comment content, owner name, and avatar correctly', () => {
    // Arrange
    render(
      <BrowserRouter>
        <CommentItem {...mockComment} authUser={mockAuthUser} onUpVote={mockOnUpVote} onDownVote={mockOnDownVote} />
      </BrowserRouter>,
    );

    // Assert
    expect(screen.getByText('Ini adalah komentar tes.')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://test.com/avatar.jpg');
  });

  // Skenario 2: Menampilkan jumlah vote dengan benar
  it('should display the correct number of up-votes and down-votes', () => {
    // Arrange
    render(
      <BrowserRouter>
        <CommentItem {...mockComment} authUser={mockAuthUser} onUpVote={mockOnUpVote} onDownVote={mockOnDownVote} />
      </BrowserRouter>,
    );

    // Assert
    // Tombol upvote berisi text "👍 2"
    const upVoteButton = screen.getByRole('button', { name: /👍/ });
    expect(upVoteButton).toHaveTextContent('2');

    // Tombol downvote berisi text "👎 1"
    const downVoteButton = screen.getByRole('button', { name: /👎/ });
    expect(downVoteButton).toHaveTextContent('1');
  });

  // Skenario 3: Memanggil fungsi onUpVote saat tombol up-vote diklik
  it('should call onUpVote function with comment id when up-vote button is clicked', () => {
    // Arrange
    render(
      <BrowserRouter>
        <CommentItem {...mockComment} authUser={mockAuthUser} onUpVote={mockOnUpVote} onDownVote={mockOnDownVote} />
      </BrowserRouter>,
    );
    const upVoteButton = screen.getByRole('button', { name: /👍/ });

    // Action
    fireEvent.click(upVoteButton);

    // Assert
    expect(mockOnUpVote).toHaveBeenCalledWith(mockComment.id);
  });

  // Skenario 4: Memanggil fungsi onDownVote saat tombol down-vote diklik
  it('should call onDownVote function with comment id when down-vote button is clicked', () => {
    // Arrange
    render(
      <BrowserRouter>
        <CommentItem {...mockComment} authUser={mockAuthUser} onUpVote={mockOnUpVote} onDownVote={mockOnDownVote} />
      </BrowserRouter>,
    );
    const downVoteButton = screen.getByRole('button', { name: /👎/ });

    // Action
    fireEvent.click(downVoteButton);

    // Assert
    expect(mockOnDownVote).toHaveBeenCalledWith(mockComment.id);
  });
});
