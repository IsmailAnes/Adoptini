import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';

export default function index(props) {
  const {children, registre, ...rest} = props;
  return (
    <TouchableOpacity
    {...rest}
    onPress={() => props.onPress()}
      style={[
        {backgroundColor: registre ? '#A85E6D' : '#132C65'},
        styles.button,
      ]}
      activeOpacity={.7}>
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
}
