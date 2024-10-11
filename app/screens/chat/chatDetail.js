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
  ActivityIndicator,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { chatService } from "./chatService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatDetail = ({ route, navigation }) => {
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const flatListRef = useRef();
  const { chatId } = route.params;

  useEffect(() => {
    loadUserAndChat();

    // console.log(chat.messages);
  }, []);

  const loadUserAndChat = async () => {
    try {
      const userJson = await AsyncStorage.getItem("currentUser");
      const user = JSON.parse(userJson);
      setCurrentUser(user);
      // console.log(currentUser);

      await fetchChat();
    } catch (err) {
      console.error("Error loading user and chat:", err);
      setError("Failed to load chat");
    } finally {
      setLoading(false);
    }
  };

  const fetchChat = async () => {
    try {
      const chatData = await chatService.getChatById(chatId);
      // console.log(chatData);
      setChat(chatData);
      // console.log("2 chat\n", chat.messages);
    } catch (err) {
      setError("Failed to load chat");
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "" || sending) return;

    const participant = chat.participants.find(
      (participant) => participant._id !== currentUser.id
    );

    try {
      setSending(true);
      const updatedChat = await chatService.startOrContinueChat(
        participant,
        newMessage.trim()
      );
      setChat(updatedChat);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      // Optionally show an error toast or alert
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => {
    // console.log("mm");
    if (!currentUser) return null;

    // console.log(item.sender._id);

    const isCurrentUser = item.sender._id === currentUser.id;
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
          <Text
            style={[
              styles.messageText,
              isCurrentUser ? styles.currentUserText : styles.otherUserText,
            ]}
          >
            {item.content}
          </Text>
          <Text
            style={[
              styles.messageTime,
              isCurrentUser ? styles.currentUserTime : styles.otherUserTime,
            ]}
          >
            {messageTime}
          </Text>
        </View>
      </View>
    );
  };

  if (loading || !currentUser || !chat) {
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
        <TouchableOpacity onPress={fetchChat} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const otherParticipant = chat.participants.find(
    (p) => p._id !== currentUser.id
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
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
            editable={!sending}
          />
          <TouchableOpacity
            style={[styles.sendButton, sending && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={sending}
          >
            {sending ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Icon name="send" size={24} color="#FFF" />
            )}
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
  header: {
    backgroundColor: "#2e2c2a",
    padding: 20,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
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
  currentUserText: {
    color: "#FFFFFF",
  },
  otherUserText: {
    color: "#333333",
  },
  currentUserTime: {
    color: "#FFFFFF",
    opacity: 0.7,
  },
  otherUserTime: {
    color: "#666666",
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
});

export default ChatDetail;
