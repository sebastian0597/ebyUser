import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import MapViewDirections from 'react-native-maps-directions';
import { Key } from "../../constants/key";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const RideStartedScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.shadowColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {directionInfo()}
                {reachingDestinationInfo()}
                {header()}
                {driverInfoSheet()}
            </View>
        </SafeAreaView>
    )

    function driverInfoSheet() {
        return (
            <Animatable.View
                animation="slideInUp"
                iterationCount={1}
                duration={1500}
                style={{ ...styles.bottomSheetWrapStyle, }}
            >
                {indicator()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {driverInfo()}
                </ScrollView>
                {endRideButton()}
            </Animatable.View>
        )
    }

    function indicator() {
        return (
            <View style={{ ...styles.sheetIndicatorStyle }} />
        )
    }

    function endRideButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { navigation.push('RideEnd') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    End Ride
                </Text>
            </TouchableOpacity>
        )
    }

    function driverInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                {driverImageWithCallAndMessage()}
                {driverDetail()}
            </View>
        )
    }

    function driverDetail() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding * 3.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor17SemiBold }}>
                    Cameron Williamson
                </Text>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ maxWidth: width / 2.5, marginHorizontal: Sizes.fixPadding + 9.0, alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                            Swift Dezire
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
                            GJ 5 AB 1265
                        </Text>
                    </View>
                    <View style={{ maxWidth: width / 2.5, marginHorizontal: Sizes.fixPadding + 9.0, alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                            Arriving in
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor15SemiBold }}>
                            3 mins
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function driverImageWithCallAndMessage() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.callAndMessageIconWrapStyle}>
                    <MaterialIcons
                        name='call'
                        color={Colors.primaryColor}
                        size={width / 18.0}
                    />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../../assets/images/users/user2.png')}
                        style={styles.driverImageStyle}
                    />
                    <View style={styles.ratingInfoWrapStyle}>
                        <Text numberOfLines={1} style={{ maxWidth: width / 12.0, ...Fonts.whiteColor12Bold }}>
                            4.7
                        </Text>
                        <MaterialIcons
                            name='star'
                            color={Colors.orangeColor}
                            size={16}
                            style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => { navigation.push('ChatWithDriver') }}
                    style={styles.callAndMessageIconWrapStyle}
                >
                    <MaterialIcons
                        name='message'
                        color={Colors.primaryColor}
                        size={width / 18.0}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function reachingDestinationInfo() {
        return (
            <View style={styles.reachingDestinationInfoWrapStyle}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Reaching Destination in
                </Text>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    14 mins
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }

    function directionInfo() {
        const currentCabLocation = {
            latitude: 22.715024,
            longitude: 88.474119,
        }
        const userLocation = {
            latitude: 22.558488,
            longitude: 88.309215,
        }
        return (
            <MapView
                region={{
                    latitude: 22.528682,
                    longitude: 88.374505,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                style={{ height: '100%', }}
                provider={PROVIDER_GOOGLE}
                mapType="terrain"
            >
                <MapViewDirections
                    origin={userLocation}
                    destination={currentCabLocation}
                    apikey={Key.apiKey}
                    strokeColor={Colors.primaryColor}
                    strokeWidth={3}
                />
                <Marker coordinate={currentCabLocation}>
                    <Image
                        source={require('../../assets/images/icons/marker2.png')}
                        style={{ width: 50.0, height: 50.0, resizeMode: 'stretch', }}
                    />
                </Marker>
                <Marker coordinate={userLocation}>
                    <Image
                        source={require('../../assets/images/icons/cab.png')}
                        style={{ width: 25.0, height: 45.0, resizeMode: 'contain', top: 16.0, transform: [{ rotate: '70deg' }] }}
                    />
                </Marker>
            </MapView>
        )
    }
}

export default RideStartedScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        top: 20.0,
        left: 15.0,
        right: 15.0,
    },
    bottomSheetWrapStyle: {
        borderTopLeftRadius: Sizes.fixPadding * 2.5,
        borderTopRightRadius: Sizes.fixPadding * 2.5,
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        bottom: 0.0,
        maxHeight: height / 2.4,
    },
    sheetIndicatorStyle: {
        width: 50,
        height: 5.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignSelf: 'center',
        marginVertical: Sizes.fixPadding * 2.0,
    },
    callAndMessageIconWrapStyle: {
        width: width / 10.0,
        height: width / 10.0,
        borderRadius: (width / 10.0) / 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ratingInfoWrapStyle: {
        position: 'absolute',
        bottom: 5.0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
    },
    reachingDestinationInfoWrapStyle: {
        position: 'absolute',
        left: 20.0,
        right: 20.0,
        top: 60.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    driverImageStyle: {
        width: width / 4.0,
        height: width / 4.0,
        borderRadius: (width / 4.0) / 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    }
})