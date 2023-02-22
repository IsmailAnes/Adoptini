import React, { useRef, useState, useEffect } from 'react';
import { View, Image, ImageBackground, Text, ScrollView, Linking, Modal, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import { PacmanIndicator } from 'react-native-indicators';
import { setPostDetails } from '../../../store/actions';
import { Modalize } from 'react-native-modalize';
import moment from 'moment';
import axios from 'axios';
import { getDistance, getPreciseDistance } from 'geolib';
import styles from './style';

const images = [
  {
    // Simplest usage.
    url: 'https://t3.ftcdn.net/jpg/02/69/57/14/360_F_269571449_Ek606WFhbV9Rd4uqcSDAHXCmZtYJ3Jo8.jpg',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
      // headers: ...
    },
  },
  {
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/happy-australian-shepherd-dog-royalty-free-image-1031307988-1558558167.jpg?crop=1.00xw:0.752xh;0,0.0568xh&resize=640:*',
  },
  {
    url: 'https://thumbs.dreamstime.com/b/happy-dog-smile-peach-cream-color-background-happy-dog-smile-peach-cream-color-background-cute-puppy-pug-breed-179647137.jpg',
  },
];
export default function index({ navigation, route }) {
  const modalizeRef = useRef();
  const user = useSelector(state => state.useReducer.users);
  const currentLocation = useSelector(state => state.locationReducer.currentLocation.coords);
  const postDetails = useSelector(state => state.postDetailsReducer.postDetails);
  const [distance, setDistance] = useState();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/adoptini-posts/${transfertProcess.postID}`, {
        headers: {
          Authorization: user?.config?.headers.Authorization,
        },
      })
      .then(function (postDetails) {
        dispatch(setPostDetails(postDetails.data));
        setisloading(false);
      });
  }, []);
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const { transfertProcess } = route.params;
  const [liked, setliked] = useState(false);
  const [isloading, setisloading] = useState(true);
  const dispatch = useDispatch();
  const deletePost = () => {
    axios
      .delete(`http://127.0.0.1:8080/api/adoptini-posts/${postDetails.id}`, {
        headers: {
          Authorization: user?.config?.headers.Authorization,
        },
      })
      .then(function (postDetails) {
        onClose();
        navigation.navigate('Home');
      })
      .catch(function (error) {
        console.warn(error);
      });
  };
  return (
    <View style={styles.sectionContainer}>
      {isloading ? (
        <PacmanIndicator color="#D4BFD2" />
      ) : (
        <View
          style={{
            height: '45%',
          }}
        >
          <ImageBackground
            source={{
              uri: postDetails.animalPhoto
                ? `data:image/jpeg;base64,${postDetails?.animalPhoto}`
                : `https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg`,
            }}
            style={styles.headerCover}
            imageStyle={{ borderRadius: 30 }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../../assets/back.png')} style={{ width: 50, height: 50, resizeMode: 'stretch', marginTop: 50 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              {postDetails?.user?.id == user?.data.id && (
                <TouchableOpacity onPress={() => onOpen()}>
                  <Image
                    source={require('../../../assets/trash.png')}
                    style={{
                      marginTop: 40,
                      width: 70,
                      height: 70,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </View>
      )}
      {isloading ? (
        <PacmanIndicator color="#D4BFD2" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20, flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor:'#132b54',marginTop:10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.mainTitleText}>{postDetails?.animmalName}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-between',
                  }}
                >
                  <Image source={require('../../../assets/distance.png')} style={{ width: 17, height: 17, marginRight: 5 }} />
                  <Text style={styles.distanceText}>distance unvailable</Text>
                  <Image source={require('../../../assets/user.png')} style={{ width: 17, height: 17, marginRight: 5, marginLeft: 5 }} />
                  <Text style={styles.addedByText}>{postDetails?.user?.login}</Text>
                </View>
              </View>
              <View style={postDetails?.animalSexe == 'male' ? styles.sexeContainer : styles.sexeContainerFemale}>
                <Text style={postDetails?.animalSexe == 'male' ? styles.sexeText : styles.sexeTextFemale}>{postDetails?.animalSexe}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../../assets/added.png')} style={{ width: 30, height: 30, marginRight: 5, marginTop: 13 }} />
              <Text style={styles.PostTimeText}>{moment(postDetails?.createdAt).format('MMM Do YY')} |</Text>
              <Image
                source={require('../../../assets/age.png')}
                style={{ width: 17, height: 17, marginRight: 5, marginTop: 13, marginLeft: 5 }}
              />
              <Text style={styles.PostTimeText}>{postDetails?.animalAge} yrs old |</Text>
              <Image
                source={require('../../../assets/mood.png')}
                style={{ width: 17, height: 17, marginRight: 5, marginTop: 13, marginLeft: 5 }}
              />
              <Text style={styles.PostTimeText}>Playful</Text>
            </View>

            <View>
              <Text style={styles.aboutMeHeaderText}>About me</Text>
              <Text style={styles.aboutMeText}>{postDetails?.animalAbout}</Text>
              <Text style={styles.aboutMeHeaderText}>Quick Info</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={styles.infoBox}>
                  <Text style={styles.infoBoxTitle}>{postDetails?.animalAge} yrs</Text>
                  <Text style={styles.infoBoxSubTitle}>age</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoBoxTitle}>{postDetails?.animalColor}</Text>
                  <Text style={styles.infoBoxSubTitle}>Color</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoBoxTitle}>{postDetails?.animalWeight} KG</Text>
                  <Text style={styles.infoBoxSubTitle}>Weight</Text>
                </View>
              </View>

              <Text style={styles.aboutMeHeaderText}>Contact Owner</Text>
              <TouchableOpacity style={styles.contactBox} onPress={() => Linking.openURL(`tel:${postDetails?.phoneNumber}`)}>
                <Image source={require('../../../assets/phone.png')} style={{ marginRight: 5, height: 25, width: 25 }} />
                <Text style={styles.phoneNumberText}>{postDetails?.phoneNumber}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
      <Modalize
        ref={modalizeRef}
        overlayStyle={{ backgroundColor: `#19284599` }}
        modalStyle={[, styles.modalStyle, { backgroundColor: '#2c4066' }]}
        handlePosition="inside"
        adjustToContentHeight={true}
        HeaderComponent={() => (
          <View style={styles.modalContentStyle}>
            <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}>Post will be permanently deleted</Text>
          </View>
        )}
      >
        <View style={styles.modalizeContainer}>
          <TouchableOpacity style={styles.locationContainerDanger} onPress={() => deletePost()}>
            <Text style={styles.locationText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationContainer} onPress={() => onClose()}>
            <Text style={styles.locationText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
}
