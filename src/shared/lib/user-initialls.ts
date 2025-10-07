export const userInitials = (name: string) => {
  return name
    .split(' ')
    .reverse()
    .map((n) => n[0])
    .join('')
    .slice(1, 3)
    .toUpperCase();
};
