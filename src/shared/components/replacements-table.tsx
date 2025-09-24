import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { ClearButton, LoadingBounce, Replacement } from '@/shared/components';
import { ChevronsDown, Search } from 'lucide-react';
import { useCartridgeStore } from '@/shared/store/cartridges';
import { CartridgeStatus } from '@prisma/client';
import { useDepartamentStore } from '../store/departaments';
import { useReplacementList } from '../hooks';

interface Props {
  className?: string;
}

export const ReplacementsTable: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, loadReplacemens, loadingInitial, replacements, hasMore } = useReplacementList(
    searchValue,
    9,
  );

  const [submiting, setSubmiting] = React.useState(false);

  const { cartridges, getCartriges } = useCartridgeStore();
  const { departaments, getDepartaments } = useDepartamentStore();

  const currentModel = (number: string) => {
    return cartridges.find((cartrige) => cartrige.number === number)?.model?.model;
  };

  const onClickClear = () => {
    setSearchValue('');
  };

  React.useEffect(() => {
    getDepartaments();
  }, []);

  React.useEffect(() => {
    getCartriges();
  }, [submiting]);

  const avaibleCartridges = cartridges.filter(
    (cartridge) => cartridge.status === CartridgeStatus.AVAILABLE,
  );
  const workingCartridges = cartridges.filter(
    (cartridge) => cartridge.status === CartridgeStatus.WORKING,
  );

  return (
    <>
      <Card className='mt-6 p-0 overflow-hidden pb-12 relative'>
        <CardHeader className='pb-5 pt-4 bg-card-header'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-10'>
              {' '}
              <CardTitle>История замен</CardTitle>
              <div className='relative '>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Поиск...'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className='pl-10 bg-white '
                />
                {searchValue && <ClearButton onClick={onClickClear} />}
              </div>
            </div>

            {/* Попап замены картриджа */}
            <Replacement
              avaibleCartridges={avaibleCartridges}
              workingCartridges={workingCartridges}
              departaments={departaments}
              setSubmiting={setSubmiting}
            />
          </div>
        </CardHeader>
        <div className='min-h-[50px] relative'>
          {loadingInitial ? (
            <LoadingBounce />
          ) : (
            <CardContent>
              {replacements.length === 0 ? (
                <div className='text-center py-8 text-muted-foreground'>Ничего не найдено</div>
              ) : (
                <div className='max-h-[460px] overflow-auto overflow-y-scroll'>
                  <Table>
                    <TableHeader>
                      <TableRow className=''>
                        <TableHead>Дата</TableHead>
                        <TableHead>Подразделение</TableHead>
                        <TableHead>Установлен</TableHead>
                        <TableHead>Снят</TableHead>
                        <TableHead>Ответственный</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {replacements.map((rep) => (
                        <TableRow key={rep.id} className=''>
                          <TableCell>{rep.date}</TableCell>
                          <TableCell>{rep.departament.name}</TableCell>
                          <TableCell>
                            {rep.installedCartridgeNumber ? (
                              <Badge variant='outline' className=' text-green-500 text-md'>
                                <p>
                                  {rep.installedCartridgeNumber}
                                  <span className='text-primary'>
                                    {' - '}({currentModel(rep.installedCartridgeNumber)})
                                  </span>
                                </p>
                              </Badge>
                            ) : (
                              <Badge variant='outline' className='bg-secondary  text-md'>
                                <span>Отсутствует</span>
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant='outline' className=' text-red-500 text-md'>
                              {rep.removedCartridgeNumber ? (
                                <p>
                                  {rep.removedCartridgeNumber}
                                  <span className='text-primary'>
                                    {' - '}({currentModel(rep.removedCartridgeNumber)})
                                  </span>
                                </p>
                              ) : (
                                `Отсутствует`
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>{rep.responsible}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          )}
        </div>
        <div className='pt-4 text-center absolute bottom-[8px] left-[50%]'>
          {hasMore && (
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
                  onClick={() => loadReplacemens()}
                >
                  <ChevronsDown />
                </Button>
              )}
            </>
          )}
        </div>
      </Card>
    </>
  );
};
