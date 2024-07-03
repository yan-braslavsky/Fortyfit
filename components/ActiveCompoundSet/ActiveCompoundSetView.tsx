import React from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import DoneBtn from '@/components/DoneBtn';
import Separator from '@/components/Separator';
import Colors from '@/constants/Colors';
import { SeparatorType } from '@/components/Separator';

interface ActiveCompoundSetViewProps {
    activeSetRepsInput: string;
    imageUrl: string;
    onRepsChange: (reps: string) => void;
    onDonePress: () => void;
}

const ActiveCompoundSetView: React.FC<ActiveCompoundSetViewProps> = ({ activeSetRepsInput, imageUrl, onRepsChange, onDonePress }) => (
    <View style={styles.container}>
        <RepsInput activeSetRepsInput={activeSetRepsInput} onRepsChange={onRepsChange} />
        <Separator type={SeparatorType.Vertical} />
        <ImageContainer imageUrl={imageUrl} />
        <Separator type={SeparatorType.Vertical} />
        <DoneBtn pressHandler={onDonePress} />
    </View>
);

const RepsInput: React.FC<{ activeSetRepsInput: string; onRepsChange: (reps: string) => void; }> = ({ activeSetRepsInput, onRepsChange }) => (
    <View style={styles.inputTextContainer}>
        <Text style={styles.suggestionText}>Reps</Text>
        <TextInput
            style={styles.textInput}
            onChangeText={onRepsChange}
            value={activeSetRepsInput}
            placeholder="12"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            maxLength={2}
            cursorColor={Colors.light.secondary}
            selectionColor={Colors.light.secondary}
        />
    </View>
);

const ImageContainer: React.FC<{ imageUrl: string; }> = ({ imageUrl }) => (
    <View style={styles.inputTextContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
);

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

export default ActiveCompoundSetView;