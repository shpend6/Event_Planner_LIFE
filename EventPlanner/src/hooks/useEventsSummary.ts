import useSWR from "swr";

type EventsSummary = {
    ImagePath: string;
    title: string;
    organisation: string;
    startTime: string;
}[];

export const useEventsSummary = () => {
  const { data, isLoading, error } = useSWR<EventsSummary>(
    "https://localhost:7142/api/events-summary"
  );
  return { data, isLoading, error };
};
