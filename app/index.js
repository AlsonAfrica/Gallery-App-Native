import { StatusBar } from 'expo-status-bar';
import {  Text, View, TextInput, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import styles from '../Styles/styles';
import Utils from '../components/utils';
import Entypo from '@expo/vector-icons/Entypo';
import { initializeDatabase, getAllImages } from '../Database/sqlite';


export default function App() {
  const [images, setImages] = useState([]);
  const [database, setDatabase] = useState(null);

  // Get screen dimensions
  const { width } = Dimensions.get('window');
  const imageWidth = (width - 30) / 2; // Two images per row with some padding

  // Initialize database and fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Initialize database
        const db = await initializeDatabase();
        setDatabase(db);

        // Fetch all images
        const storedImages = await getAllImages(db);
        setImages(storedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View>
        <Utils/>
      </View>

      {/* Image Gallery */}
      <ScrollView 
        contentContainerStyle={styles.imageGalleryContainer}
        showsVerticalScrollIndicator={false}
      >
        {images.length === 0 ? (
          <Text style={styles.noImagesText}>No images captured yet</Text>
        ) : (
          images.map((image, index) => (
            <View key={image.id} style={styles.imageThumbnailContainer}>
              <Image 
                source={{ uri: image.uri }}
                style={[
                  styles.imageThumbnail,
                  { 
                    width: imageWidth, 
                    height: imageWidth // Square thumbnails
                  }
                ]}
                resizeMode="cover"
              />
              <View style={styles.imageInfoOverlay}>
                <Text style={styles.imageInfoText}>
                  📍 {image.date}
                </Text>
                <Text style={styles.imageInfoText}>
                  🕒 {image.time}
                </Text>
                <Text style={styles.imageInfoText}>
                  Lat: {parseFloat(image.latitude).toFixed(4)}
                </Text>
                <Text style={styles.imageInfoText}>
                  Lon: {parseFloat(image.longitude).toFixed(4)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Camera Button */}
      <View style={styles.containercamera}>
        <View style={styles.camerabutton}>
          <Link href="/camera" asChild>
            <Pressable>
              <Text style={styles.buttonText}>
                <Entypo name="camera" size={24} color="black" />
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>    
    </View>
  );
}
