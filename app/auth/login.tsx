import React, { useState, useRef, useEffect } from "react";
import * as Haptics from 'expo-haptics';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import { BE_URL } from "@/constants/config";
import { toast } from "@backpackapp-io/react-native-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Basic_400Regular } from "@expo-google-fonts/basic";
import TextBox from "@/components/TextBox";
import { useAuthStore } from "@/stores/authStore";

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Basic_400Regular,

  });

  if (!fontsLoaded) {
    return null;
  }

  return <LoginScreenContent />;
}

function LoginScreenContent() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const { setUser, login,user } = useAuthStore();

  // useEffect(()=>{
  //   console.log('user: ', user);
  // },[user])

  const router = useRouter();
  const passwordRef = useRef<TextInput | null>(null);
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)
    const response = await fetch(`${BE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await response.json();
    if (!res.error) {
      if(Platform.OS !== "web"){
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      await AsyncStorage.setItem("token", JSON.stringify(res.payload.token));
      await AsyncStorage.setItem("username", JSON.stringify(res.payload.user.username));
      login()
      setUser({
        username: res.payload.user.username,
        email: res.payload.user.email,
        fullname: res.payload.user.fullname,
        profilePhoto: res.payload.user.profilePhoto,
        gender: res.payload.user.gender,
        token: res.payload.token
      })
      router.push({
        pathname: "/(tabs)/home/screens/Upcoming",
      });
      setLoading(false)
    } else {
      // console.log(res);
      if(Platform.OS !== "web"){
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      toast("Cannot Login!");
      setLoading(false)
    }
    // console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <TextBox style={[styles.heading, styles.font]}>Login</TextBox>
        <TextBox style={[styles.des, styles.font]}>Let's get you logged in</TextBox>

        <View style={styles.inputContainer}>
          <TextBox style={[styles.label, styles.font]}>E-mail or Username</TextBox>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$|^[a-z0-9._-]+$/,
                message: "Only [a-z], '.', '_', and '-' are allowed.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter E-mail or Username"
                placeholderTextColor={"#888"}
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                }}
                value={value}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
                keyboardType="email-address"
                textContentType="username"
                autoComplete="username"
                importantForAutofill="yes"
              />
            )}
            name="id"
          />
          {errors.id && (
            <TextBox style={[styles.errorText, styles.font]}>Enter valid Username or Password</TextBox>
          )}

          <TextBox style={[styles.label, styles.font]}>Password</TextBox>
          <Controller
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={passwordRef}
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={"#888"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                returnKeyType="done"
                textContentType="password"
                autoComplete="password"
                importantForAutofill="yes"
              />
            )}
            name="password"
          />
          {errors.password && (
            <TextBox style={[styles.errorText, styles.font]}>
              Password must be at least 6 characters.
            </TextBox>
          )}

          {
            loading &&
            <ActivityIndicator size={"small"} style={{ paddingTop: 20 }} color="#c5c5c6" />
          }
          {
            !loading &&
            <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
              <TextBox style={[styles.submitText, styles.font]}>Login</TextBox>
            </Pressable>
          }

        </View>

        <TextBox style={[styles.account, styles.font]}>
          Don't have an account? ?{" "}
          <TextBox onPress={() => router.push("/auth/signup")} style={[styles.login, styles.font]}>Sign Up</TextBox>
        </TextBox>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20
  },
  heading: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Basic_400Regular"
  },
  des: {
    color: "white",
    fontSize: 20,
    marginBottom: 10,
  },
  account: {
    color: "#b1b1b2",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  login: {
    color: "white",
    fontWeight: "bold",
  },
  label: {
    color: "white",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    borderBottomWidth: 2,
  },
  pickerContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "relative",
    marginBottom: 15,
  },
  pickerInput: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    right: 12,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 2,
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
  font: {
    fontFamily: "Basic_400Regular",
  },
});