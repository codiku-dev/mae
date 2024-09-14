import { SearchSuggestionTag } from '@/renderer/hooks/use-app-store';

interface SuggestionAutoCompleterProps {
  filteredSuggestions: SearchSuggestionTag[];
  selectedSuggestionIndex: number;
  onSubmit: (suggestionTag: SearchSuggestionTag) => void;
}

export const SuggestionAutoCompleter: React.FC<
  SuggestionAutoCompleterProps
> = ({ filteredSuggestions, selectedSuggestionIndex, onSubmit }) => {
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
      <ul className="py-1">
        {filteredSuggestions.map((suggestionTag, index) => (
          <li
            key={suggestionTag}
            className={`px-3 py-2 cursor-pointer ${
              index === selectedSuggestionIndex ? 'bg-blue-100' : ''
            }`}
            onClick={() => onSubmit(suggestionTag)}
          >
            @{suggestionTag}
          </li>
        ))}
      </ul>
    </div>
  );
};
