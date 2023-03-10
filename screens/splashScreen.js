import { Text, View, SafeAreaView, StatusBar, Image, BackHandler } from 'react-native'
import React, { useCallback } from 'react'
import { Colors, Fonts, Sizes } from '../constants/styles'
import { useFocusEffect } from '@react-navigation/native'

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {appIcon()}
                {appName()}
            </View>
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding, ...Fonts.grayColor12SemiBold }}>
                USER APP
            </Text>
        </SafeAreaView>
    )

    function appName() {
        return (
            <Text style={{ marginTop: Sizes.fixPadding, letterSpacing: 3.0, ...Fonts.primaryColor24RasaBold }}>
                CABWIND
            </Text>
        )
    }

    function appIcon() {
        return (
            <Image
                source={require('../assets/images/appIcon.png')}
                style={{ width: 66.0, height: 66.0, resizeMode: 'contain' }}
            />
        )
    }
}

export default SplashScreen;