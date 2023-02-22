import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';

export default function index(props) {
  const {children, registre, ...rest} = props;
  return (
    <TouchableOpacity
    onPress={() => props.onPress()}
      style={[
        {backgroundColor: '#192845'},
        styles.button,
      ]}
      activeOpacity={.7}>
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
}
