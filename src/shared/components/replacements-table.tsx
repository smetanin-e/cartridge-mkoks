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
import { useReplacementStore } from '../store/replacement';

interface Props {
  className?: string;
}

export const ReplacementsTable: React.FC<Props> = () => {
  const [popupReplacement, setPopupReplacement] = React.useState(false);
  const [popupDepartament, setPopupDepartament] = React.useState(false);

  const { cartridges, getCartriges } = useCartridgeStore();
  const { departaments, getDepartaments } = useDepartamentStore();
  const { replacements, getReplacements } = useReplacementStore();

  const currentModel = (number: string) => {
    return cartridges.find((cartrige) => cartrige.number === number)?.model?.model;
  };

  React.useEffect(() => {
    getCartriges();
    getDepartaments();
    getReplacements();
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
              <TableRow className='bg-gray-100'>
                <TableHead>Дата</TableHead>
                <TableHead>Подразделение</TableHead>
                <TableHead>Установлен</TableHead>
                <TableHead>Снят</TableHead>
                <TableHead>Ответственный</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {replacements.map((rep) => (
                <TableRow
                  key={rep.id}
                  className='odd:bg-white even:bg-gray-50 hover:bg-grey-100 transition-colors'
                >
                  <TableCell>{rep.date}</TableCell>
                  <TableCell>{rep.departament.name}</TableCell>
                  <TableCell>
                    <Badge variant='outline' className='bg-orange-50 text-orange-700 text-md'>
                      {rep.installedCartridgeNumber ? (
                        <p>
                          {rep.installedCartridgeNumber}{' '}
                          <span className='text-primary'>
                            ({currentModel(rep.installedCartridgeNumber)})
                          </span>
                        </p>
                      ) : (
                        `Отсутствует`
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className='bg-purple-1 text-purple-700 text-md'>
                      {rep.removedCartridgeNumber ? (
                        <p>
                          {rep.removedCartridgeNumber}{' '}
                          <span className='text-primary'>
                            ({currentModel(rep.removedCartridgeNumber)})
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
