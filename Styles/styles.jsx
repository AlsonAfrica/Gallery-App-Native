import { StyleSheet } from "react-native";

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
      
})
export default styles;