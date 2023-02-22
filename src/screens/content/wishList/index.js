import React, {useRef, useState} from 'react';
import {View, Image, TouchableOpacity, Text, ScrollView} from 'react-native';
import Card from '../../../components/animalCard';
import styles from './style';

export default function index({navigation}) {
  const [liked, setliked] = useState(false);
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../assets/back.png')}
          style={{marginTop: 50, marginLeft: 20,width:30,height:30}}
        />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 30}}>
          <Card onPress={() => navigation.navigate('animalDetails')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.cardImgContainer}>
                <Image
                  source={require('../../../assets/dog.jpeg')}
                  style={styles.cardImg}
                />
              </View>
              <View style={styles.cardInfos}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.mainTitleText}>Parkinson</Text>
                  <View style={styles.sexeContainer}>
                    <Text style={styles.sexeText}>Male</Text>
                  </View>
                </View>
                <Text style={styles.ageText}> 2 yrs old | Playful</Text>

                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../assets/cats/pin.png')}
                      style={{width: 20, height: 20, marginTop: 20}}
                    />
                    <Text
                      style={{marginTop: 20, marginLeft: 5, color: '#ECD8E9'}}>
                      3 KM
                    </Text>
                  </View>
                  <Text
                    style={{marginTop: 20, marginLeft: 5, color: '#ECD8E9'}}>
                    12 mnts ago
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
