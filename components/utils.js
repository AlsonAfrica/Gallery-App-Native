import { View,TextInput,Pressable } from "react-native";
import styles from "../Styles/styles";
import { Link } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

const Utils = () => {
    return ( 
    <View style={styles.utils}>
        <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#aaa"
        />
        <Link href='/map' asChild>
        <Pressable>
            <Feather name="map" size={24} color="black" />
        </Pressable>
        </Link>
    </View>
     );
}
 
export default Utils;