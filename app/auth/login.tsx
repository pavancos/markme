import React, { useState, useRef } from "react";
import * as Haptics from 'expo-haptics';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { KeyboardAvoidingView } from "react-native";
import { BE_URL } from "@/constants/config";
import { toast } from "@backpackapp-io/react-native-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
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

  const router = useRouter();
  const passwordRef = useRef<TextInput | null>(null);

  const onSubmit = async (data: any) => {
    const response = await fetch(`${BE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const res = await response.json();
    if (!res.error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await AsyncStorage.setItem("token", JSON.stringify(res.payload.token));
      await AsyncStorage.setItem("username", JSON.stringify(res.payload.user.username));
      router.push({
        pathname: "/home",
      });
    } else {
      console.log(res);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      toast("Cannot Login!");
    }
    console.log(data);
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

        <Text style={styles.heading}>Login</Text>
        <Text style={styles.des}>Let's get you logged in</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail or Username</Text>
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
            <Text style={styles.errorText}>Enter valid Username or Password</Text>
          )}

          <Text style={styles.label}>Password</Text>
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
            <Text style={styles.errorText}>
              Password must be at least 6 characters.
            </Text>
          )}

          <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitText}>Login</Text>
          </Pressable>
        </View>

        <Text style={styles.account}>
          Don't have an account? ?{" "}
          <Text onPress={() => router.push("/auth/signup")} style={styles.login}>Sign Up</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  heading: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
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
});