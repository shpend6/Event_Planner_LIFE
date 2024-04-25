import useSWR from "swr";

type Event = {
  id: number;
  userId: number;
  title: string;
  organization: string;
  imagePath: string;
  description: string;
  state: string;
  location: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
};

export const useEvent = (id: number) => {
  const { data, error } = useSWR<Event>(
    `https://localhost:7142/api/events/${id}`
  );

  return {
    event: data,
    isLoading: !error && !data,
    isError: error,
  };
};
