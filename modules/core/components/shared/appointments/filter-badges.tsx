import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { memo } from 'react';

export const FilterBadges = memo(
  ({
    filters,
    selectedFilter,
    onFilterSelect
  }: {
    filters: any[];
    selectedFilter: string;
    onFilterSelect: (filter: string) => void;
  }) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row"
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
      }}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.label}
          className={`px-4 py-2 rounded-full border ${
            selectedFilter === filter.label
              ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
              : 'border-gray-200'
          }`}
          onPress={() => onFilterSelect(filter.label)}
        >
          <Text
            className={`text-sm font-medium ${
              selectedFilter === filter.label ? 'text-indigo-700' : ''
            }`}
          >
            {filter.label} ({filter.count})
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
);

FilterBadges.displayName = 'FilterBadges';
