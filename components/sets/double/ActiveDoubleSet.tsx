import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import DoneBtn from '../../DoneBtn';
import Separator, { SeparatorType } from '../../Separator';

export default function ActiveDoubleSet({ pressHandler, completedReps = 0, imageUrl }:
    { pressHandler?: (completedReps: number) => void, completedReps: number, imageUrl: string }) {
    const [activeSetRepsInput, setActiveSetRepsInput] = useState('');

    function localPressHandler(): void {
        if (pressHandler) {
            pressHandler(parseInt(activeSetRepsInput, 10));
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputTextContainer}>
                <Text style={styles.suggestionText}>Reps</Text>
                <TextInput style={styles.textInput} onChangeText={setActiveSetRepsInput}
                    value={activeSetRepsInput}
                    placeholder="12"
                    keyboardType="numeric" returnKeyType="done"
                    inputMode='numeric'
                    onSubmitEditing={Keyboard.dismiss}
                    maxLength={2}
                    cursorColor={Colors.light.secondary}
                    selectionColor={Colors.light.secondary}

                />
            </View>
            <Separator type={SeparatorType.Vertical} />
            <View style={styles.inputTextContainer}>
                {/* <Text style={styles.suggestionText}>10-12 reps</Text>
                <Text style={styles.smallText}>(Last 12)</Text> */}
                <Image source={{ uri: imageUrl }} style={{ width: 50, height: 50 }} />
            </View>
            <Separator type={SeparatorType.Vertical} />

            <DoneBtn pressHandler={localPressHandler} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light.background,
        marginBottom: 10,
        height: '40%',
    },
    inputTextContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
    },
    suggestionText: {
        color: Colors.light.text,
        fontSize: 20,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    textInput: {
        color: Colors.light.text,
        backfaceVisibility: 'hidden',
        backgroundColor: 'transparent',
        fontSize: 32,
        fontWeight: 'bold',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    smallText: {
        color: Colors.light.text,
        fontSize: 14,
    },
})