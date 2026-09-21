import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ParkingSensor } from './components/ParkingSensor';

export default function App() {
  const [isSensorActive, setIsSensorActive] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Painel do Veículo</Text>

        <TouchableOpacity
          style={[
            styles.powerButton,
            isSensorActive ? styles.powerOff : styles.powerOn,
          ]}
          onPress={() => setIsSensorActive((prev) => !prev)}
          activeOpacity={0.8}
        >
          <Text style={styles.powerButtonText}>
            {isSensorActive ? 'Desligar Sensor' : 'Ligar Sensor'}
          </Text>
        </TouchableOpacity>
      </View>

      {isSensorActive ? (
        <ParkingSensor />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            O sistema de sensores está desligado.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100vh' as any, // Garante 100% da altura da tela no navegador
    backgroundColor: '#F2F2F7',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  powerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  powerOn: {
    backgroundColor: '#34C759',
  },
  powerOff: {
    backgroundColor: '#FF3B30',
  },
  powerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  placeholder: {
    backgroundColor: '#E5E5EA',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  placeholderText: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
  },
});