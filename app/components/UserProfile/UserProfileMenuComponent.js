import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import Theme from '../../utils/styleCollection';

const styles = StyleSheet.create({
  userInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    padding: 10
  },
  userInfoContainerInScreen: {
    backgroundColor: 'black'
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  avatarInScreen: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  nameEmailContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center'
  },
  userName: {
    color: 'white',
    fontSize: 16
  },
  userNameInScreen: {
    color: 'black',
    fontSize: 20
  },
  email: {
    color: 'white',
    fontSize: 14
  },
  emailInScreen: {
    color: Theme.hbTextGray,
    fontSize: 16
  }
});

export default class UserProfileMenuComponent extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    isInSlideMenu: PropTypes.bool
  };
  render() {
    const { imageUrl, name, email, isInSlideMenu } = this.props;
    return (
      <View
        style={
          isInSlideMenu ? (
            styles.userInfoContainer
          ) : (
            [styles.userInfoContainer, styles.userInfoContainerInScreen]
          )
        }
      >
        <Image
          style={isInSlideMenu ? styles.avatar : styles.avatarInScreen}
          source={{ uri: imageUrl }}
        />
        <View style={styles.nameEmailContainer}>
          <Text style={isInSlideMenu ? styles.userName : styles.userNameInScreen}>{name}</Text>
          <Text style={isInSlideMenu ? styles.email : styles.emailInScreen}>{email}</Text>
        </View>
      </View>
    );
  }
}
