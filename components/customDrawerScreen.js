import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated, StatusBar, Image } from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';
import Svg, { Path } from 'react-native-svg';
import * as shape from "d3-shape";
import { useDrawerStatus } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';

const { width } = Dimensions.get("window");
const screenHeight = Dimensions.get('window').height;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const height = width / 7.0;
const tabWidth = width / 3.5;

const getPath = () => {
    const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
        { x: width, y: 0 },
        { x: width + 5, y: 2 },
        { x: width + 10, y: 8 },
        { x: width + 15, y: 15 },
        { x: width + 20, y: height },
        { x: width + tabWidth - 20, y: height },
        { x: width + tabWidth - 15, y: 15 },
        { x: width + tabWidth - 10, y: 8 },
        { x: width + tabWidth - 5, y: 2 },
        { x: width + tabWidth, y: 0 },
    ]);
    return `${tab}`;
};

const d = getPath();

const CustomDrawer = props => {

    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const value = useRef(new Animated.Value(0)).current;

    const translateX = value.interpolate({
        inputRange: [0, width],
        outputRange: [-width, 0],
    });

    return (
        <SafeAreaView style={styles.drawerWrapStyle}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {header()}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ flexGrow: 1, width: width - 90.0, }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1, }}>
                    {drawerOptions()}
                </View>
            </DrawerContentScrollView>
            {closeIcon()}
            {logoutDialog()}
        </SafeAreaView>
    );

    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => setShowLogoutDialog(false)}
                overlayStyle={styles.dialogStyle}
            >
                <View style={{ marginVertical: Sizes.fixPadding * 3.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="help" size={22} color={Colors.primaryColor} />
                        <Text style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                            Do You Want to Logout...?
                        </Text>
                    </View>
                    <View style={styles.cancelAndLogoutButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => { setShowLogoutDialog(false) }}
                            style={{ ...styles.cancelAndLogoutButtonStyle, borderColor: Colors.lightGrayColor, backgroundColor: Colors.whiteColor, }}
                        >
                            <Text style={{ ...Fonts.grayColor16Bold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                setShowLogoutDialog(false)
                                props.navigation.push('Login')
                            }}
                            style={{ ...styles.cancelAndLogoutButtonStyle, ...styles.logoutButtonStyle, }}
                        >
                            <Text style={{ ...Fonts.whiteColor16Bold }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay>
        )
    }

    function closeIcon() {
        return (
            useDrawerStatus() === 'open'
                ?
                <View style={styles.curveWrapStyle}>
                    <View
                        {...{ height, width }}
                        style={{ transform: [{ rotate: '-90deg' }], width: '100%' }}
                    >
                        <AnimatedSvg width={width * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
                            <Path
                                d={d}
                                fill={Colors.whiteColor}
                            />
                        </AnimatedSvg>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { props.navigation.closeDrawer() }}
                        style={styles.closeIconWrapStyle}
                    >
                        <MaterialIcons name="close" size={24} color={Colors.primaryColor} />
                    </TouchableOpacity>
                </View>
                :
                null
        )
    }

    function drawerOptions() {
        return (
            <View>
                {drawerOptionSort({
                    iconName: 'home',
                    option: 'Home',
                    onPress: () => {
                        props.navigation.closeDrawer()
                    }
                })}
                {divider()}
                {drawerOptionSort({
                    iconName: 'directions-car',
                    option: 'My Rides',
                    onPress: () => {
                        props.navigation.closeDrawer();
                        props.navigation.push('UserRides');
                    }
                })}
                {divider()}
                {drawerOptionSort({
                    iconName: 'account-balance-wallet',
                    option: 'Wallet',
                    onPress: () => {
                        props.navigation.closeDrawer();
                        props.navigation.push('Wallet')
                    }
                })}
                {divider()}
                {drawerOptionSort({
                    iconName: 'notifications',
                    option: 'Notification',
                    onPress: () => {
                        props.navigation.closeDrawer();
                        props.navigation.push('Notifications');
                    }
                })}
                {divider()}
                {drawerOptionSort({
                    iconName: 'card-giftcard',
                    option: 'Invite Friends',
                    onPress: () => {
                        props.navigation.closeDrawer();
                        props.navigation.push('InviteFriends');
                    }
                })}
                {divider()}
                {drawerOptionSort({
                    iconName: 'help',
                    option: 'FAQs',
                    onPress: () => {
                        props.navigation.closeDrawer();
                        props.navigation.push('Faqs');
                    }
                })}
                {divider()}
                {drawerOptionSort({
                    iconName: 'email',
                    option: 'Contact us',
                    onPress: () => {
                        props.navigation.closeDrawer();
                        props.navigation.push('ContactUs');
                    }
                })}
                {divider()}
                {drawerOptionSort({
                    iconName: 'logout',
                    option: 'Logout',
                    onPress: () => { setShowLogoutDialog(true) }
                })}
            </View>
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginHorizontal: Sizes.fixPadding * 2.0, }} />
        )
    }

    function drawerOptionSort({ iconName, option, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}
            >
                <View style={styles.drawerOptionIconWrapStyle}>
                    <MaterialIcons name={iconName} size={17} color={Colors.whiteColor} />
                </View>
                <Text style={{ flex: 1, ...Fonts.blackColor17Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View>
                    <Image
                        source={require('../assets/images/users/user1.png')}
                        style={{ width: width / 5.0, height: width / 5.0, borderRadius: (width / 5.0) / 2.0 }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            props.navigation.closeDrawer()
                            props.navigation.push('EditProfile')
                        }}
                        style={styles.profileEditIconWrapStyle}
                    >
                        <Feather name="edit-3" size={width / 25.0} color={Colors.primaryColor} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 8.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor16Bold }}>
                        Samantha Smith
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor14Regular }}>
                        samanthasmith@gmail.com
                    </Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
    },
    profileEditIconWrapStyle: {
        width: width / 15.0,
        height: width / 15.0,
        borderRadius: (width / 15.0) / 2.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: -5.0,
    },
    closeIconWrapStyle: {
        width: width / 8.0,
        height: width / 8.0,
        borderRadius: (width / 8.0) / 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: 2.0,
        right: 15.0,
    },
    curveWrapStyle: {
        top: (screenHeight / 2.0) - StatusBar.currentHeight,
        height: width / 3.5,
        width: width / 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        left: width - 90.30,
    },
    drawerOptionIconWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor
    },
    dialogStyle: {
        width: '90%',
        backgroundColor: Colors.whiteColor,
        padding: 0.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    cancelAndLogoutButtonStyle: {
        paddingVertical: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    cancelAndLogoutButtonWrapStyle: {
        marginTop: Sizes.fixPadding * 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    logoutButtonStyle: {
        borderColor: Colors.primaryColor,
        backgroundColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding,
    },
    drawerWrapStyle: {
        flex: 1,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        borderBottomRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor
    }
})

export default CustomDrawer;