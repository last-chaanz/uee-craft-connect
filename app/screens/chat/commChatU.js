import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { chatService } from "./chatService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const currentUser = {
//   _id: "6702dd54f905a6f44ca51f3c",
//   name: "Prathila",
//   email: "prathila@gmail.com",
//   role: "seller",
// };

const CommunityChatU = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const [token, userJson] = await Promise.all([
        AsyncStorage.getItem("authToken"),
        AsyncStorage.getItem("currentUser"),
        // console.log("first\n", userJson),
      ]);

      if (!token || !userJson) {
        navigation.replace("LoginScreen");
        return;
      }

      const userData = JSON.parse(userJson);
      setCurrentUser(userData);
      //   console.log("current \n", currentUser);

      await Promise.all([fetchChats(), fetchSellers()]);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err.response && err.response.status === 401) {
      Alert.alert("Session Expired", "Please log in again to continue.", [
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.multiRemove(["token", "user"]);
            navigation.replace("Login");
          },
        },
      ]);
    } else {
      setError("Failed to load chats. Please try again.");
    }
    setLoading(false);
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const fetchedChats = await chatService.getAllChats();
      setChats(fetchedChats);
    } catch (err) {
      setError("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  const fetchSellers = async () => {
    try {
      const fetchedSellers = await chatService.getAllSellers();
      setSellers(fetchedSellers);
    } catch (err) {
      console.error("Failed to load sellers:", err);
    }
  };

  const startNewChat = async () => {
    if (!selectedSeller || !message) return;

    try {
      const newChat = await chatService.startOrContinueChat(
        selectedSeller._id,
        message
      );
      setChats([newChat, ...chats]);
      setModalVisible(false);
      setSelectedSeller(null);
      setMessage("");
    } catch (err) {
      console.error("Failed to start new chat:", err);
    }
  };

  const handleChatPress = async (chatId) => {
    try {
      await chatService.markChatAsRead(chatId);
      navigation.navigate("ChatDetail", { chatId });
    } catch (err) {
      console.error("Failed to mark chat as read:", err);
    }
  };

  const renderChatItem = ({ item }) => {
    const otherParticipant = item.participants.find(
      (p) => p._id !== currentUser.id
    );
    const unreadCount = item.messages.filter(
      (m) => !m.read && m.sender._id !== currentUser.id
    ).length;
    const lastMessage = item.messages[item.messages.length - 1];

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => handleChatPress(item._id)}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {otherParticipant.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.chatInfo}>
          <Text style={styles.sellerName}>{otherParticipant.name}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage.content}
          </Text>
        </View>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{unreadCount}</Text>
          </View>
        )}
        <Icon name="chevron-forward" size={24} color="#FF6F00" />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchChats} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}> */}
        <TouchableOpacity onPress={() => {}}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
            }}
            style={styles.topBarImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Community Chat</Text>
        </View>

        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.chatList}
          refreshing={loading}
          onRefresh={fetchChats}
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="chatbubble-ellipses" size={30} color="#FFF" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Start New Chat</Text>
              <FlatList
                data={sellers}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.sellerItem,
                      selectedSeller?._id === item._id && styles.selectedSeller,
                    ]}
                    onPress={() => setSelectedSeller(item)}
                  >
                    <View style={styles.sellerItemContent}>
                      <View style={styles.modalAvatarContainer}>
                        <Text style={styles.modalAvatarText}>
                          {item.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={styles.sellerItemText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id}
              />
              <TextInput
                style={styles.messageInput}
                placeholder="Type your message..."
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedSeller(null);
                    setMessage("");
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.startButton]}
                  onPress={startNewChat}
                >
                  <Text style={styles.buttonText}>Start Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... keeping all the existing styles ...
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  topBarImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#2e2c2a",
    padding: 20,
    paddingTop: 10,

    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginTop: 6,
    padding: 5,
    marginRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "white",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  chatList: {
    padding: 20,
  },
  chatItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF6F00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  unreadBadge: {
    backgroundColor: "#FF6F00",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  unreadCount: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#FF6F00",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  sellerItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  sellerItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6F00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  modalAvatarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedSeller: {
    backgroundColor: "#FFE0B2",
  },
  sellerItemText: {
    fontSize: 16,
    color: "#333",
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    maxHeight: 100,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#999",
  },
  startButton: {
    backgroundColor: "#FF6F00",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#FF6F00",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#FF6F00",
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default CommunityChatU;
