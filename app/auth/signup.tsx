import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import _ from "lodash";
import { useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      gender: "Male",
    },
  });

  const router = useRouter();
  const [form, setForm] = useState({ gender: "Male" });
  const pickerRef = useRef<RNPickerSelect | null>(null);

  const debouncedCheckUsername = _.debounce((username: string) => {
    console.log(`Checking eligibility for username: ${username}`);
  }, 500);

  const onSubmit = (data: any) => {
    console.log(data);



  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Sign Up</Text>
        <Text style={styles.des}>Let's setup your account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                placeholderTextColor={"#888"}
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  debouncedCheckUsername(text);
                }}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={styles.errorText}>Username is required.</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor={"#888"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errorText}>Valid email is required.</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor={"#888"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorText}>
              Password must be at least 6 characters.
            </Text>
          )}

          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor={"#888"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="fullName"
          />
          {errors.fullName && (
            <Text style={styles.errorText}>Full name is required.</Text>
          )}

          {/* Gender Picker with Dropdown Button */}
          <Pressable
            onPress={() => {
              if (pickerRef.current) {
                // @ts-ignore
                pickerRef.current?.togglePicker();
              }
            }}
          >
            <Text style={styles.label}>Gender</Text>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    ref={pickerRef}
                    darkTheme={true}
                    value={value}
                    onValueChange={(gender) => onChange(gender)}
                    items={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputIOS: styles.pickerInput,
                      inputAndroid: styles.pickerInput,
                      placeholder: { color: "#888" },
                    }}
                    placeholder={{ label: "Select Gender", value: null, color: "#888" }}
                    Icon={() => (
                      <ChevronDown color="#888" size={24} style={styles.iconContainer} />
                    )}
                  />
                </View>
              )}
            />
          </Pressable>

          <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitText}>Sign Up</Text>
          </Pressable>
        </View>

        <Text style={styles.account}>
          Already have an account?{" "}
          <Text onPress={() => router.push("/auth/login")} style={styles.login}>Login</Text>
        </Text>

      </View>
    </ScrollView>
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