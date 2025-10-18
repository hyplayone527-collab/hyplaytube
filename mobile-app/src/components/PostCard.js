import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function PostCard({ post, onLike, onComment, onShare, currentUser }) {
  const [liked, setLiked] = useState(
    post.likes?.includes(currentUser?._id) || false
  );

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays}d`;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {post.author?.username?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.username}>{post.author?.username || 'Usuario'}</Text>
            <Text style={styles.timestamp}>{formatTime(post.createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {post.content && (
        <Text style={styles.content}>{post.content}</Text>
      )}

      {/* Media */}
      {post.mediaUrl && (
        <View style={styles.mediaContainer}>
          {post.mediaType === 'image' ? (
            <Image source={{ uri: post.mediaUrl }} style={styles.media} />
          ) : (
            <View style={styles.videoPlaceholder}>
              <Ionicons name="play-circle" size={64} color="#4ecdc4" />
              <Text style={styles.videoText}>Video</Text>
            </View>
          )}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={24} 
            color={liked ? "#ff6b6b" : "#666"} 
          />
          <Text style={styles.actionText}>{post.likes?.length || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <Ionicons name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{post.comments?.length || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Ionicons name="share-outline" size={24} color="#666" />
        </TouchableOpacity>

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Comments Preview */}
      {post.comments && post.comments.length > 0 && (
        <TouchableOpacity style={styles.commentsPreview} onPress={onComment}>
          <Text style={styles.commentsText}>
            Ver los {post.comments.length} comentarios
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ecdc4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  content: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  mediaContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#000',
  },
  media: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoText: {
    color: '#4ecdc4',
    fontSize: 16,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  spacer: {
    flex: 1,
  },
  commentsPreview: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  commentsText: {
    color: '#666',
    fontSize: 14,
  },
});