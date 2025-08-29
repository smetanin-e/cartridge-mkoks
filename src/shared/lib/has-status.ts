// Функция, которая проверяет есть ли статус в переданном объекте

export function hasStatus(opt: object): opt is { status: string } {
  return 'status' in opt;
}
