import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import useAuth from '../auth/useAuth'
import Screen from '../Components/Screen';
import Divider from '../Components/Divider';
import AppText from '../Components/AppText';
import ListItem from '../Components/ListItem';
import Icon from '../Components/Icon';
import colors from '../config/colors';

export default function ProfileScreen({navigation}) {
    const {userData,logOut} = useAuth();
    const {name,photoUrl,email} = userData;
  return (
    <Screen>
      <View style={styles.container}>
        <Divider />
        <View style={styles.profile}>
          <View style={styles.profileLogoContainer}>
            <Image
              style={styles.profileLogo}
              source={{uri:photoUrl}}
            />
          </View>
          <View style={styles.profileDataContainer}>
            <AppText>{name}</AppText>
            <AppText>{email}</AppText>
          </View>
        </View>
        <Divider />
        <ListItem
          title="Running Appointment"
          onPress={() => navigation.navigate('RunningAppointments')}
          IconComponent={
            <Icon name="account-check" backgroundColor={colors.secondary} />
          }
        />
        <Divider />
        <ListItem
          title="Appointment History"
          onPress={() => navigation.navigate('AppointMentHistory')}
          IconComponent={
            <Icon name="history" backgroundColor={colors.medium} />
          }
        />
        <Divider />
        <ListItem
          title="About us"
          onPress={() => navigation.navigate('Aboutus')}
          IconComponent={<Icon name="android" backgroundColor="#01F7CC" />}
        />
        <Divider />
        <ListItem
          title="Log Out"
          onPress={() => logOut()}
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        />
        <Divider />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      profile: {
        flexDirection: "row",
      },
      profileLogo: {
        borderRadius: 50,
        height: 60,
        width: 60,
      },
      profileLogoContainer: {
        margin: 10,
        height: "100%",
      },
      profileDataContainer: {
        height: "100%",
        margin: 10,
        alignContent: "center",
      },
})