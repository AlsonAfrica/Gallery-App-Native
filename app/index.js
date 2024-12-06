import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Pressable } from 'react-native';
import { Link } from 'expo-router';
import styles from '../Styles/styles';
import Utils from '../components/utils';


export default function App() {
  return (
    <View style={styles.container}>
       <StatusBar style="dark" />
       <Utils/>
       
    </View>
  );
}



