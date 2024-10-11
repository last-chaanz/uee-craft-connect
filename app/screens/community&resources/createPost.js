import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const CreatePost = ({ onClose }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageSelect = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImage(response.assets[0].uri); // Set the selected image URI
      }
    });
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    // console.log({ image, title, description });
    onClose(); // Close the modal after submission
  };

  const handleclose = () => {
    onClose();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleclose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImageSelect} style={styles.imageButton}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageButtonText}>Select Image</Text>
        )}
      </TouchableOpacity>
      {/* 
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Enter image URL"
      /> */}

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "red",
    fontStyle: "bold",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  imageButtonText: {
    fontSize: 16,
    color: "#888",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#FF6F00",

    alignSelf: "flex-end",
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    margin: 5,
    fontStyle: "bold",
    color: "white",
  },
});

export default CreatePost;
