import React, { useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { BE_URL } from "@/constants/config";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { toast } from "@backpackapp-io/react-native-toast";

const OTPInput = () => {
    const otpLength = 6;
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const inputRefs = useRef<Array<TextInput | null>>([]);
    let { email } = useGlobalSearchParams();
    if (email === undefined) {
        email = "random@gmail.com"
    }
    const onSubmit = async (otp: string) => {
        console.log(otp);
        const response = await fetch(`${BE_URL}/auth/verifyOtp`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                otp: otp,
            }),
        })
        const res = await response.json();
        if (!res.error) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          router.push("/auth/login");
        }else{
          console.log(res);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          toast("⚠️ Invalid OTP");
        }
    };
    const handleChange = (text: string, index: number) => {
        if (/^\d?$/.test(text)) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);

            if (text && index < otpLength - 1) {
                inputRefs.current[index + 1]?.focus();
            }

            if (newOtp.join("").length === otpLength) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                onSubmit(newOtp.join(""));
            }
        }
    };

    const handleBackspace = (index: number) => {
        if (index > 0 && otp[index] === "") {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
            <Text style={styles.heading}>Enter OTP</Text>
            <Text style={styles.description}>OTP has been sent to :</Text>
            <Text style={styles.email}>{email}</Text>
            <Pressable onPress={() => {
                router.push("/auth/signup");
            }}>
                <Text style={styles.back}>Not this?</Text>
            </Pressable>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        style={styles.otpInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === "Backspace") {
                                handleBackspace(index);
                            }
                        }}
                    />
                ))}
            </View>

            <Pressable style={styles.submitBtn} onPress={() => onSubmit(otp.join(""))}>
                <Text style={styles.submitText}>Verify OTP</Text>
            </Pressable>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        padding: 20,
    },
    heading: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },
    back: {
        color: "white",
        fontSize: 12,
        fontWeight: "light",
        marginBottom: 10,
        textDecorationLine: "underline",
    },
    description: {
        color: "white",
        fontSize: 16,
        marginBottom: 3,
    },
    email: {
        color: "#b1b1b2",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 3
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    otpInput: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        width: 50,
        height: 60,
        borderRadius: 10,
    },
    submitBtn: {
        backgroundColor: "#c5c5c6",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    submitText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default OTPInput;