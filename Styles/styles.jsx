import { StyleSheet,Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    utils:{
        display:"flex",
        flexDirection:"row",
        gap:10,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
        backgroundColor:"transparent" 
      },
      input:{
        borderWidth:2,
        color:"blue",
        width:300,
        height:40,
        borderRadius:20,
        padding:20
      },
      containercamera: {
        flex: 1,
        backgroundColor: '#fff', // For better visualization
      },
      camerabutton: {
        position: 'absolute',
        bottom: 50, // Distance from the bottom
        right: 20,  // Distance from the right
        backgroundColor: '#007AFF', // Button color
        borderRadius: 30, // Makes the button circular
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // For shadow on Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow position
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      buttonText: {
        color: 'white', // Text color
        fontWeight: 'bold',
      },

    //   Camera styles
    containerCamera: {
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
    //   End Camera styles

    // Images
    imageGalleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 80, // Extra space at bottom for camera button
      },
      
      imageThumbnailContainer: {
        position: 'relative',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      
      imageThumbnail: {
        borderRadius: 10,
      },
      
      imageInfoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 5,
      },
      
      imageInfoText: {
        color: 'white',
        fontSize: 10,
        marginBottom: 2,
      },
      
      noImagesText: {
        width: '100%',
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#888',
      },
      
})
export default styles;