import { AddUser, Header } from '@/shared/components';
import { UsersList } from '@/shared/components/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { getMe } from '@/shared/services/auth/get-me';

export default async function Admin() {
  const admin = await getMe();
  if (!admin) return null;
  return (
    <div>
      <Header title='Администрирование' description='Управление пользователями и их ролями' />
      <Card>
        <CardHeader className='flex items-center justify-between'>
          <CardTitle>Список пользователей</CardTitle>
          <AddUser />
        </CardHeader>
        <CardContent>
          <UsersList admin={admin} />
        </CardContent>
      </Card>
    </div>
  );
}
