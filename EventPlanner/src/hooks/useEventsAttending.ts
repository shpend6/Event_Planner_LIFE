/*import useSWR from "swr";
//Shpend check this 
type Events = {
  id: number;
  userId: number;
  organization: string,
  title: string,
  description: string,
  state: string;
  location: string,
  startTime: string,
  endTime: string,
  maxCapacity: number,
  imagePath: string,
  categoryId: number,
  user: string,
  category: string,
  attendees: number
}[];

export const useUser = () => {
  const { data, isLoading, error } = useSWR<Events>(
    `https://localhost:7142/api/users/${userid}/events-attending`
  );
  return { data, isLoading, error };
};*/
