import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { SafeAreaView } from 'react-native';


export default function StartScreen({ navigation }) {
  return (
      <Background>
        <Logo />
        <Header>Give me QR.</Header>
        <Paragraph>
          I don't want cash.
      </Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Login
      </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          Sign Up
      </Button>
      </Background>
  )
}