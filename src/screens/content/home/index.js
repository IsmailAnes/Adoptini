import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../../../store/actions';
import { setLocation } from '../../../store/actions';
import axios from 'axios';
import moment from 'moment';
import styles from './style';
import constant from '../../../utility/constant';
import { setUser } from '../../../store/actions';
import Header from '../../../components/header';
import Card from '../../../components/animalCard';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

export default function index({ navigation }) {
  const actions = [
    {
      text: 'Add Post',
      icon: require('../../../assets/addWhite.png'),
      name: 'newPost',
      position: 1,
    },
  ];
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const modalizeRef = useRef();
  const modalizeRefLogout = useRef();
  const [isloading, setisloading] = useState(true);
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const onOpenLogout = () => {
    modalizeRefLogout.current?.open();
  };
  const onCloseLogout = () => {
    modalizeRefLogout.current?.close();
  };
  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem('@stored_User');
    } catch (error) {}
    dispatch(setUser([]));
    navigation.navigate('Login');
  };
  const user = useSelector(state => state.useReducer.users);
  const posts = useSelector(state => state.postReducer.posts);
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      onCloseLocation();
      setErrorMsg('Permission to access location was denied');
      Alert(ErrorMessage);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    dispatch(setLocation(location));
  };
  const getPosts = () => {
    axios
      .get(`${constant.BASE_URL}adoptini-posts?page=0&size=20&sort=id,asc`, {
        headers: {
          Authorization: user?.config?.headers.Authorization,
        },
      })
      .then(function (accountResponse) {
        dispatch(setPost(accountResponse.data));
      });
  };
  useEffect(() => {
    getLocation();
    getPosts();
    setisloading(false);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getPosts();
    setRefreshing(false);
  };
  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert('Floating Button Clicked');
  };
  return (
    <View style={styles.sectionContainer}>
      <Header onPress={() => onOpenLogout()}>Hey {user?.data?.login},</Header>
      <Text style={styles.nearByText}>Nearby results ({posts.length})</Text>
      {isloading ? (
        // SKELETON PLACE HOLDER
        <View style={{ alignItems:'center' }}>
         <Image source={require('../../../assets/loading.gif')} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <Card
              onPress={() =>
                navigation.navigate('animalDetails', {
                  transfertProcess: {
                    postID: posts[index]?.id,
                  },
                })
              }
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={styles.cardImgContainer}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${posts[index]?.animalPhoto}`,
                    }}
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfos}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Text style={styles.mainTitleText}>{posts[index]?.animmalName}</Text>
                    <View style={posts[index]?.animalSexe == 'male' ? styles.sexeContainer : styles.sexeContainerFemale}>
                      <Text style={posts[index]?.animalSexe == 'male' ? styles.sexeText : styles.sexeTextFemale}>
                        {posts[index]?.animalSexe}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.ageText}>{posts[index]?.animalAge} yrs old | Playful</Text>

                  <View
                    style={{
                      justifyContent: 'space-evenly',
                      flexDirection: 'row',
                      // width: '70%',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      <Image source={require('../../../assets/cats/pin.png')} style={{ width: 20, height: 20, marginTop: 20 }} />
                      <Text
                        style={{
                          marginTop: 20,
                          marginLeft: 5,
                          color: '#ECD8E9',
                        }}
                      >
                        3 KM
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 20,
                        marginLeft: 5,
                        color: '#ECD8E9',
                      }}
                    >
                      {`added ${moment(posts[index]?.createdAt).fromNow()}`}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          )}
          refreshControl={<RefreshControl colors={['red', 'green']} onRefresh={() => onRefresh()} refreshing={refreshing} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
      <FloatingAction
        actions={actions}
        color={'#10203C'}
        onPressItem={name => {
          navigation.navigate(`${name}`);
        }}
      />
      <Modalize
        ref={modalizeRefLogout}
        overlayStyle={{ backgroundColor: `#19284599` }}
        modalStyle={[, styles.modalStyle, { backgroundColor: '#2c4066' }]}
        handlePosition="inside"
        adjustToContentHeight={true}
        HeaderComponent={() => (
          <View style={styles.modalContentStyle}>
            <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}>Confirme Logout ?</Text>
          </View>
        )}
      >
        <View style={styles.modalizeContainer}>
          <TouchableOpacity style={styles.locationContainerDelete} onPress={() => logoutHandler()}>
            <Text style={styles.locationText}>Confirme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationContainer} onPress={() => onCloseLogout()}>
            <Text style={styles.locationText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
}
