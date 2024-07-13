import React from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import Separator from '@/components/Separator';
import Colors from '@/constants/Colors';
import { SeparatorType } from '@/components/Separator';
import { useState } from 'react';

interface ActiveSingleSetRowProps {
    activeSetRepsInputValue?: string;
    activeSetRepsPlaceholderValue: string;
    imageUrl: string;
    onRepsChange: (reps: string) => void;
}

const ActiveSingleSetRow: React.FC<ActiveSingleSetRowProps> = ({ activeSetRepsInputValue, activeSetRepsPlaceholderValue, imageUrl, onRepsChange }) => {
    return (
        <View style={styles.container}>
            <RepsInput placeholder={activeSetRepsPlaceholderValue} activeSetRepsInputValue={activeSetRepsInputValue} onRepsChange={onRepsChange} />
            <Separator type={SeparatorType.Vertical} />
            <ImageContainer imageUrl={imageUrl} />
        </View>
    )
}

const RepsInput: React.FC<{ activeSetRepsInputValue?: string; placeholder: string; onRepsChange: (reps: string) => void; }> = ({ activeSetRepsInputValue, placeholder, onRepsChange }) => {
    const [inputValue, setInputValue] = useState(activeSetRepsInputValue);

    function onChangeTextHandler(newRepsValue: string) {
        setInputValue(newRepsValue);
        onRepsChange(newRepsValue);
    }


    return <View style={styles.inputTextContainer}>
        <Text style={styles.suggestionText}>Reps</Text>
        <TextInput
            style={styles.textInput}
            onChangeText={onChangeTextHandler}
            value={inputValue}
            placeholder={placeholder}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            maxLength={2}
            cursorColor={Colors.light.secondary}
            selectionColor={Colors.light.secondary}
        />
    </View>
};

const ImageContainer: React.FC<{ imageUrl: string; }> = ({ imageUrl }) => (
    <View style={styles.inputTextContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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
        textAlign: 'center',
    },
    textInput: {
        color: Colors.light.text,
        backgroundColor: 'transparent',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
});

export default ActiveSingleSetRow