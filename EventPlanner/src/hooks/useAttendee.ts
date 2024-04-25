import useSWR from "swr";

type EventId = {
  id: number;
};

export const useAttendee = ({ id }: EventId, token: string) => {
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

  const { data, isLoading, error } = useSWR<boolean>(
    `https://localhost:7142/api/events/${id}`,
    fetcher // Using fetcher function
  );

  return { data, isLoading, error };
};
