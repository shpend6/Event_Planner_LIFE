import useSWR from "swr";

type Event = {
  id: number;
  userId: number;
  organization: string;
  title: string;
  description: string;
  state: string;
  location: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  imagePath: string;
  categoryId: number;
  user: string;
  category: string;
  attendees: number;
};

// type EventsAttending = {
//   userId: string;
//   events: Event[];
// };
export const useEventsAttending = (userId: string) => {
  const { data, isLoading, error } = useSWR<Event[]>(
    `https://localhost:7142/api/users/${userId}/events-attending`
  );
  return { data, isLoading, error };
};
