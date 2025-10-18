import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import PostCard from '../components/PostCard';
import StoriesBar from '../components/StoriesBar';
import { postService } from '../services/postService';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { user } = useAuth();
  const { socket, onEvent, offEvent } = useSocket();

  useEffect(() => {
    loadInitialData();
    setupSocketListeners();

    return () => {
      cleanupSocketListeners();
    };
  }, []);

  const setupSocketListeners = () => {
    if (socket) {
      onEvent('newPost', handleNewPost);
      onEvent('postLiked', handlePostLiked);
      onEvent('newStory', handleNewStory);
    }
  };

  const cleanupSocketListeners = () => {
    if (socket) {
      offEvent('newPost', handleNewPost);
      offEvent('postLiked', handlePostLiked);
      offEvent('newStory', handleNewStory);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handlePostLiked = (updatedPost) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handleNewStory = (newStory) => {
    setStories(prevStories => [newStory, ...prevStories]);
  };

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [postsData, storiesData] = await Promise.all([
        postService.getPosts(1),
        postService.getStories(),
      ]);

      setPosts(postsData.posts || []);
      setStories(storiesData.stories || []);
      setHasMore(postsData.hasMore || false);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    await loadInitialData();
    setRefreshing(false);
  }, []);

  const loadMorePosts = async () => {
    if (!hasMore || loading) return;

    try {
      const nextPage = page + 1;
      const data = await postService.getPosts(nextPage);
      
      setPosts(prevPosts => [...prevPosts, ...(data.posts || [])]);
      setPage(nextPage);
      setHasMore(data.hasMore || false);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await postService.likePost(postId);
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post._id === postId ? updatedPost : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
      Alert.alert('Error', 'No se pudo dar like al post');
    }
  };

  const handleCommentPress = (post) => {
    navigation.navigate('Comments', { post });
  };

  const handleSharePress = (post) => {
    // Implementar funcionalidad de compartir
    Alert.alert('Compartir', 'Funcionalidad de compartir próximamente');
  };

  const handleStoryPress = (story) => {
    navigation.navigate('StoryViewer', { story, stories });
  };

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={() => handleLikePost(item._id)}
      onComment={() => handleCommentPress(item)}
      onShare={() => handleSharePress(item)}
      currentUser={user}
    />
  );

  const renderHeader = () => (
    <View>
      <StoriesBar
        stories={stories}
        onStoryPress={handleStoryPress}
        currentUser={user}
      />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="film-outline" size={64} color="#666" />
      <Text style={styles.emptyTitle}>No hay posts aún</Text>
      <Text style={styles.emptySubtitle}>
        Sigue a otros usuarios para ver su contenido
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Explore')}
      >
        <Text style={styles.exploreButtonText}>Explorar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4ecdc4"
            colors={['#4ecdc4']}
          />
        }
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={posts.length === 0 ? styles.emptyList : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyList: {
    flexGrow: 1,
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
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});