import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'react-use';
import { Api } from '../services';
import React from 'react';
import { ReplacementsDTO } from '../services/dto/replacements.dto';

export const useReplacementList = (search: string, take = 10) => {
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    500,
    [search],
  );

  const query = useInfiniteQuery<ReplacementsDTO[]>({
    initialPageParam: 0,
    queryKey: ['replacements', { search: debouncedSearch, take }],
    queryFn: async ({ pageParam = 0 }) => {
      return Api.replacement.getReplacements(search, take, pageParam as number);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === take ? allPages.length * take : undefined;
    },
    staleTime: 30_000,
  });

  const replacements = query.data?.pages.flat() ?? [];

  return {
    replacements,
    loading: query.isFetchingNextPage,
    loadingInitial: query.isLoading,
    hasMore: query.hasNextPage,
    loadReplacemens: query.fetchNextPage,
    refetch: query.refetch,
  };
};
