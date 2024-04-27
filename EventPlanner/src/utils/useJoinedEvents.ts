import { jwtDecode } from "jwt-decode";
//Shpend check this

// Define a type interface for the decoded token
interface DecodedToken {
  userId: string;
  username: string;
  title: string;
  organization: string;
  description: string;
  starttime: string;
  imagePath: string;
}

// Function to decode the JWT token and extract user information
export const getJoinedEvents = (): DecodedToken | null => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      return decodedToken;

    } catch (error) {
      // Handle decoding errors, token tampering, or invalid tokens
      console.error("Error decoding token:", error);
      return null;
    }
  } else {
    // Handle case where token is not present
    console.error("Token not found in local storage");
    return null;
  }
};
