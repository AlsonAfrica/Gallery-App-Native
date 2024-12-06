import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Pressable } from 'react-native';
import { Link } from 'expo-router';
import styles from '../Styles/styles';
import Utils from '../components/utils';
import Entypo from '@expo/vector-icons/Entypo';

export default function App() {
  return (
    <View style={styles.container}>
       <StatusBar style="dark" />
       <View>
         <Utils/>
       </View>
      

       <View style={styles.containercamera}>
            <View style={styles.camerabutton}>
                <Link href="/camera" asChild>
                <Pressable>
                    <Text style={styles.buttonText}><Entypo name="camera" size={24} color="black" /></Text>
                </Pressable>
                </Link>
             </View>
        </View>    
    </View>
  );
}



