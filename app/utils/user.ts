export const getProfileURL = (id?: string | undefined): string => {
  if (id) {
    return `/u/${id}`;
  }
  return "";
};
