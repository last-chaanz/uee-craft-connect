import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { API_BASE_URL } from "@env"; // Replace with your actual API base URL

const getAuthHeader = async () => {
  const token = await AsyncStorage.getItem("authToken");
  //   console.log(token);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const chatService = {
  getAllChats: async () => {
    try {
      const config = await getAuthHeader();
      const response = await axios.get(`${API_BASE_URL}/api/chats`, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  },

  getAllSellers: async () => {
    try {
      const config = await getAuthHeader();
      const response = await axios.get(`${API_BASE_URL}/api/sellers`, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching sellers:", error);
      throw error;
    }
  },

  startOrContinueChat: async (recipientId, message) => {
    try {
      const config = await getAuthHeader();
      const response = await axios.post(
        `${API_BASE_URL}/api/chat`,
        {
          recipientId,
          message,
        },
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error starting/continuing chat:", error);
      throw error;
    }
  },

  markChatAsRead: async (chatId) => {
    try {
      const config = await getAuthHeader();
      const response = await axios.put(
        `${API_BASE_URL}/api/chats/${chatId}/read`,
        {},
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error marking chat as read:", error);
      throw error;
    }
  },

  getChatById: async (chatId) => {
    try {
      const config = await getAuthHeader();
      const response = await axios.get(
        `${API_BASE_URL}/api/chats/${chatId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching chat details:", error);
      throw error;
    }
  },
};
