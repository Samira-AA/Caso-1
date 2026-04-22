import type { User } from '../types/user.types';
import './UserTable.css';

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  return (
    <ul className="user-table" aria-label="user list">
      {users.map((user) => (
        <li className="user-row" key={user.id}>
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </li>
      ))}
    </ul>
  );
};
