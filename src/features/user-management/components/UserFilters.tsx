import { SearchBar } from '../../../shared/components/SearchBar';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const UserFilters = ({ searchTerm, onSearchChange }: UserFiltersProps) => {
  return (
    <SearchBar
      value={searchTerm}
      onChange={onSearchChange}
      placeholder="Buscar por nombre..."
    />
  );
};
