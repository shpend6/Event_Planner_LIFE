import useSWR from "swr";

type Events = {
  id: number;
  userId: number;
  title: string;
  description: string;
  location: string;
  scheduledTime: string;
  maxCapacity: number;
}[];

export const useEvents = () => {
  const { data, isLoading, error } = useSWR<Events>(
    "https://localhost:7142/api/events"
  );
  return { data, isLoading, error };
};
