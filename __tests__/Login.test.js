import React from 'react';
import axios from 'axios';
import Login from '../src/components/Login';
import store from '../src/app/store';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('axios');

describe('Login Component'),
  () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Login />
        </Provider>
      );
    });

    it('renders correctly', () => {
      expect(screen.getByText(/Welcome to Postcard!/i)).toBeInTheDocument();
    });

    it('updates username and password fields correctly', () => {
      fireEvent.change(screen.getByPlaceholderText('Username'), {
        target: { value: 'testUser' },
      });
      fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: 'testPassword' },
      });

      expect(screen.getByPlaceholderText('Username').value).toBe('testUser');
      expect(screen.getByPlaceholderText('Password').value).toBe(
        'testPassword'
      );
    });

    it('handles successful login', async () => {
      axios.post.mockResolvedValueOnce({
        status: 200,
        data: { id: 1, name: 'testUser' },
      });

      fireEvent.click(screen.getByText('LOGIN'));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/login', {
          username: 'testUser',
          password: 'testPassword',
        });
      });
    });

    it('displays error on failed login', async () => {
      axios.post.mockRejectedValueOnce(new Error('failed login'));

      fireEvent.click(screen.getByText('LOGIN'));

      const errorMessage = await screen.findByText(
        'Incorrect username or password'
      );
      expect(errorMessage).toBeInTheDocument();
    });
  };
