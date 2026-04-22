export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UsersState {
  users: User[];
  filteredUsers: User[];
  searchTerm: string;
  loading: boolean;
}
