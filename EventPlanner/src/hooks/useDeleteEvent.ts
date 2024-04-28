async function deleteEvent(eventId: string, bearerToken: string) {
  const endpoint = `https://localhost:7142/api/events/${eventId}`;
  const requestData = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(endpoint, requestData);
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    const responseData = await response.text(); // Read response as text
    return responseData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
}

export default deleteEvent;
