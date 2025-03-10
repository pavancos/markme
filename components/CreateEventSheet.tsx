import { useSheetStore } from '@/stores/sheetStore';
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetBackdrop,
    BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text, Pressable, Platform, Switch } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAuthStore } from '@/stores/authStore';
import SpacePicker from './SpacePicker';
import RNPickerSelect from 'react-native-picker-select';

const CreateEventSheet = () => {
    const { isCreateEventOpen, closeCreateEventSheet } = useSheetStore();
    const { user } = useAuthStore();
    const defaultSpace = user?.managingSpaces[0];
    const bottomSheetRef = useRef<BottomSheet>(null);
    const pickerRef = useRef<RNPickerSelect>(null);
    const now = new Date();
    const startDateTime = new Date(now);
    const endDateTime = new Date(now);

    endDateTime.setHours(23, 59, 0, 0);
    const [startDate, setStartDate] = useState(startDateTime);
    const [endDate, setEndDate] = useState(endDateTime);
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            spaceId: defaultSpace?.id,
            eventDetails: {
                name: '',
                description: '',
                timings: {
                    start: startDateTime.toISOString(),
                    end: endDateTime.toISOString(),
                },
                status: 'Upcoming',
                venue: { name: '', address: '' },
                visibility: 'Public',
            },
        },
    });

    useEffect(() => {
        return () => {
            reset();
            setStartDate(startDateTime);
            setEndDate(endDateTime);
            bottomSheetRef.current?.close();
        };
    }, []);

    useEffect(() => {
        if (isCreateEventOpen) {
            bottomSheetRef.current?.snapToIndex(0)
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isCreateEventOpen]);
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState<'start' | 'end'>('start');
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const isIOS = Platform.OS === 'ios';

    const showDatePicker = (type: 'start' | 'end') => {
        setPickerMode(type);
        setMode('date');
        setShowPicker(true);
    };

    const showTimePicker = (type: 'start' | 'end') => {
        setPickerMode(type);
        setMode('time');
        setShowPicker(true);
    };

    const onPickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            if (pickerMode === 'start') {
                setStartDate(selectedDate);
                setValue('eventDetails.timings.start', selectedDate.toISOString());
            } else {
                setEndDate(selectedDate);
                setValue('eventDetails.timings.end', selectedDate.toISOString());
            }
        }
        setShowPicker(false);
    };

    const onCreateEvent = async (data: any) => {
        console.log(data);
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['88%']}
            enablePanDownToClose
            enableDynamicSizing={false}
            keyboardBehavior="extend"
            animateOnMount
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
            )}
            onChange={(index) => index === -1 && closeCreateEventSheet()}
            handleStyle={styles.handle}
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.indicator}
        >
            <BottomSheetScrollView style={styles.contentContainer}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.createSheetContainer}>
                    <Text style={styles.mainHeader}>Create Event</Text>
                    <SpacePicker control={control} pickerRef={pickerRef} spaces={user?.managingSpaces!} />
                    {errors.spaceId && <Text style={styles.errorText}>Space selection is required</Text>}

                    <Text style={styles.label}>Name</Text>
                    <Controller
                        control={control}
                        rules={{ required: true, minLength: 6 }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter Event Name"
                                placeholderTextColor="#888"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="eventDetails.name"
                    />
                    {errors.eventDetails?.name?.type === 'required' && <Text style={styles.errorText}>Name is required</Text>}
                    {errors.eventDetails?.name?.type === 'minLength' && <Text style={styles.errorText}>Name should be atleast 6 characters</Text>}
                    <Text style={styles.label}>Description</Text>
                    <Controller
                        control={control}
                        rules={{ required: false }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter Event Description"
                                placeholderTextColor="#888"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="eventDetails.description"
                    />
                    <Text style={styles.label}>Start Date & Time</Text>
                    {isIOS ? (
                        <DateTimePicker
                            value={startDate}
                            mode="datetime"
                            minimumDate={new Date()}
                            style={{ alignSelf: 'flex-start', width: '100%', padding: 0, marginLeft: -10 }}
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setStartDate(selectedDate);
                                    setValue('eventDetails.timings.start', selectedDate.toISOString());
                                }
                            }}
                        />
                    ) : (
                        <>
                            <View style={styles.androidPressableContainer}>
                                <Pressable
                                    onPress={() => showDatePicker('start')}
                                    style={styles.androidPressable}
                                >
                                    <Text
                                        style={styles.androidPressableText}>
                                        {startDate.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}</Text>
                                </Pressable>
                                <Pressable onPress={() => showTimePicker('start')}
                                    style={styles.androidPressable}>
                                    <Text
                                        style={styles.androidPressableText}>{startDate.toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</Text>
                                </Pressable>
                            </View>
                        </>
                    )}

                    <Text style={styles.label}>End Date & Time</Text>
                    {isIOS ? (
                        <DateTimePicker
                            value={endDate}
                            minimumDate={startDate}
                            style={{ alignSelf: 'flex-start', width: '100%', padding: 0, marginLeft: -10 }}
                            mode="datetime"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setEndDate(selectedDate);
                                    setValue('eventDetails.timings.end', selectedDate.toISOString());
                                }
                            }}
                        />
                    ) : (
                        <>
                            <View style={styles.androidPressableContainer}>
                                <Pressable onPress={() => showDatePicker('end')}
                                    style={styles.androidPressable}>
                                    <Text
                                        style={styles.androidPressableText}>
                                        {endDate.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Text>
                                </Pressable>
                                <Pressable onPress={() => showTimePicker('end')}
                                    style={styles.androidPressable}>
                                    <Text
                                        style={styles.androidPressableText}>{endDate.toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                    {showPicker && !isIOS && (
                        <DateTimePicker 
                            value={pickerMode === 'start' ? 
                            startDate : endDate} 
                            mode={mode} 
                            is24Hour 
                            onChange={onPickerChange} 
                            minimumDate={pickerMode === 'start' ? new Date() : startDate}
                            style={{
                                backgroundColor: '#1e1e1e',
                                width: '100%',
                            }}
                        />
                    )}

                    <Text style={styles.label}>Venue Name</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter Venue Name"
                                placeholderTextColor="#888"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="eventDetails.venue.name"
                    />
                    {errors.eventDetails?.venue?.name?.type === 'required' && <Text style={styles.errorText}>Venue Name is required</Text>}
                    <Text style={styles.label}>Venue Address</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BottomSheetTextInput
                                style={styles.input}
                                placeholder="Enter Venue Address"
                                placeholderTextColor="#888"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="eventDetails.venue.address" />
                    {errors.eventDetails?.venue?.address?.type === 'required' && <Text style={styles.errorText}>Venue Address is required</Text>}
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 20
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 18
                                    }}>Want your event Public?</Text>
                                    <Switch
                                        value={value === 'Public'}
                                        onValueChange={(val: any) => onChange(val ? 'Public' : 'Private')}
                                        thumbColor={value === 'Public' ? '#f4f3f4' : '#f4f3f4'}
                                    />
                                </View>
                            </>
                        )}
                        name="eventDetails.visibility"
                    />

                    <View style={styles.btnContainer}>
                        <Pressable style={styles.Btn} onPress={handleSubmit(onCreateEvent)}>
                            <Text style={styles.btnText}>Create Event</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

export default CreateEventSheet;

const styles = StyleSheet.create({
    handle: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    background: {
        backgroundColor: '#1e1e1e',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    indicator: {
        backgroundColor: '#818181',
        width: 40
    },
    contentContainer: {
        backgroundColor: '#1e1e1e',
    },
    createSheetContainer: {
        padding: 20,
    },
    mainHeader: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20
    },
    btnContainer: {
        flexDirection: 'column',
        paddingBottom: 20
    },
    Btn: {
        backgroundColor: '#c5c5c6',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    btnText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    label: {
        color: 'white',
        fontSize: 18,
        marginTop: 15,
        marginBottom: 5
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        fontSize: 16,
        padding: 12,
        borderRadius: 10
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 2
    },
    androidPressable: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 12,
        borderRadius: 10
    },
    androidPressableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    androidPressableText: {
        color: 'white',
        fontSize: 16
    }
});