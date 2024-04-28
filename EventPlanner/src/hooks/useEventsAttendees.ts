import useSWR from "swr";

type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  joinedAt: string;
};

// This type now represents an array of User
const useEventAttendees = (eventId: number) => {
  console.log("Event id sent to hook: ", eventId);
  const { data, error, isLoading } = useSWR<User[]>(
    `https://localhost:7142/api/events/${eventId}/attendees`
  );

  console.log("Data received:", data);
  console.log("Error:", error);

  return { data, isLoading, error };
};
export default useEventAttendees;
