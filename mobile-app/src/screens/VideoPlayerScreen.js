import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VideoPlayerScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Ionicons name="play-circle-outline" size={64} color="#666" />
        <Text style={styles.emptyTitle}>Reproductor de Video</Text>
        <Text style={styles.emptySubtitle}>
          Próximamente podrás reproducir videos
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