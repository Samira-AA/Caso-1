import type { UsersState } from '../types/user.types';

export const createInitialUsersState = (): UsersState => ({
  users: [],
  filteredUsers: [],
  searchTerm: '',
  loading: true,
});
