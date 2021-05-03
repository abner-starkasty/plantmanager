import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  title: string
  subtitle: string
  buttonText: string
  icon: 'smile' | 'hug',
  nextScreen: string
}

const emojis = { 
  hug: '🤗',
  smile: '😄'
}

export function Confirmation() {
  const navigation = useNavigation()
  const routes = useRoute()

  const {
    title,
    subtitle,
    buttonText,
    icon,
    nextScreen,
  } = routes.params as Params

  function handleMoveOn() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.emoji}>
            {emojis[icon]}
          </Text>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

          <View style={styles.footer}>
            <Button text={buttonText} onPress={handleMoveOn} />
          </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30
  },
  
  title: {
    fontSize: 24,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 35,
  },
  
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
    marginVertical: 20
  },
  
  emoji: {
    fontSize: 78,
  },
  
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  },
})