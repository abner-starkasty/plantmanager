import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native'
import colors from '../styles/colors'

export function PlantSelect() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Selecionar Planta</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  }
})