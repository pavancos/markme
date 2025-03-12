import { SpaceType } from '@/stores/profileStore'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TextBox from './TextBox';
import { useHaptic } from '@/hook/useHaptic';
import SpaceArrow from './svgs/SpaceArrow';
import { Link, router } from 'expo-router';

interface SpaceItemProps {
    space: SpaceType;
}


const SpaceItem = ({ space }: SpaceItemProps) => {
    const haptic = useHaptic();
    return (
        <View style={styles.spaceContainer}>
            <Link
                key={space._id}
                onPress={() => {
                    haptic("selection");
                    // @ts-ignore
                }}
                href={{
                    pathname: '/space/[id]',
                    params: { id: space._id }
                }}
            >
                <TextBox style={styles.spaceName}>{space.name}</TextBox>
            </Link>
            <SpaceArrow />
        </View>
    )
}
export default SpaceItem
const styles = StyleSheet.create({
    spaceName: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
    },
    spaceContainer: {
        backgroundColor: "#1e1e1e",
        width: '100%',
        borderRadius: 10,
        marginBottom: 12,
        overflow: 'hidden',
        padding: 12,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})