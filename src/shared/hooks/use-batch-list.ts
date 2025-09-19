'use client';
import { BatchStatus } from '@prisma/client';
import { Batch } from '../services/dto/service-batch.dto';
import { Api } from '../services';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useBatchList = (statuses?: BatchStatus[], take = 10) => {
  const query = useInfiniteQuery<Batch[]>({
    initialPageParam: 0,
    queryKey: ['batches', { statuses, take }],
    queryFn: async ({ pageParam = 0 }) => {
      return Api.batch.getBatches(statuses, take, pageParam as number);
    },

    getNextPageParam: (lastPage, allPages) => {
      // если получили меньше чем take — значит страниц больше нет
      return lastPage.length === take ? allPages.length * take : undefined;
    },
    staleTime: 30_000,
  });

  const batches = query.data?.pages.flat() ?? [];

  return {
    batches,
    loading: query.isFetchingNextPage, // для кнопки "Загрузить ещё"
    loadingInitial: query.isLoading, // для скелетона при первом рендере
    hasMore: query.hasNextPage,
    loadBatches: query.fetchNextPage,
    refetch: query.refetch,
  };
};
