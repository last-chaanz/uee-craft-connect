import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Dummy current user
const currentUser = {
  _id: "67023000e3c919fc5b0e0594",
  name: "Ruwan Perera",
  email: "ruwan@gmail.com",
  role: "seller",
};

// Dummy chat data
const dummyChats = [
  {
    _id: "1",
    participants: [
      currentUser,
      {
        _id: "2",
        name: "Ama Silva",
        email: "ama@gmail.com",
        role: "seller",
      },
    ],
    messages: [
      {
        _id: "m1",
        sender: "2",
        content: "Hi, do you make pottery items?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        _id: "m2",
        sender: currentUser._id,
        content: "Yes, I specialize in traditional clay pots!",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        read: true,
      },
    ],
    lastMessage: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    _id: "2",
    participants: [
      currentUser,
      {
        _id: "3",
        name: "Kumara Bandara",
        email: "kumara@gmail.com",
        role: "seller",
      },
    ],
    messages: [
      {
        _id: "m3",
        sender: currentUser._id,
        content: "Your wooden crafts look amazing!",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
      },
    ],
    lastMessage: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Dummy sellers data
const dummySellers = [
  {
    _id: "2",
    name: "Ama Silva",
    email: "ama@gmail.com",
    role: "seller",
  },
  {
    _id: "3",
    name: "Kumara Bandara",
    email: "kumara@gmail.com",
    role: "seller",
  },
  {
    _id: "4",
    name: "Priya Fernando",
    email: "priya@gmail.com",
    role: "seller",
  },
  {
    _id: "5",
    name: "Nimal Perera",
    email: "nimal@gmail.com",
    role: "seller",
  },
];

const CommunityChat = ({ navigation }) => {
  const [chats, setChats] = useState(dummyChats);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [message, setMessage] = useState("");

  const startNewChat = () => {
    if (!selectedSeller || !message) return;

    const newChat = {
      _id: `${chats.length + 1}`,
      participants: [currentUser, selectedSeller],
      messages: [
        {
          _id: `m${Date.now()}`,
          sender: currentUser._id,
          content: message,
          timestamp: new Date().toISOString(),
          read: false,
        },
      ],
      lastMessage: new Date().toISOString(),
    };

    setChats([newChat, ...chats]);
    setModalVisible(false);
    setSelectedSeller(null);
    setMessage("");
  };

  const renderChatItem = ({ item }) => {
    const otherParticipant = item.participants.find(
      (p) => p._id !== currentUser._id
    );
    const unreadCount = item.messages.filter(
      (m) => !m.read && m.sender !== currentUser._id
    ).length;
    const lastMessage = item.messages[item.messages.length - 1];

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate("ChatDetail", { chatId: item._id })}
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

  return (
    <SafeAreaView style={styles.safeArea}>
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
                data={dummySellers}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#FF6F00",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#FF6F00",
    padding: 20,
    paddingTop: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
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
});

export default CommunityChat;
