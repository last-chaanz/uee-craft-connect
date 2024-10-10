import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ArticleDetail = React.memo(({ article, onClose }) => {
  if (!article) return null;

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Article</Text>
      </View>
      <ScrollView style={styles.articleDetailContent}>
        <View style={styles.dottedBorder}>
          <Text style={styles.articleDetailTitle}>{article.title}</Text>
        </View>
        <View style={styles.dottedBorder}>
          <Text style={styles.articleDetailDescription}>
            {article.description}
          </Text>
        </View>
      </ScrollView>
    </>
  );
});

const ArticleList = ({ articles, topicTitle, onBack }) => {
  const [showArticleDetail, setShowArticleDetail] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handlePress = useCallback((item) => {
    setSelectedArticle(item);
    setShowArticleDetail(true);
  }, []);

  const handleDetailClose = useCallback(() => {
    setShowArticleDetail(false);
  }, []);

  //   const handlePress = (item) => {
  //     setArticleDetail(null);

  //     // Add a slight delay to ensure it clears before setting the new value
  //     setTimeout(() => {
  //       setArticleDetail(item);
  //       console.log("handle press\n" + JSON.stringify(item)); // Set articleDetail to the clicked item
  //       //   setShowArticleDetail(true); // Show article detail screen
  //     }, 0);

  //     // Log the selected item
  //     // setShowArticleDetail(true);
  //   };

  // const { articles, topicTitle } = null;
  //   const articlesList = articles;
  //   console.log("Not Good\n");
  //   const [showarticleDetail, setShowArticleDetail] = useState(false);
  //   const [articleDetail, setArticleDetail] = useState(null);

  //   const articleDetailClose = () => {
  //     // setArticleDetail(null);
  //     setShowArticleDetail(false);
  //   };

  //   const ArticleDetail = ({ article, onClose }) => {
  //     // const { article } = route.params;

  //     return (
  //       <>
  //         {article ? (
  //           <>
  //             <View style={styles.headerContainer}>
  //               <TouchableOpacity style={styles.backButton} onPress={onClose}>
  //                 <Icon name="arrow-back" size={24} color="#000" />
  //               </TouchableOpacity>
  //               <Text style={styles.pageTitle}>Article</Text>
  //             </View>
  //             <ScrollView style={styles.articleDetailContent}>
  //               <Text style={styles.articleDetailTitle}>{article.title}</Text>
  //               <Text style={styles.articleDetailDescription}>
  //                 {article.description}
  //               </Text>
  //             </ScrollView>
  //           </>
  //         ) : (
  //           <>
  //             <Text style={styles.pageTitle}>Nothing</Text>
  //           </>
  //         )}
  //       </>
  //     );
  //   };

  //   const handlePress = useCallback((item) => {
  //     setArticleDetail(null);  // Reset previous article detail
  //     setTimeout(() => {
  //       setArticleDetail(item);  // Set new article detail
  //       setShowArticleDetail(true);  // Display article detail
  //     }, 0);
  //   }, []);

  //   const renderArticleItem = ({ item }) => (
  //     <TouchableOpacity
  //       style={styles.articleItem}
  //       onPress={() => handlePress(item)}
  //     >
  //       <Text style={styles.articleItemTitle}>{item.title}</Text>
  //       <Icon name="chevron-forward" size={24} color="#666" />
  //     </TouchableOpacity>
  //   );

  const renderArticleItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.articleItem}
        onPress={() => handlePress(item)}
      >
        <Text style={styles.articleItemTitle}>{item.title}</Text>
        <Icon name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>
    ),
    [handlePress]
  );

  return (
    <SafeAreaView style={styles.container}>
      {showArticleDetail ? (
        <ArticleDetail article={selectedArticle} onClose={handleDetailClose} />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>{topicTitle}</Text>
          </View>
          <FlatList
            data={articles}
            renderItem={renderArticleItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.articleListContent}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (keep your existing styles)
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  articleListContent: {
    padding: 15,
  },
  articleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  articleItemTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  articleDetailContent: {
    padding: 15,
  },
  dottedBorder: {
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: "#666", // Color for the border
    borderRadius: 10, // Rounded edges
    padding: 10, // Padding inside the border
    marginBottom: 15, // Space between elements
  },
  articleDetailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  articleDetailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});

export default ArticleList;
