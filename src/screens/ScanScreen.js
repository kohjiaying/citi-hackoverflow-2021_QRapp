import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { View,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';

import CameraPermission from '../components/cameraPermission'

export default function ScanScreen({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
		<CameraPermission/>
		
     </SafeAreaView>
  )
}

