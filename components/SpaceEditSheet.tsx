import { useSheetStore } from '@/stores/sheetStore';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TextBox from './TextBox';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import { BE_URL } from '@/constants/config';
import { toast } from '@backpackapp-io/react-native-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { useProfileStore } from '@/stores/profileStore';

const SpaceEditSheet = () => {
    const { isSpaceEditOpen, closeSpaceEditSheet, selectedSpace } = useSheetStore();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const passwordRef = useRef<TextInput | null>(null);
    const [isUserNotValid, setIsUserNotValid] = useState(true);
    const [allAdmins, setAllAdmins] = useState<string[]>(
        selectedSpace?.admins.map((admin) => admin.username) || []
    );
    const usernameRef = useRef<TextInput | null>(null);
    const {fetchProfile} = useProfileStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            spaceName: selectedSpace?.name || "",
            spaceIcon: selectedSpace?.icon || "",
            adminName: "",
        },
    });

    const debouncedCheckUsername = useMemo(() =>
        _.debounce(async (username: string) => {
            const res = await fetch(`${BE_URL}/auth/checkUser?username=${username}`);
            const data = await res.json();
            setIsUserNotValid(prev => prev !== !data.error ? !data.error : prev);
        }, 500), []
    );
    useEffect(() => {
        if (isSpaceEditOpen && selectedSpace) {
            bottomSheetRef.current?.snapToIndex(0);
            reset({
                spaceName: selectedSpace.name || "",
                spaceIcon: selectedSpace.icon || "",
                adminName: "",
            });
            setAllAdmins(selectedSpace.admins.map((admin) => admin.username) || []);
        } else {
            bottomSheetRef.current?.close();
            reset();
            setAllAdmins([]);
        }
    }, [isSpaceEditOpen, selectedSpace, reset]); 
    const renderBackDrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                pressBehavior="close"
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        []
    );

    async function handleAddUsername() {
        const adminName = control._formValues.adminName?.trim();
        if (!adminName) {
            toast("Username cannot be empty");
            return;
        }
        if (isUserNotValid) {
            toast("Not a Valid Username");
            return;
        }
        if (allAdmins.includes(adminName)) {
            toast("Username already added");
            return;
        }
        setAllAdmins((prevAdmins) => [...prevAdmins, adminName]);
        setValue("adminName", "");
    }

    function handleRemoveAdmin(admin: string) {
        setAllAdmins((prevAdmins) =>
            prevAdmins.filter((adminName) => adminName !== admin)
        );
    }

    const handleUpdateSpace = async (data: any) => {
        try {
            let token = await AsyncStorage.getItem("token");
            if (!token) {
                toast("You are not logged in");
                return;
            }
            token = JSON.parse(token);
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', `Bearer ${token}`);
            const response = await fetch(`${BE_URL}/space/update`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                    spaceId: selectedSpace?._id,
                    spaceDetails:{
                        name: data.spaceName,
                        icon: data.spaceIcon === "" ? "https://hotemoji.com/images/dl/t/space-emoji-by-google.png" : data.spaceIcon,
                        admins: allAdmins,
                    }
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast("Space Updated successfully!");
                closeSpaceEditSheet();
                reset();
                setAllAdmins([]);
                fetchProfile(token!);
            } else {
                console.error("Error updating space:", result.error);
                toast(result.error || "Failed to create space");
            }
        } catch (error) {
            console.error("Error updating space:", error);
            toast("An error occurred while updating the space");
        }
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['58%']}
            enablePanDownToClose={true}
            animateOnMount={true}
            bottomInset={0}
            enableDynamicSizing={false}
            onChange={(index) => {
                if (index === -1) {
                    closeSpaceEditSheet();
                }
            }}
            handleStyle={styles.handle}
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.indicator}
            backdropComponent={renderBackDrop}
        >
            <BottomSheetScrollView
                style={styles.contentContainer}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.createSheetContainer}>
                    <TextBox style={styles.mainHeader}>Edit Space</TextBox>
                    <TextBox style={[styles.label]}>Name</TextBox>
                    <Controller
                        control={control}
                        rules={{ required: true, minLength: 6 }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter a Space Name"
                                placeholderTextColor={"#888"}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="spaceName"
                    />
                    {errors.spaceName && (
                        <TextBox style={styles.errorText}>Space Name is required and must be at least 6 characters long.</TextBox>
                    )}
                    <TextBox style={[styles.label]}>Icon</TextBox>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter a Image URL"
                                placeholderTextColor={"#888"}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="spaceIcon"
                    />
                    <TextBox style={[styles.label]}>Admin</TextBox>
                    <View style={{ marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                        {allAdmins.map((admin, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handleRemoveAdmin(admin)}
                            >
                                <TextBox key={index} style={{
                                    color: "white",
                                    fontSize: 16,
                                    padding: 4,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    marginBottom: 10
                                }}>{admin}</TextBox>
                            </Pressable>
                        ))}
                    </View>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BottomSheetTextInput
                                ref={usernameRef}
                                style={styles.input}
                                placeholder="Enter a Username"
                                placeholderTextColor={"#888"}
                                onBlur={onBlur}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="off"
                                onChangeText={(text) => {
                                    onChange(text);
                                    debouncedCheckUsername(text);
                                }}
                                value={value}
                                returnKeyType="default"
                                keyboardAppearance='dark'
                                clearButtonMode='while-editing'
                                onSubmitEditing={handleAddUsername}
                            />
                        )}
                        name="adminName"
                    />
                    {isUserNotValid && (
                        <TextBox style={styles.errorText}>Not a Valid Username</TextBox>
                    )}
                    <Pressable
                        style={styles.Btn}
                        onPress={handleSubmit(handleUpdateSpace)}
                    >
                        <TextBox style={styles.btnText}>Update Space</TextBox>
                    </Pressable>
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

export default SpaceEditSheet;

const styles = StyleSheet.create({
    handle: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    background: {
        backgroundColor: '#1e1e1e',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    indicator: {
        backgroundColor: '#818181',
        width: 40,
    },
    contentContainer: {
        backgroundColor: '#1e1e1e',
    },
    createSheetContainer: {
        padding: 20
    },
    mainHeader: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20
    },
    btnContainer: {
        flexDirection: "column",
    },
    Btn: {
        backgroundColor: "#c5c5c6",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    btnText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    label: {
        color: "white",
        fontSize: 18,
        marginTop: 15,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "white",
        fontSize: 16,
        padding: 12,
        borderRadius: 10,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 2,
    },
});