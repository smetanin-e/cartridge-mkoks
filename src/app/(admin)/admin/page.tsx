import { AddUser, Logo, Profile } from '@/shared/components';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';

export default async function Admin() {
  return (
    <div>
      {' '}
      <div className='flex items-center gap-4 mb-6'>
        <Logo width={60} height={60} />
        <div className='flex-1'>
          <h1 className='text-3xl font-bold'>Администрирование пользователей</h1>
          <p className='text-muted-foreground'>Управление пользователями и их ролями</p>
        </div>
        <AddUser />
        {/* <Profile  /> */}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
        </CardHeader>
        <CardContent>
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
              {/* {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? "Пользователи не найдены" : "Нет пользователей"}
                  </TableCell>
                </TableRow>
              ) : ( */}
              {/* filteredUsers.map((user) => ( */}
              <TableRow>
                <TableCell>
                  <div className='font-medium'>{`Иванов Иван Иванович`}</div>
                </TableCell>
                <TableCell>ivanov.i</TableCell>
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
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {/* <Switch checked={true} onCheckedChange={(checked) => console.log('')} /> */}
                    <span>Активен</span>
                  </div>
                </TableCell>
              </TableRow>
              {/* )) */}
              {/* )} */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
