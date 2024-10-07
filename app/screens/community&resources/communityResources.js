import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Dummy data for Community Posts
const communityPosts = [
  {
    id: "1",
    author: {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
    },
    title: "My Success Story",
    description: "How I managed to increase my sales by 200% in just 3 months",
    image:
      "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432594/cld-sample-4.jpg",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      image:
        "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
    },
    title: "Product Photography Tips",
    description: "Essential tips for taking better product photos",
    image:
      "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432594/cld-sample-4.jpg",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    author: {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
    },
    title: "My Success Story",
    description: "How I managed to increase my sales by 200% in just 3 months",
    image:
      "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432594/cld-sample-4.jpg",
    timestamp: "2 hours ago",
  },
  {
    id: "4",
    author: {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
    },
    title: "My Success Story",
    description: "How I managed to increase my sales by 200% in just 3 months",
    image:
      "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432594/cld-sample-4.jpg",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    author: {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
    },
    title: "My Success Story",
    description: "How I managed to increase my sales by 200% in just 3 months",
    image:
      "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432594/cld-sample-4.jpg",
    timestamp: "2 hours ago",
  },
  {
    id: "6",
    author: {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
    },
    title: "My Success Story",
    description: "How I managed to increase my sales by 200% in just 3 months",
    image:
      "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432594/cld-sample-4.jpg",
    timestamp: "2 hours ago",
  },
  {
    id: "7",
    author: {
      name: "John Doe",
      image:
        "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432593/cld-sample.jpg",
    },
    title: "My Story",
    description: "How I managed to increase my sales by 200% in just 3 months",
    image:
      "https://res.cloudinary.com/dtktpemb7/image/upload/v1683432594/cld-sample-4.jpg",
    timestamp: "2 hours ago",
  },
  // Add more dummy posts
];

// Dummy data for Resources
const resourceTopics = [
  {
    id: "1",
    title: "Getting Started",
    articleCount: 5,
    articles: [
      { id: "1", title: "Setting up your seller account" },
      { id: "2", title: "Creating your first listing" },
      { id: "3", title: "Understanding the platform" },
      { id: "4", title: "Best practices for new sellers" },
      { id: "5", title: "Common mistakes to avoid" },
    ],
  },
  {
    id: "2",
    title: "Marketing Strategies",
    articleCount: 3,
    articles: [
      { id: "1", title: "Social media marketing guide" },
      { id: "2", title: "Email marketing for sellers" },
      { id: "3", title: "SEO optimization for your listings" },
    ],
  },
  // Add more topics
];

const CommunityResources = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("community");
  const [expandedTopic, setExpandedTopic] = useState(null);

  const renderCommunityPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.author.image }} style={styles.authorImage} />
      <View style={styles.postCard}>
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postDescription}>{item.description}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    </View>
  );

  const renderResourceTopic = ({ item }) => (
    <View style={styles.topicContainer}>
      <TouchableOpacity
        style={styles.topicHeader}
        onPress={() =>
          setExpandedTopic(expandedTopic === item.id ? null : item.id)
        }
      >
        <Text style={styles.topicTitle}>{item.title}</Text>
        <Icon
          name={expandedTopic === item.id ? "chevron-up" : "chevron-down"}
          size={24}
          color="#000"
        />
      </TouchableOpacity>
      {expandedTopic === item.id && (
        <View style={styles.topicContent}>
          <Text style={styles.articleCount}>
            {item.articleCount} articles available
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() =>
              navigation.navigate("ArticleList", { articles: item.articles })
            }
          >
            <Text style={styles.exploreButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
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

      {/* Back Button and Page Title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Community & Resources</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "community" && styles.activeTab]}
          onPress={() => setActiveTab("community")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "community" && styles.activeTabText,
            ]}
          >
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "resources" && styles.activeTab]}
          onPress={() => setActiveTab("resources")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "resources" && styles.activeTabText,
            ]}
          >
            Resources
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "community" ? (
        <FlatList
          data={communityPosts}
          renderItem={renderCommunityPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.communityContent}
        />
      ) : (
        <FlatList
          data={resourceTopics}
          renderItem={renderResourceTopic}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resourceContent}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          // Handle add action based on active tab
          if (activeTab === "community") {
            navigation.navigate("CreatePost");
          } else {
            navigation.navigate("AddResource");
          }
        }}
      >
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  backButton: {
    marginRight: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF6F00",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#FF6F00",
    fontWeight: "bold",
  },
  communityContent: {
    padding: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "relative",
    zIndex: 1,
    left: 0,
    top: 12,
  },

  postCard: {
    marginLeft: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "column",
    elevation: 3,
  },
  postImage: {
    width: "100%",
    height: 150,
  },
  postContent: {
    flex: 1,
    padding: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  resourceContent: {
    padding: 20,
  },
  topicContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    elevation: 2,
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  topicContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  articleCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: "#FF6F00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  exploreButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6F00",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default CommunityResources;
