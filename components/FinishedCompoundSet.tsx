import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Separator, { SeparatorType } from '@/components/Separator';
import { ViewStyle } from 'react-native';

interface FinishedCompoundSetProps {
    id: string;
    pressHandler?: (id:string) => void;
    repsCompleted: number[];
    style?: ViewStyle
}

const FinishedCompoundSet: React.FC<FinishedCompoundSetProps> = ({ id, pressHandler, repsCompleted, style }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                { opacity: pressed ? 0.5 : 1 }
                , style
            ]}
            onPress={()=>{
                if(pressHandler){
                    pressHandler(id);
                }
            }}>
            <View style={styles.content}>
                <Text style={styles.statusText}>Completed</Text>
                <Separator type={SeparatorType.Vertical} style={{ marginHorizontal: 0 }} />
                <Text style={styles.repsText}>{repsCompleted.join(',')} Reps</Text>
                <Separator type={SeparatorType.Vertical} style={{ marginHorizontal: 0 }} />
                <Text style={styles.redoText}>REDO</Text>
                <FontAwesome name="rotate-right" size={18} color={Colors.light.text} style={styles.icon} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.ternary,
        borderRadius: 10,
        minHeight: 60,
        opacity: 0.7,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    statusText: {
        color: Colors.light.text,
        fontSize: 16,
    },
    repsText: {
        color: Colors.light.text,
        fontSize: 16,
    },
    redoText: {
        color: Colors.light.text,
        fontSize: 16,
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default FinishedCompoundSet;