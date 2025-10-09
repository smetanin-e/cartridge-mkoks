import { AddUser, Header } from '@/shared/components';
import { UsersList } from '@/shared/components/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';

export default async function Admin() {
  return (
    <div>
      <Header title='Администрирование' description='Управление пользователями и их ролями' />
      <Card>
        <CardHeader className='flex items-center justify-between'>
          <CardTitle>Список пользователей</CardTitle>
          <AddUser />
        </CardHeader>
        <CardContent>
          <UsersList />
        </CardContent>
      </Card>
    </div>
  );
}
