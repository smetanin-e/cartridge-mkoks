import React from 'react';
import { LoadingBounce } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { ChevronsDown } from 'lucide-react';

interface Props {
  className?: string;
  showMore: boolean;
  loading: boolean;
  loadItems: () => void;
}

export const ShowMore: React.FC<Props> = ({ showMore, loading, loadItems }) => {
  return (
    <div className='pt-4 text-center absolute bottom-[8px] left-[50%]'>
      {showMore && (
        <>
          {loading ? (
            <div className='relative pb-8'>
              <LoadingBounce />
            </div>
          ) : (
            <Button
              className='translate-x-[-50%]'
              size='sm'
              disabled={loading}
              variant='ghost'
              onClick={() => loadItems()}
            >
              <ChevronsDown />
            </Button>
          )}
        </>
      )}
    </div>
  );
};
