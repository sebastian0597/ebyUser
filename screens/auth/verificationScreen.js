import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import React, { useState, createRef } from 'react'
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { AntDesign } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';

const VerificationScreen = ({ navigation }) => {

    const [state, setState] = useState({
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
        isLoading: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { firstDigit, secondDigit, thirdDigit, forthDigit, isLoading } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {enterCodeInfo()}
                    {otpFields()}
                    {dontReceiveInfo()}
                </ScrollView>
            </View>
            {continueButton()}
            {loadingDialog()}
        </SafeAreaView>
    )

    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={styles.dialogStyle}
            >
                <ActivityIndicator size={56} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    Please wait...
                </Text>
            </Overlay>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    updateState({ isLoading: true })
                    setTimeout(() => {
                        updateState({ isLoading: false })
                        navigation.push('Home')
                    }, 2000);
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function dontReceiveInfo() {
        return (
            <Text style={{ textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Didn’t receive a code? { }
                </Text>
                <Text style={{ ...Fonts.primaryColor15Bold }}>
                    Resend
                </Text>
            </Text>
        )
    }

    function otpFields() {
        const secondTextInput = createRef();
        const thirdTextInput = createRef();
        const forthTextInput = createRef();
        return (
            <View style={{ ...styles.otpFieldsWrapStyle, }}>
                <View style={{ ...styles.textFieldWrapStyle, borderColor: firstDigit ? Colors.primaryColor : Colors.shadowColor, }}>
                    <TextInput
                        cursorColor={Colors.primaryColor}
                        value={firstDigit}
                        style={{ paddingLeft: Sizes.fixPadding, ...Fonts.blackColor16Bold, }}
                        onChangeText={(text) => {
                            updateState({ firstDigit: text })
                            secondTextInput.current.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ ...styles.textFieldWrapStyle, borderColor: secondDigit ? Colors.primaryColor : Colors.shadowColor, }}>
                    <TextInput
                        cursorColor={Colors.primaryColor}
                        value={secondDigit}
                        style={{ paddingLeft: Sizes.fixPadding, ...Fonts.blackColor16Bold, }}
                        ref={secondTextInput}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            updateState({ secondDigit: text })
                            thirdTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={{ ...styles.textFieldWrapStyle, borderColor: thirdDigit ? Colors.primaryColor : Colors.shadowColor, }}>
                    <TextInput
                        cursorColor={Colors.primaryColor}
                        style={{ paddingLeft: Sizes.fixPadding, ...Fonts.blackColor16Bold, }}
                        keyboardType="numeric"
                        value={thirdDigit}
                        ref={thirdTextInput}
                        onChangeText={(text) => {
                            updateState({ thirdDigit: text })
                            forthTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={{ ...styles.textFieldWrapStyle, borderColor: forthDigit ? Colors.primaryColor : Colors.shadowColor, }}>
                    <TextInput
                        cursorColor={Colors.primaryColor}
                        style={{ paddingLeft: Sizes.fixPadding, ...Fonts.blackColor16Bold, }}
                        keyboardType="numeric"
                        value={forthDigit}
                        ref={forthTextInput}
                        onChangeText={(text) => {
                            updateState({ forthDigit: text, isLoading: true })
                            setTimeout(() => {
                                updateState({ isLoading: false })
                                navigation.push('Home')
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    function enterCodeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
                    Enter Verification Code
                </Text>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding, ...Fonts.grayColor15SemiBold }}>
                    A 4 digit code has sent to your phone number
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
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding + 2.0, ...Fonts.blackColor20ExtraBold }}>
                    Verification
                </Text>
            </View>
        )
    }
}

export default VerificationScreen

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    otpFieldsWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 4.0,
        flexDirection: 'row',
    },
    textFieldWrapStyle: {
        width: 45.0,
        borderBottomWidth: 1.0,
        borderBottomColor: Colors.shadowColor,
        marginHorizontal: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    dialogStyle: {
        width: '80%',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingTop: Sizes.fixPadding * 2.0,
        elevation: 3.0,
    },
})