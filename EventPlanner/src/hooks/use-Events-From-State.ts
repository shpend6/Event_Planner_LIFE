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

type EventsFromState = {
  token: string;
  events: Event[];
};

export const useEventsFromState = (token: string) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Adding Bearer JWT token to headers
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };
  const { data, isLoading, error } = useSWR<EventsFromState>(
    `https://localhost:7142/api/events/by-state`,
    fetcher
  );
  return { data, isLoading, error };
};
