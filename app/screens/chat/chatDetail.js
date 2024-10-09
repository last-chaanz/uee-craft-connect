import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Extended dummy data
const currentUser = {
  _id: "67023000e3c919fc5b0e0594",
  name: "Ruwan Perera",
  email: "ruwan@gmail.com",
  role: "seller",
};

const dummyChat = {
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
      read: true,
    },
    {
      _id: "m2",
      sender: currentUser._id,
      content: "Yes, I specialize in traditional clay pots!",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      read: true,
    },
    {
      _id: "m3",
      sender: "2",
      content:
        "That's great! I'm looking for someone to collaborate with on a project. I make handwoven baskets and thought we could create a combination of your pots with my basket weaving.",
      timestamp: new Date(Date.now() - 3400000).toISOString(),
      read: true,
    },
    {
      _id: "m4",
      sender: currentUser._id,
      content:
        "That sounds like an interesting idea! What kind of combination did you have in mind?",
      timestamp: new Date(Date.now() - 3300000).toISOString(),
      read: true,
    },
    {
      _id: "m5",
      sender: "2",
      content:
        "I was thinking we could create planters where your pottery forms the base and my basketry creates a decorative holder. Would you be interested in discussing this further?",
      timestamp: new Date(Date.now() - 3200000).toISOString(),
      read: false,
    },
  ],
  lastMessage: new Date(Date.now() - 3200000).toISOString(),
};

const ChatDetail = ({ route, navigation }) => {
  const [chat, setChat] = useState(dummyChat);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef();

  const otherParticipant = chat.participants.find(
    (p) => p._id !== currentUser._id
  );

  useEffect(() => {
    // Scroll to bottom when component mounts
    flatListRef.current?.scrollToEnd();
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const updatedChat = {
      ...chat,
      messages: [
        ...chat.messages,
        {
          _id: `m${Date.now()}`,
          sender: currentUser._id,
          content: newMessage.trim(),
          timestamp: new Date().toISOString(),
          read: false,
        },
      ],
      lastMessage: new Date().toISOString(),
    };

    setChat(updatedChat);
    setNewMessage("");

    // Scroll to bottom after sending message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.sender === currentUser._id;
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.content}</Text>
          <Text style={styles.messageTime}>{messageTime}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {otherParticipant.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerName}>{otherParticipant.name}</Text>
            <Text style={styles.headerStatus}>Active Seller</Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={chat.messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Icon name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    marginRight: 15,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#FF6F00",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerStatus: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
  },
  messagesList: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  currentUserMessage: {
    justifyContent: "flex-end",
  },
  otherUserMessage: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
  },
  currentUserBubble: {
    backgroundColor: "#FF6F00",
    borderTopRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    padding: 10,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FF6F00",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatDetail;
