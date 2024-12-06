import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Alert } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const cameraRef = useRef(null);

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
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    position: 'relative',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  captureButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderColor: 'white',
  },
  captureInnerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  capturedImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlayButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  retakeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationInfoContainer: {
    justifyContent:"center",
    flexDirection:"row",
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    alignItems: 'center',
    gap:10
  },
  locationInfoText: {
    color: 'white',
    fontSize: 16,
  },
});