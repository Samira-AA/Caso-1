import type { User } from '../types/user.types';

export const matchUserName = (user: User, query: string): boolean => {
  return user.name.toLowerCase().includes(query.toLowerCase());
};
