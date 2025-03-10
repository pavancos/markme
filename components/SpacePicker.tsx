import { View, Pressable, Platform, Text } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';

interface Space {
    id: string;
    name: string;
}

interface SpacePickerProps {
    control: Control<any>;
    pickerRef: React.RefObject<RNPickerSelect>;
    spaces: Space[];
}

const SpacePicker = ({ control, pickerRef, spaces = [] }: SpacePickerProps) => {
    return (
        <>
            <Text style={{
                color: 'white',
                fontSize: 18,
                marginBottom: 5
            }}>
                Space
            </Text>
            <Controller
                control={control}
                name="spaceId"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    Platform.OS === 'ios' ? (
                        <Pressable onPress={() => pickerRef.current?.togglePicker()}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#444',
                                borderRadius: 8,
                                padding: 12,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#222',
                            }}>
                                <RNPickerSelect
                                    ref={pickerRef}
                                    darkTheme={true}
                                    value={value}
                                    onValueChange={onChange}
                                    items={spaces.map(space => ({
                                        label: space.name,
                                        value: space.id
                                    }))}
                                    useNativeAndroidPickerStyle={false}
                                    style={{
                                        inputIOS: { color: 'white', fontSize: 16 },
                                        inputAndroid: { color: 'white', fontSize: 16 },
                                        placeholder: { color: '#888' },
                                    }}
                                    placeholder={{ label: "Select Space", value: "", color: "#888" }}
                                />
                            </View>
                        </Pressable>
                    ) : (
                        <View style={{
                            borderWidth: 1,
                            borderColor: '#444',
                            borderRadius: 8,
                            backgroundColor: '#222',
                        }}>
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                                style={{ color: 'white', fontSize: 16 }}
                                dropdownIconColor="white"
                            >
                                <Picker.Item label="Select Space" value="" color="#888" />
                                {spaces.map(space => (
                                    <Picker.Item key={space.id} label={space.name} value={space.id} />
                                ))}
                            </Picker>
                        </View>
                    )
                )}
            />
        </>
    );
};

export default SpacePicker;
