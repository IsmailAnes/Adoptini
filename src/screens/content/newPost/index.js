import React, { useRef, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import Input from '../../../components/input';
import ButtonLarge from '../../../components/buttonLarge';
import axios from 'axios';
import moment from 'moment';
import { Modalize } from 'react-native-modalize';
import { useSelector, useDispatch } from 'react-redux';
import constant from '../../../utility/constant';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import styles from './style';

export default function index({ navigation }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [about, setAbout] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [male, setMale] = useState(false);
  const [femal, setFemal] = useState(false);
  const [playful, setPlayful] = useState(false);
  const [agressive, setAgressive] = useState(false);
  const [color, setcolor] = useState('');
  const [weight, setweight] = useState('');
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setimagePreview] = useState('');
  const user = useSelector(state => state.useReducer.users);
  const modalizeRef = useRef();
  const modalizeRefLocation = useRef();
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onOpenLocation = () => {
    modalizeRefLocation.current?.open();
  };
  const onCloseLocation = () => {
    modalizeRefLocation.current?.close();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const modalButtonHandler = () => {
    onClose();
    navigation.navigate('Home');
  };
  // gallery permission check
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  // location permission check
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    setImage(result.base64);
    if (!result.cancelled) {
      setImage(result.base64);
      setimagePreview(result.uri);
    }
  };
  const currentLocation = useSelector(state => state.locationReducer.currentLocation.coords);
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      onCloseLocation();
      setErrorMsg('Permission to access location was denied');
      Alert(ErrorMessage);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    onCloseLocation();
    buttonHandler();
  };
  const buttonHandler = async () => {
    setloading(true);
    axios
      .post(
        `${constant.BASE_URL}${constant.PREFIX_ADD_POST}`,
        {
          animmalName: name,
          animalAbout: about,
          animalAge: age,
          animalColor: color,
          animalSexe: femal ? 'female' : 'male',
          animalWeight: weight,
          animalAttitude: playful ? 'playful' : 'agressive',
          phoneNumber: phoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          user: {
            id: user?.data.id,
            login: user?.data.login,
          },
          animalPhoto: image,
          animalPhotoContentType: 'image/jpeg',
          latitude: currentLocation.latitude,
          longitude: currentLocation.latitude,
        },
        {
          headers: {
            Authorization: user?.config?.headers?.Authorization,
          },
        }
      )
      .then(response => {
        onOpen();
      })
      .catch(error => {
        console.warn(error);
      });
    setloading(false);
  };
  const femaleHandler = () => {
    setFemal(!femal);
    setMale(false);
  };
  const MaleHandler = () => {
    setMale(!male);
    setFemal(false);
  };

  const playfulHandler = () => {
    setPlayful(true);

    setAgressive(false);
  };
  const agressiveHandler = () => {
    setPlayful(false);

    setAgressive(true);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/back.png')} style={{ marginLeft: 20, width: 30, height: 30 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>tell us about your dog</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <Text style={styles.inputTitle}>Dog's Name</Text>
          <Input onChangeText={value => setName(value)} value={name}>
            exp: Roxy
          </Input>
          <Text style={styles.inputTitle}>Age</Text>
          <Input onChangeText={value => setAge(value)} numeric value={age}>
            exp: 2 years
          </Input>
          <Text style={styles.inputTitle}>sexe ?</Text>
          <View style={styles.sexContainer}>
            <TouchableOpacity
              style={!femal ? styles.sexeContainerFemale : styles.sexeContainerFemaleSelected}
              onPress={() => femaleHandler()}
            >
              <Text style={styles.sexeTextFemale}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity style={!male ? styles.sexeContainerMale : styles.sexeContainerMaleSelected} onPress={() => MaleHandler()}>
              <Text style={styles.sexeText}>Male</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>common behavior ?</Text>

          <View style={styles.sexContainer}>
            <TouchableOpacity
              style={!playful ? styles.attitudeContainer : styles.attitudeContainerSelected}
              onPress={() => playfulHandler()}
            >
              <Text style={styles.behaviorText}>Playful</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={!agressive ? styles.attitudeContainer : styles.attitudeContainerSelected}
              onPress={() => agressiveHandler()}
            >
              <Text style={styles.behaviorText}>agressive</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>About the dog</Text>
          <Input onChangeText={value => setAbout(value)} value={about}>
            exp: found lost in city ...
          </Input>
          <Text style={styles.inputTitle}>Dog's color</Text>
          <Input onChangeText={value => setcolor(value)} value={color}>
            exp: Brown
          </Input>
          <Text style={styles.inputTitle}>Dog's Weight (KG)</Text>
          <Input onChangeText={value => setweight(value)} value={weight} numeric>
            exp: 5
          </Input>
          <Text style={styles.inputTitle}>Your Phone Number</Text>
          <Input onChangeText={value => setphoneNumber(value)} value={phoneNumber} numeric>
            exp: 2591****
          </Input>
          <Text style={styles.inputTitle}>Add a picture (optional)</Text>
          {image ? (
            <View style={styles.imageContainer}>
              {imagePreview ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Image
                    source={{ uri: imagePreview }}
                    style={{
                      width: 250,
                      height: 250,
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  />
                  <TouchableOpacity onPress={() => setImage(null)}>
                    <Image source={require('../../../assets/delete.png')} style={{ width: 40, height: 40 }} />
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.placeholderImageTitle}>Image preview here ...</Text>
              )}
            </View>
          ) : (
            <View style={styles.sexContainer}>
              <TouchableOpacity style={styles.cameraContainer} onPress={pickImage}>
                <Image source={require('../../../assets/gallery.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
          )}
          {loading ? (
            <PacmanIndicator color="#D4BFD2" />
          ) : (
            <ButtonLarge
              registre={
                !name ||
                !age ||
                (!femal && !male) ||
                (!playful && !agressive) ||
                !about ||
                !color ||
                !weight ||
                !phoneNumber ||
                phoneNumber.length != 8
                  ? true
                  : false
              }
              onPress={() => {
                currentLocation.latitude = 0 ? onOpenLocation() : buttonHandler();
              }}
            >
              {!name ||
              !age ||
              (!femal && !male) ||
              (!playful && !agressive) ||
              !about ||
              !color ||
              !weight ||
              !phoneNumber ||
              phoneNumber.length != 8 ? (
                <Text> Complete all inputs</Text>
              ) : (
                <Text> Sounds Good </Text>
              )}
            </ButtonLarge>
          )}
        </ScrollView>
      </View>
      <Modalize
        ref={modalizeRef}
        overlayStyle={{ backgroundColor: `#19284599` }}
        modalStyle={[, styles.modalStyle, { backgroundColor: '#2c4066' }]}
        handlePosition="inside"
        adjustToContentHeight={true}
      >
        <View style={styles.modalizeContainer}>
          <Image source={require('../../../assets/success.gif')} style={{ width: 400, height: 400, alignSelf: 'center' }} />
          <Text style={styles.ModalTextBig}>Post Added successfully !</Text>
          <ButtonLarge onPress={() => modalButtonHandler()}>Great !</ButtonLarge>
        </View>
      </Modalize>
      <Modalize
        ref={modalizeRefLocation}
        overlayStyle={{ backgroundColor: `#19284599` }}
        modalStyle={[, styles.modalStyle, { backgroundColor: '#2c4066' }]}
        handlePosition="inside"
        adjustToContentHeight={true}
      >
        <View style={styles.modalizeContainer}>
          <Text style={styles.ModalTextBigLocation}>Location Permission</Text>

          <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Image source={require('../../../assets/locationPermission.gif')} style={{ width: 150, height: 140, alignSelf: 'center' }} />
            <Text style={styles.ModalTextSubBigLocation}>We need your permission to get your location so it can be added to your post</Text>
            <ButtonLarge onPress={() => getLocation()}>Great !</ButtonLarge>
          </View>
        </View>
      </Modalize>
    </View>
  );
}
