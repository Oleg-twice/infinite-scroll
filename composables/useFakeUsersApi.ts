import { faker } from '@faker-js/faker';
import { useInfiniteQuery } from '@tanstack/vue-query';

type Params = { pageParam: number };
type Response = { users: User[], offset: number, itemsCount: number };

export function sleep(ms: number = 100) {
  let timeout: ReturnType<typeof setTimeout>;

  const promise = new Promise(function(resolve) {
    timeout = setTimeout(function() {
      resolve('timeout done');
    }, ms);
  }); 

  return {
    promise: promise, 
    cancel: () => {
      clearTimeout(timeout);
    }
  };
}

const createUser = (): User => ({
  _id: faker.string.uuid(),
  avatar: faker.image.avatarLegacy(),
  website: faker.internet.domainName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  numberOfViews: faker.number.int({ min: 10, max: 150000})
});

const createDB = (amount: number) => Array.from({ length: amount }).map(() => createUser());

let loading = ref();;

export const fetchUsers = async ({ pageParam }: Params): Promise<Response> => {
  const { promise, cancel } = sleep(700);

  loading.value = true;

  const users = await promise.then(() => createDB(pageParam)).finally(() => {
    cancel();
    loading.value = false;
  });

  return { users, offset: pageParam, itemsCount: 1500 }
};

export const useFakeUsersApi = (searchQuery: Ref<Query>) => {
  const { data, fetchNextPage, hasNextPage, suspense, isLoading, ...rest } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async (pageParam) => await fetchUsers({ ...pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.offset + 10 > lastPage.itemsCount) {
        return undefined;
      }

      return lastPage.offset + 10;
    },
    initialPageParam: 10,
  });

  const usersData = computed({
    get: () => {
      const rawData = toRaw(data.value)?.pages || [];
      const currentSearchQuery = toRaw(searchQuery.value);
      const res = rawData.reduce<User[]>((acc, { users }) => [...acc, ...users], []) || [];

      return [...res].sort((a, b) => currentSearchQuery.sortBy === 'asc'
        ? (a as any)[currentSearchQuery.sortKey] - (b as any)[currentSearchQuery.sortKey]
        : (b as any)[currentSearchQuery.sortKey] - (a as any)[currentSearchQuery.sortKey])
    },
    set: (data) => data,
  });

  return { usersData, fetchNextPage, hasNextPage, suspense, isLoading: loading, ...rest };
}
