async function joinEvent(eventId: string, bearerToken: string) {
  const endpoint = `https://localhost:7142/api/events/${eventId}/join`;
  const requestData = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(endpoint, requestData);
    if (!response.ok) {
      throw new Error("Failed to join event");
    }
    const responseData = await response.text(); // Read response as text
    return responseData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
}

export default joinEvent;
