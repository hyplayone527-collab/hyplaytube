import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Ionicons name="notifications-outline" size={64} color="#666" />
        <Text style={styles.emptyTitle}>Notificaciones</Text>
        <Text style={styles.emptySubtitle}>
          No tienes notificaciones nuevas
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});