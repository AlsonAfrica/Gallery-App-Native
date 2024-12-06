import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image, Dimensions, Alert } from 'react-native';
import styles from '../Styles/styles';
import { useEffect } from 'react';
import { initializeDatabase,insertImage,getAllImages } from '../Database/sqlite';


export default function Camera() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [images, setImages] = useState([]);
  const [database, setDatabase] = useState(null);
  const cameraRef = useRef(null);

  // INITIALIZE DATABASE
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const db = await initializeDatabase();
        setDatabase(db);

        // Fetch existing images
        const storedImages = await getAllImages(db);
        setImages(storedImages);
      } catch (error) {
        Alert.alert('Database Error', error.message || 'Failed to initialize database', [
          { text: 'OK' },
        ]);
      }
    };
    setupDatabase();
  }, []);
  // Get screen dimensions
  const { width, height } = Dimensions.get('window');

  // Format date and time
  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    return { formattedDate, formattedTime };
  }

  // Request location permissions
  async function requestLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  // Get current location
  async function getCurrentLocation() {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Location Permission', 'Location permission is required to capture geotag.');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { formattedDate, formattedTime } = formatDateTime(location.timestamp);
      
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
        date: formattedDate,
        time: formattedTime
      };
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Location Error', 'Could not retrieve location.');
      return null;
    }
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        // Capture location first
        const location = await getCurrentLocation();

        // Then take picture
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });

        const imageData = {
            uri: photo.uri,
            date: location.date,
            time: location.time,
            latitude: location.latitude,
            longitude: location.longitude
          };

          const insertedId = await insertImage(database, imageData);
          console.log('Image inserted with ID:', insertedId);

        // Set both image and location
        setCapturedImage(photo.uri);
        setLocationData(location);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }

  function resetCapture() {
    setCapturedImage(null);
    setLocationData(null);
  }

  // If an image is captured, show the preview
  if (capturedImage) {
    return (
      <View style={styles.fullScreenContainer}>
        <Image 
          source={{ uri: capturedImage }} 
          style={[
            styles.capturedImage,
            { width: width, height: height }
          ]} 
          resizeMode="cover"
        />
        {locationData && (
          <View style={styles.locationInfoContainer}>
            <Text style={styles.locationInfoText}>
              📍 {locationData.date}
            </Text>
            <Text style={styles.locationInfoText}>
              🕒 {locationData.time}
            </Text>
            <Text style={styles.locationInfoText}>
              Latitude: {locationData.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationInfoText}>
              Longitude: {locationData.longitude.toFixed(6)}
            </Text>
          </View>
        )}
        <View style={styles.overlayButtonContainer}>
          <TouchableOpacity style={styles.retakeButton} onPress={resetCapture}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.containerCamera}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInnerButton}></View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

