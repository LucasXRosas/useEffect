import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';

export const ParkingSensor: React.FC = () => {
    const [distancia, setDistancia] = useState<number>(50);

    useEffect(() => {
        console.log('Sistema de Sensores Iniciado');

        const timerId = setInterval(() => {
            console.log('[Heartbeat] Sistema de sensores operando normalmente...');
        }, 2000);

        return () => {
            clearInterval(timerId);
            console.log('Sistema de Sensores Desligado');
        };
    }, []);

    useEffect(() => {
        if (distancia < 20) {
            if (Platform.OS === 'web') {
                console.warn('PERIGO: Muito Próximo! (Distância abaixo de 20cm)');
            } else {
                Alert.alert('PERIGO', 'Muito Próximo!');
            }
        }
    }, [distancia]);

    const handleTextChange = (text: string) => {
        const valorNumerico = parseInt(text, 10);
        setDistancia(isNaN(valorNumerico) ? 0 : valorNumerico);
    };

    const alterarDistancia = (delta: number) => {
        setDistancia((prev) => Math.max(0, prev + delta));
    };

    const getStatusColor = () => {
        if (distancia < 20) return '#FF3B30';
        if (distancia < 50) return '#FF9500';
        return '#34C759';
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Sensor de Ré</Text>

            {distancia < 20 && (
                <View style={styles.alertBanner}>
                    <Text style={styles.alertBannerText}>PERIGO: Muito Próximo!</Text>
                </View>
            )}

            <View style={[styles.gaugeContainer, { borderColor: getStatusColor() }]}>
                <Text style={[styles.distanciaValue, { color: getStatusColor() }]}>
                    {distancia}
                </Text>
                <Text style={styles.unitText}>cm</Text>
            </View>

            <Text style={styles.label}>Digite a distância:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(distancia)}
                onChangeText={handleTextChange}
            />

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.decrementButton]}
                    onPress={() => alterarDistancia(-10)}
                >
                    <Text style={styles.actionButtonText}>- 10 cm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.incrementButton]}
                    onPress={() => alterarDistancia(10)}
                >
                    <Text style={styles.actionButtonText}>+ 10 cm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    alertBanner: {
        backgroundColor: '#FFE5E5',
        borderColor: '#FF3B30',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: '100%',
        alignItems: 'center',
    },
    alertBannerText: {
        color: '#D70015',
        fontWeight: 'bold',
        fontSize: 14,
    },
    gaugeContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    distanciaValue: {
        fontSize: 42,
        fontWeight: 'bold',
    },
    unitText: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '600',
    },
    label: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 48,
        backgroundColor: '#F5F5F7',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        borderWidth: 1,
        borderColor: '#E1E1E5',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    decrementButton: {
        backgroundColor: '#FF9500',
    },
    incrementButton: {
        backgroundColor: '#007AFF',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 15,
    },
});