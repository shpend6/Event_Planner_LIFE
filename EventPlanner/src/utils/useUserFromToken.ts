import { jwtDecode } from "jwt-decode";

// Define a type interface for the decoded token
interface DecodedToken {
  userId: string;
  userRole: string;
  userName: string;
  // Add more properties as needed based on your token structure
}

// Function to decode the JWT token and extract user information
export const getUserInfoFromToken = (): DecodedToken | null => {
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
