'use client';
import { BatchStatus } from '@prisma/client';
import React from 'react';
import { Batch } from '../services/dto/service-batch.dto';
import { Api } from '../services';

export const useBatchList = (statuses?: BatchStatus[], take = 10) => {
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [skip, setSkip] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [loadingInitial, setLoadingInitial] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);

  const loadBatches = async (customSkip?: number, reset = false) => {
    if (loading) return;
    setLoading(true);

    const currentSkip = customSkip ?? skip;

    try {
      const data = await Api.batch.getBatches(statuses, take, currentSkip);

      setBatches((prev) => (reset ? data : [...prev, ...data]));
      setSkip(currentSkip + take);
      setHasMore(data.length === take);
    } finally {
      setLoading(false);
      setLoadingInitial(false);
    }
  };

  const refetch = () => {
    setBatches([]);
    setSkip(0);
    setHasMore(true);
    loadBatches(0, true);
  };

  // загружаем при первом монтировании
  React.useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(statuses)]);

  return { loading, loadingInitial, batches, loadBatches, hasMore, refetch };
};
