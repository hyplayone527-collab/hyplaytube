import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StoriesBar({ stories, onStoryPress, currentUser }) {
  const handleAddStory = () => {
    // Navegar a la cámara para crear story
    console.log('Add story');
  };

  const renderStoryItem = (story, index) => (
    <TouchableOpacity
      key={story._id || index}
      style={styles.storyItem}
      onPress={() => onStoryPress(story)}
    >
      <View style={[
        styles.storyAvatar,
        story.viewed && styles.viewedStory
      ]}>
        <Text style={styles.storyAvatarText}>
          {story.author?.username?.charAt(0).toUpperCase() || 'U'}
        </Text>
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {story.author?.username || 'Usuario'}
      </Text>
    </TouchableOpacity>
  );

  const renderAddStory = () => (
    <TouchableOpacity
      style={styles.storyItem}
      onPress={handleAddStory}
    >
      <View style={styles.addStoryAvatar}>
        <View style={styles.userAvatar}>
          <Text style={styles.storyAvatarText}>
            {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.addIcon}>
          <Ionicons name="add" size={16} color="#fff" />
        </View>
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        Tu historia
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderAddStory()}
        {stories.map((story, index) => renderStoryItem(story, index))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4ecdc4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4ecdc4',
    marginBottom: 8,
  },
  viewedStory: {
    borderColor: '#666',
  },
  storyAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  storyUsername: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  addStoryAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4ecdc4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
});