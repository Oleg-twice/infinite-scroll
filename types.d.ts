export { User, Query }

declare global {
  interface User {
    _id: string;
    avatar: string;
    website: string,
    firstName: string;
    lastName: string;
    numberOfViews: number,
    [key as string]: string,
  }

  type Query = { sortBy: 'asc' | 'desc', sortKey: keyof User };
}