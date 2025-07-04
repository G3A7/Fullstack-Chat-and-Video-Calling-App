import { StreamChat } from "stream-chat";
import "dotenv/config";
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRETE;
if (!apiKey || !apiSecret) {
  console.log("Stream API key or secret is not set in environment variables.");
}
const streamClient = StreamChat.getInstance(apiKey, apiSecret);
export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user------:", error);
    // throw new Error("Failed to upsert Stream user");
  }
};

export const generateStreamToken = async (userId) => {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
