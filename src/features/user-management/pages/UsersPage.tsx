import { Loader } from '../../../shared/components/Loader';
import { UserFilters } from '../components/UserFilters';
import { UserTable } from '../components/UserTable';
import { useUsers } from '../hooks/useUsers';
import './UsersPage.css';

export const UsersPage = () => {
  const { filteredUsers, loading, searchTerm, setSearchTerm } = useUsers();

  return (
    <main className="users-page">
      <h1>Lista de Usuarios</h1>
      <UserFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {loading ? <Loader /> : <UserTable users={filteredUsers} />}
    </main>
  );
};
