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
        height:40,
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
})
export default styles;