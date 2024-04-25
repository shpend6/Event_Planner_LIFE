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

type EventsFromCategory = {
  categoryName: string;
  events: Event[];
};

export const useEventsFromCategory = (categoryName: string) => {
  const { data, isLoading, error } = useSWR<EventsFromCategory>(
    `https://localhost:7142/api/events/by-category/${categoryName}`
  );
  return { data, isLoading, error };
};
