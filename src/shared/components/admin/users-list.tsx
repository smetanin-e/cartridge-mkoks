'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { useAgentStore } from '@/shared/store/agents';
import { LoadingBounce } from '../loading-bounce';
interface Props {
  className?: string;
}

export const UsersList: React.FC<Props> = () => {
  const { agents, getAgents, loading } = useAgentStore();

  React.useEffect(() => {
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <LoadingBounce />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ФИО</TableHead>
              <TableHead>Логин</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>Нет пользователей</div>
            ) : (
              agents.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className='font-medium'>{`${user.surname} ${user.firstName} ${user.lastName}`}</div>
                  </TableCell>
                  <TableCell>{user.login}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    <div className='flex items-center gap-2'>
                      {/* <Switch checked={true} onCheckedChange={(checked) => console.log('')} /> */}
                      <span>{user.status ? 'Активен' : 'Заблокирован'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* <Select value={'1'} onValueChange={(value) => console.log(value)}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'1'}>Пользователь</SelectItem>

                      <SelectItem value={'2'}>Администратор</SelectItem>
                    </SelectContent>
                  </Select> */}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}{' '}
    </>
  );
};
