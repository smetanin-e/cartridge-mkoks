//Функция принимает строку типа date "2025-01-30"
//Возвращает "30.01.2025"

export const convertDate = (date: string) => {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
};
