import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MAX_IMAGE_HEIGHT = 300;
const MAX_ASPECT_RATIO = 3; // Maximum height will be 3x the width // Maximum height for the image container

const CreatePostNew = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageAspect, setImageAspect] = useState(1);

  const handleImageSelect = async () => {
    try {
      setIsLoading(true);

      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        alert("We need camera roll permissions to select an image.");
        return;
      }

      // Pick the image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        // aspect: [4, 3],
        quality: 0.8, // Slightly reduce initial quality
      });

      if (!result.canceled && result.assets[0]) {
        const selectedImage = result.assets[0];

        // Get image dimensions
        const { width, height } = selectedImage;
        // const aspectRatio = width / height;
        // In your image processing:

        const limitedAspectRatio = Math.min(width / height, MAX_ASPECT_RATIO);

        setImageAspect(limitedAspectRatio);
        // setImageAspect(aspectRatio);

        // Determine resize dimensions while maintaining aspect ratio
        let resizeWidth = width;
        let resizeHeight = height;

        if (width > 1080) {
          resizeWidth = 1080;
          resizeHeight = 1080 / limitedAspectRatio;
        }

        // Optimize the selected image
        const optimizedImage = await manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1080 } }], // Resize to standard width
          {
            compress: 0.8, // 80% quality
            format: SaveFormat.JPEG,
          }
        );

        setImage(optimizedImage.uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      alert("There was an error selecting the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      alert("Please select an image");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    // Here you would typically upload the image and other data
    console.log("Submitting:", {
      imageUri: image,
      title,
      description,
    });

    onClose();
  };

  const ImageDisplay = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (!image) {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.imageButtonText}>Tap to Select Image</Text>
          <Text style={styles.imageSubText}>Required</Text>
        </View>
      );
    }

    const imageStyle = {
      width: "100%",
      height: undefined,
      aspectRatio: imageAspect,
      maxHeight: MAX_IMAGE_HEIGHT,
    };

    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={imageStyle}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    // <View style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity> */}
      </View>

      {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity> */}

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={handleImageSelect}
          style={styles.imageButton}
          disabled={isLoading}
        >
          <ImageDisplay />
        </TouchableOpacity>

        {/* <TouchableOpacity
        onPress={handleImageSelect}
        style={styles.imageButton}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : image ? (
          <Image
            source={{ uri: image }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.imageButtonText}>Tap to Select Image</Text>
            <Text style={styles.imageSubText}>Required</Text>
          </View>
        )}
      </TouchableOpacity> */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>
            Title:<Text style={styles.required}> *</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
            maxLength={100}
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description (optional)"
            multiline
            numberOfLines={3}
            maxLength={500}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!image || !title.trim()) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading || !image || !title.trim()}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? "Processing..." : "Add Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    // </View>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     width: "100%",
  //     backgroundColor: "#FFF",
  //     padding: 20,
  //   },
  backButton: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 15,
  },
  formContainer: {
    flex: 1,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  closeButton: {
    alignSelf: "flex-end",
    // marginBottom: 20,
    marginRight: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#FF0000",
    fontWeight: "bold",
  },
  imageButton: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    minHeight: 200,
    maxHeight: MAX_IMAGE_HEIGHT,

    // borderWidth: 2,
    // borderColor: "#ddd",
    // borderStyle: "dashed",
    // borderRadius: 10,
    // height: 200,
    // marginBottom: 20,
    // overflow: "hidden",
    // justifyContent: "center",
    // alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imageButtonText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  imageSubText: {
    fontSize: 14,
    color: "#999",
  },

  //   imagePreview: {
  //     width: "100%",
  //     height: "100%",
  //   },
  //   placeholderContainer: {
  //     alignItems: "center",
  //   },
  //   imageButtonText: {
  //     fontSize: 18,
  //     color: "#666",
  //     marginBottom: 5,
  //   },
  //   imageSubText: {
  //     fontSize: 14,
  //     color: "#999",
  //   },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  required: {
    color: "#FF0000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FF6F00",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#FFB074",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default CreatePostNew;
