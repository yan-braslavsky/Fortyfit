import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import Colors from '@/constants/Colors';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

const TimerOverlay = ({ onDismiss, theme = 'light' }) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [isActive, setIsActive] = useState(true);
    const appState = useRef(AppState.currentState);
    const timerRef = useRef(null);

    const colors = Colors[theme];

    useEffect(() => {
        setupNotifications();
        registerBackgroundFetch();
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
            if (timerRef.current) clearInterval(timerRef.current);
            Notifications.dismissAllNotificationsAsync();
        };
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    const newTime = prevTime - 1;
                    updateNotification(newTime);
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            onDismiss();
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, onDismiss]);

    const setupNotifications = async () => {
        await Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    };

    const registerBackgroundFetch = async () => {
        try {
            await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
                minimumInterval: 15 * 60,
                stopOnTerminate: false,
                startOnBoot: true,
            });
            console.log("Background fetch registered");
        } catch (err) {
            console.log("Background fetch failed to register", err);
        }
    };

    const updateNotification = async (time) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Workout Timer',
                body: `Time left: ${formatTime(time)}`,
                data: { timeLeft: time },
            },
            trigger: null,
        });
    };

    const handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            Notifications.dismissAllNotificationsAsync();
        }
        appState.current = nextAppState;
    };

    const handleNotificationResponse = (response) => {
        const { actionIdentifier } = response;
        if (actionIdentifier === 'increase') increaseTime();
        else if (actionIdentifier === 'decrease') decreaseTime();
        else if (actionIdentifier === 'dismiss') onDismiss();
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const increaseTime = () => setTimeLeft(time => time + 15);
    const decreaseTime = () => setTimeLeft(time => Math.max(0, time - 15));

    const styles = StyleSheet.create({
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            backgroundColor: colors.card,
            padding: 40,
            borderRadius: 20,
            alignItems: 'center',
        },
        timerText: {
            fontSize: 72,
            color: colors.text,
        },
        buttonContainer: {
            flexDirection: 'row',
            marginTop: 30,
        },
        button: {
            marginHorizontal: 15,
            padding: 20,
            borderRadius: 10,
        },
        largeButton: {
            backgroundColor: colors.primary,
        },
        smallButton: {
            backgroundColor: colors.secondary,
            padding: 15,
        },
        buttonText: {
            fontSize: 24,
            color: colors.text,
        },
    });

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.largeButton]} onPress={decreaseTime}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.smallButton]} onPress={onDismiss}>
                        <Text style={styles.buttonText}>Dismiss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.largeButton]} onPress={increaseTime}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TimerOverlay;
