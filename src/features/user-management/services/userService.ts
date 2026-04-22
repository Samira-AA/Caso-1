import { httpClient } from '../../../shared/services/httpClient';
import type { User } from '../types/user.types';

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await httpClient.get<User[]>('/users');

    return response.data.map(({ id, name, email }) => ({ id, name, email }));
  },
};
