import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
          <Text style={styles.emoji}>
            😄
          </Text>

          <Text style={styles.title}>
            Prontinho
          </Text>

          <Text style={styles.subtitle}>
            Agora vamos começar a cuidar das suas 
            plantinhas com muito cuidado.
          </Text>

          <View style={styles.footer}>
            <Button text='Começar' />
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