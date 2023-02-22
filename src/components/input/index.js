import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './style'

export default function index(props) {
    const {children,password,numeric, ...rest}=props
  return (
      <TextInput
      {...rest}
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder={children}
        placeholderTextColor="#D4BFD2"
        autoCapitalize="none"
        color="#D4BFD2"
        secureTextEntry={true && props.password}
        keyboardType={props.numeric && 'numeric'}
      />
  );
}
