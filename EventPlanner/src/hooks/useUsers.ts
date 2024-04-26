import useSWR from "swr";

type Users = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdEvents: unknown; // You can define the type for these properties as well if needed
  eventsAttending: unknown;
}[];

export const useUser = () => {
  const { data, isLoading, error } = useSWR<Users>(
    "https://localhost:7142/api/users"
  );
  return { data, isLoading, error };
};
