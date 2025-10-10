'use server';
import { prisma } from '@/shared/lib';
import { UpdateUserType } from '@/shared/schemas/update-user-schema';

export const toggleAgentStatus = async (userId: number, currentUserId: number) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }
    if (user.id === currentUserId) {
      return { success: false, message: 'Нельзя изменить статус себе' };
    }
    const status = !user.status;
    await prisma.user.update({ where: { id: user.id }, data: { status } });
    return { success: true };
  } catch (error) {
    console.log('[toggleUserStatus] Server error', error);
    return { success: false, message: 'Ошибка на сервере' };
  }
};

export const deleteAgent = async (userId: number, currentUserId: number) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }
    if (user.id === currentUserId) {
      return { success: false, message: 'Нельзя удалить собственную учетную запись' };
    }

    await prisma.user.delete({ where: { id: user.id } });
    return { success: true };
  } catch (error) {
    console.log('[deleteUser] Server error', error);
    return { success: false, message: 'Ошибка на сервере' };
  }
};

export const updateAgent = async (formData: UpdateUserType, currentUserId: number) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: formData.id } });
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }
    if (user.id === currentUserId) {
      return { success: false, message: 'Запрещено обновлять собственную учетную запись' };
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        surname: formData.surname,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      },
    });
    return { success: true };
  } catch (error) {
    console.log('[updateAgent] Server error', error);
    return { success: false, message: 'Ошибка на сервере' };
  }
};
