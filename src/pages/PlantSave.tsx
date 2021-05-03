import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import { SvgUri } from 'react-native-svg'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useNavigation, useRoute } from '@react-navigation/native'
import DateTimerPicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { PlantProps, savePlant } from '../libs/storage'

import { Button } from '../components/Button'

import waterdrop from '../assets/waterdrop.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

  const navigation = useNavigation()
  const route = useRoute()
  const { plant } = route.params as Params

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(oldState => oldState)
      return Alert.alert('Escolha uma horário no futuro! ⏰')
    }

    if (dateTime) {
      setSelectedDateTime(dateTime)
    }
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonText: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      })

    } catch (error) {
      Alert.alert('Não foi possível salvar. 😢')
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollListContainer}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgUri 
            uri={plant.photo}
            height={150}
            width={150}
          />

          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image 
              source={waterdrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          { showDatePicker && (
            <DateTimerPicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          { Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar: ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )}

          <Button 
            text="Cadastrar planta"
            onPress={handleSave}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollListContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },

  container: {
    flex: 1,
    backgroundColor: colors.shape,
    justifyContent: 'space-between',
  },
  
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },

  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },

  plantAbout: {
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    marginTop: 10,
    textAlign: 'center',
  },

  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },

  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },

  tipImage: {
    width: 56,
    height: 56,
  },

  tipText: {
    flex: 1,
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.blue,
    textAlign: 'justify',
    marginLeft: 20,
  },

  alertLabel: {
    fontFamily: fonts.complement,
    fontSize: 14,
    color: colors.heading,
    textAlign: 'center',
    marginBottom: 5
  },

  dateTimePickerButton: {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
  },

  dateTimePickerText: {
    fontFamily: fonts.text,
    fontSize: 24,
    color: colors.heading,
  },
})