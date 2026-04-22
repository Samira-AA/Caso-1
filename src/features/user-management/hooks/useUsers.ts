import { useEffect, useMemo, useState } from 'react';
import { userService } from '../services/userService';
import { createInitialUsersState } from '../state/userStore';
import { matchUserName } from '../utils/matchUserName';

export const useUsers = () => {
  const initialState = useMemo(() => createInitialUsersState(), []);
  const [users, setUsers] = useState(initialState.users);
  const [searchTerm, setSearchTerm] = useState(initialState.searchTerm);
  const [loading, setLoading] = useState(initialState.loading);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => matchUserName(user, searchTerm));
  }, [users, searchTerm]);

  return {
    users,
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
  };
};
