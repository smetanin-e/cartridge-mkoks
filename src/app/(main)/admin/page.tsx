import { AddUser, Header } from '@/shared/components';
import {
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
      <Header title='Администрирование' description='Управление пользователями и их ролями' />
      <Card>
        <CardHeader className='flex items-center justify-between'>
          <CardTitle>Список пользователей</CardTitle>
          <AddUser />
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
