import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const AddItem = ({ navigation }) => {
  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState(null);
  const [sellType, setSellType] = useState("normal");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState({
    decoration: false,
    collective: false,
    dailyuse: false,
  });
  const [description, setDescription] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleCategory = (category) => {
    setCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("sellType", sellType.toLowerCase());
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);

    const selectedCategories = Object.keys(categories).filter(
      (key) => categories[key]
    );
    selectedCategories.forEach((category) => {
      formData.append("categories[]", category);
    });

    if (image) {
      let filename = image.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: image,
        name: filename,
        type,
      });
    }

    try {
      const response = await fetch("http://192.168.8.114:5000/api/products", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Product uploaded successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ViewItem", { id: result._id }),
          },
        ]);
      } else {
        Alert.alert("Error", result.error || "Something went wrong");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload product. Please try again.");
      console.error("Upload Error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add new Item</Text>
      </View>

      <Text style={styles.label}>ITEM NAME</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Handmade Mini Basket"
      />

      <Text style={styles.label}>UPLOAD PHOTO/VIDEO</Text>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
          <Ionicons name="add-circle-outline" size={24} color="purple" />
          <Text style={styles.addImageText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>SELL TYPE</Text>
      <View style={styles.sellTypeContainer}>
        <TouchableOpacity
          style={[
            styles.sellTypeButton,
            sellType === "normal" && styles.sellTypeButtonActive,
          ]}
          onPress={() => setSellType("normal")}
        >
          <Text
            style={[
              styles.sellTypeText,
              sellType === "normal" && styles.sellTypeTextActive,
            ]}
          >
            Normal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sellTypeButton,
            sellType === "bidding" && styles.sellTypeButtonActive,
          ]}
          onPress={() => setSellType("bidding")}
        >
          <Text
            style={[
              styles.sellTypeText,
              sellType === "bidding" && styles.sellTypeTextActive,
            ]}
          >
            Bidding
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>PRICE</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="50"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>QUANTITY</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="10"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>CATEGORY</Text>
      <View style={styles.categoryContainer}>
        {Object.entries(categories).map(([category, isSelected]) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              isSelected && styles.categoryButtonActive,
            ]}
            onPress={() => toggleCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                isSelected && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>DESCRIPTION</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter product description here"
        multiline
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>UPLOAD PRODUCT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    color: "gray",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginRight: 15,
  },
  addImageButton: {
    alignItems: "center",
  },
  addImageText: {
    color: "purple",
    marginTop: 5,
  },
  sellTypeContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  sellTypeButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  sellTypeButtonActive: {
    backgroundColor: "#f0f0f0",
  },
  sellTypeText: {
    color: "gray",
  },
  sellTypeTextActive: {
    color: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
  categoryText: {
    color: "gray",
  },
  categoryTextActive: {
    color: "white",
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  uploadButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddItem;
