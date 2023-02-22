import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';

export default function index(props) {
  const {children, registre, subText, ...rest} = props;
  return (
    <View style={[{backgroundColor: '#192845'}, styles.headerContainer]}>
      <View>
        <Text style={styles.headerText}>{children}</Text>
        <Text style={styles.headerSubText}>Adopt a new friend near you!</Text>
      </View>
      <TouchableOpacity onPress={() => props.onPress()} style={{alignItems:'center',marginRight:20}}>
        <Image source={require('../../assets/logOut.png')} style={styles.pin} />
        <Text style={{color:'#D4BFD2',fontFamily:'Montserrat-SemiBold',fontSize:11}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
