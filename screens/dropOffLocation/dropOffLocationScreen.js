import { SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const recentLocationsList = [
    {
        id: '1',
        address: 'Whiteshell Avenue, Winnipeg',
        addressDetail: '38 Whiteshell Avenue, Winnipeg, MB R2C 2X5',
    },
    {
        id: '2',
        address: 'Island Pkwy, Kamloops',
        addressDetail: '1655 Island Pkwy, Kamloops, BC V2B 6Y9',
    },
    {
        id: '3',
        address: 'Richmond Street, Charlottetown',
        addressDetail: '145 Richmond Street, Charlottetown, PE C1A 1J1',
    },
    {
        id: '4',
        address: 'McKercher Drive, Saskatoon',
        addressDetail: '1535 McKercher Drive, Saskatoon, SK S7H 5L3',
    },
];

const DropOffLocationScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                {currentToDropLocationInfo()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                    {adddressesInfo()}
                    {recentLocationsInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function recentLocationsInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Bold }}>
                    Recent
                </Text>
                {
                    recentLocationsList.map((item, index) => (
                        <View
                            key={`${item.id}`}
                            style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => { navigation.push('BookNow') }}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                <View style={styles.iconCircleStyle}>
                                    <MaterialIcons name="history" size={18} color={Colors.lightGrayColor} />
                                </View>
                                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                        {item.address}
                                    </Text>
                                    <Text numberOfLines={1} style={{ ...Fonts.grayColor15Regular }}>
                                        {item.addressDetail}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {
                                recentLocationsList.length - 1 == index
                                    ?
                                    null :
                                    <View style={{ backgroundColor: Colors.shadowColor, height: 1.0, marginVertical: Sizes.fixPadding + 5.0, }} />
                            }
                        </View>
                    ))
                }
            </View >
        )
    }

    function adddressesInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 3.0, marginBottom: Sizes.fixPadding }}>
                {addressOptionSort({ iconName: 'home', option: 'Home', onPress: () => { navigation.push('BookNow') }, iconSize: 22, })}
                {addressOptionSort({ iconName: 'work', option: 'Work', onPress: () => { navigation.push('BookNow') }, iconSize: 19, })}
            </View>
        )
    }

    function addressOptionSort({ iconName, option, onPress, iconSize }) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.addressOptionWrapStyle}
            >
                <View style={{ width: 22.0, alignItems: 'center' }}>
                    <MaterialIcons name={iconName} size={iconSize} color={Colors.primaryColor} />
                </View>
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function currentToDropLocationInfo() {
        return (
            <View style={styles.currentToDropLocationInfoWrapStyle}>
                {currentLocationInfo()}
                {currentToDropLocDivider()}
                {dropLocationInfo()}
            </View>
        )
    }

    function dropLocationInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -(Sizes.fixPadding - 5.0) }}>
                <View style={{ width: 24.0, alignItems: 'center' }}>
                    <MaterialIcons name="location-pin" size={24} color={Colors.primaryColor} />
                </View>
                <TextInput
                    placeholder='Where to go?'
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor15SemiBold }}
                    cursorColor={Colors.primaryColor}
                    autoFocus
                />
            </View>
        )
    }

    function currentToDropLocDivider() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 24.0, alignItems: "center" }}>
                    <Text style={{ ...Fonts.blackColor8SemiBold, lineHeight: 6 }}>
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •{`\n`}
                        •
                    </Text>
                </View>
                <View style={styles.currentToDropLocationInfoDividerStyle} />
            </View>
        )
    }

    function currentLocationInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 24, alignItems: 'center' }}>
                    <View style={styles.currentLocationIconStyle}>
                        <View style={{ width: 7.0, height: 7.0, borderRadius: 3.5, backgroundColor: Colors.blackColor }} />
                    </View>
                </View>
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, flex: 1, ...Fonts.blackColor15SemiBold }}>
                    Current Location
                </Text>
            </View>
        )
    }

    function backArrow() {
        return (
            <AntDesign
                name="arrowleft"
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ marginVertical: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding + 5.0 }}
            />
        )
    }
}

export default DropOffLocationScreen

const styles = StyleSheet.create({
    currentToDropLocationInfoDividerStyle: {
        backgroundColor: Colors.shadowColor,
        height: 1.0,
        flex: 1,
        marginRight: Sizes.fixPadding * 2.5,
        marginLeft: Sizes.fixPadding
    },
    currentLocationIconStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.blackColor,
        borderWidth: 2.0,
    },
    currentToDropLocationInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    },
    iconCircleStyle: {
        backgroundColor: Colors.shadowColor,
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addressOptionWrapStyle: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    }
})