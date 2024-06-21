import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import DoneBtn from './DoneBtn'
import Separator, { SeparatorType } from './Separator'
import Colors from '@/constants/Colors';
import { useState } from 'react'

const ActiveSet = () => {
    const [activeSetRepsInput, setActiveSetRepsInput] = useState('25');
    return (
        <View style={styles.container}>
            <View style={styles.inputTextContainer}>
                <Text style={styles.suggestionText}>Reps</Text>
                <TextInput style={styles.textInput} onChangeText={setActiveSetRepsInput}
                    value={activeSetRepsInput}
                    placeholder="25kg"
                    keyboardType="numeric" returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss} />
            </View>
            <Separator type={SeparatorType.Vertical} />
            <View style={styles.inputTextContainer}>
                <Text style={styles.suggestionText}>10-12 reps</Text>
                <Text style={styles.smallText}>(Last 12)</Text>
            </View>
            <Separator type={SeparatorType.Vertical} />

            <DoneBtn pressHandler={() => alert('Done button pressed')} />
        </View>
    )
}

export default ActiveSet

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light.border,
        marginBottom: 10,
        height: '40%',
    },
    inputTextContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    suggestionText: {
        color: Colors.light.tabIconDefault,
        fontSize: 14,
    },
    textInput: {
        color: Colors.light.text,
        backfaceVisibility: 'hidden',
        backgroundColor: 'transparent',
        fontSize: 24,
        fontWeight: 'bold',
    },
    smallText: {
        color: Colors.light.smallText,
        fontSize: 12,
    },
})