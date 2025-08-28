import React from 'react';
import {
  Badge,
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
import { CreateDepartament, Replacement } from '@/shared/components';
import { Edit } from 'lucide-react';
import { useCartridgeStore } from '@/shared/store/cartridges';
import { CartridgeStatus } from '@prisma/client';
import { useDepartamentStore } from '../store/departaments';

interface Props {
  className?: string;
}

export const ReplacementsTable: React.FC<Props> = () => {
  const [popupReplacement, setPopupReplacement] = React.useState(false);
  const [popupDepartament, setPopupDepartament] = React.useState(false);

  const { cartridges, getCartriges } = useCartridgeStore();
  const { departaments, getDepartaments } = useDepartamentStore();

  React.useEffect(() => {
    getCartriges();
    getDepartaments();
  }, []);
  const avaibleCartridges = cartridges.filter(
    (cartridge) => cartridge.status === CartridgeStatus.AVAILABLE,
  );
  const workingCartridges = cartridges.filter(
    (cartridge) => cartridge.status === CartridgeStatus.WORKING,
  );
  return (
    <>
      <Card className='mt-6'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>История замен</CardTitle>
            <Button
              onClick={() => setPopupReplacement(true)}
              variant='outline'
              className='flex items-center gap-2'
            >
              <Edit className='h-4 w-4' />
              Замена картриджа
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className='odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors'>
                <TableHead>Дата</TableHead>
                <TableHead>Подразделение</TableHead>
                <TableHead>Установлен</TableHead>
                <TableHead>Снят</TableHead>
                <TableHead>Ответственный</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>26.08.2025</TableCell>
                <TableCell>ОТИС</TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-orange-50 text-orange-700'>
                    МК129(CE505X)
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-purple-50 text-purple-700'>
                    МК125(CE505A)
                  </Badge>
                </TableCell>
                <TableCell>Сметанин Е.Е.</TableCell>
              </TableRow>

              <TableRow className='odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors'>
                <TableCell>26.08.2025</TableCell>
                <TableCell>ОТИС</TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-orange-50 text-orange-700'>
                    МК129(CE505X)
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-purple-50 text-purple-700'>
                    МК125(CE505A)
                  </Badge>
                </TableCell>
                <TableCell>Сметанин Е.Е.</TableCell>
              </TableRow>
              <TableRow className='odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors'>
                <TableCell>26.08.2025</TableCell>
                <TableCell>ОТИС</TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-orange-50 text-orange-700'>
                    МК129(CE505X)
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-purple-50 text-purple-700'>
                    МК125(CE505A)
                  </Badge>
                </TableCell>
                <TableCell>Сметанин Е.Е.</TableCell>
              </TableRow>
              <TableRow className='odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors'>
                <TableCell>26.08.2025</TableCell>
                <TableCell>ОТИС</TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-orange-50 text-orange-700'>
                    МК129(CE505X)
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-purple-50 text-purple-700'>
                    МК125(CE505A)
                  </Badge>
                </TableCell>
                <TableCell>Сметанин Е.Е.</TableCell>
              </TableRow>
              <TableRow className='odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors'>
                <TableCell>26.08.2025</TableCell>
                <TableCell>ОТИС</TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-orange-50 text-orange-700'>
                    МК129(CE505X)
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-purple-50 text-purple-700'>
                    -------------
                  </Badge>
                </TableCell>
                <TableCell>Сметанин Е.Е.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Попап замены картриджа */}
      <Replacement
        open={popupReplacement}
        onOpenChange={setPopupReplacement}
        avaibleCartridges={avaibleCartridges}
        workingCartridges={workingCartridges}
        departaments={departaments}
        setPopupDepartament={setPopupDepartament}
      />
      {/* Попап добавления нового подразделения*/}
      <CreateDepartament open={popupDepartament} onOpenChange={setPopupDepartament} />
    </>
  );
};
