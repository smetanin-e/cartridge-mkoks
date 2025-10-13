'use client';
import React from 'react';
import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { useAgentStore } from '@/shared/store/agents';
import { LoadingBounce } from '../loading-bounce';
import { KeyRound, Minus, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { toggleAgentStatus } from '@/app/(main)/admin/actions';
import { DeleteUser } from './delete-user';
import { AuthUser } from '@/shared/services/dto/agent.dto';
import { UpdateUser } from '../modals';
import { ChangePassword } from '../modals/change-password';

interface Props {
  className?: string;
  admin: AuthUser;
}

export const UsersList: React.FC<Props> = ({ admin }) => {
  const { agents, getAgents, loadingItems } = useAgentStore();

  const [loading, setLoading] = React.useState(false);

  const toggleStatus = async (id: number, currentUserId: number) => {
    try {
      setLoading(true);
      const res = await toggleAgentStatus(id, currentUserId);
      if (res?.message) {
        toast.error(res.message);
        return;
      }
      useAgentStore.getState().getAgents();
    } catch (error) {
      console.error(error, '[Server error] Ошибка изменения статуса');
      toast.error('Ошибка изменения статуса');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='relative min-h-[210px]'>
      {loadingItems ? (
        <LoadingBounce />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ФИО</TableHead>
              <TableHead>Логин</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead className=' w-40'>Статус</TableHead>
              <TableHead className='text-right'>Управление</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>Нет пользователей</div>
            ) : (
              agents.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='flex items-center gap-4'>
                    <div className='font-medium'>{`${user.surname} ${user.firstName} ${user.lastName}`}</div>
                    {admin?.id === user.id && <Shield className='h-5 w-5' color='green' />}
                  </TableCell>
                  <TableCell>{user.login}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Switch
                        checked={user.status}
                        disabled={loading || user.id === admin.id}
                        onCheckedChange={() => toggleStatus(user.id, admin.id)}
                        className='data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-400'
                      />
                      <span>{user.status ? 'Активен' : 'Заблокирован'}</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-right flex gap-4 justify-end'>
                    {user.id === admin.id ? (
                      <div className='flex  items-center gap-4'>
                        <div className='h-8 w-8 p-0 flex items-center'>
                          <Minus className='h-4 w-8 ' />
                        </div>
                        <div className='h-8 w-8 p-0 flex items-center'>
                          <Minus className='h-4 w-8 ' />
                        </div>
                      </div>
                    ) : (
                      <>
                        <UpdateUser user={user} />
                        <DeleteUser
                          loading={loading}
                          setLoading={setLoading}
                          id={user.id}
                          currentUserId={admin.id}
                        />
                      </>
                    )}
                    <div className='flex items-center justify-center'>
                      <ChangePassword id={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}{' '}
    </div>
  );
};
