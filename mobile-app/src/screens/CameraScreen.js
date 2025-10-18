import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [capturedMedia, setCapturedMedia] = useState(null);
  
  const cameraRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        setCapturedMedia({
          uri: photo.uri,
          type: 'image',
        });
        setShowPostModal(true);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'No se pudo tomar la foto');
      }
    }
  };

  const recordVideo = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync({
          quality: Camera.Constants.VideoQuality['720p'],
          maxDuration: 60, // 60 segundos máximo
        });
        
        setCapturedMedia({
          uri: video.uri,
          type: 'video',
        });
        setShowPostModal(true);
      } catch (error) {
        console.error('Error recording video:', error);
        Alert.alert('Error', 'No se pudo grabar el video');
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  const handlePost = async () => {
    if (!capturedMedia) return;

    try {
      // Aquí implementarías la lógica para subir el archivo
      // Por ahora solo simulamos la creación del post
      
      const postData = {
        content: postContent,
        mediaUrl: capturedMedia.uri,
        mediaType: capturedMedia.type,
      };

      // Simular creación del post
      console.log('Creating post:', postData);
      
      Alert.alert('Éxito', 'Post creado correctamente', [
        {
          text: 'OK',
          onPress: () => {
            setShowPostModal(false);
            setPostContent('');
            setCapturedMedia(null);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'No se pudo crear el post');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Solicitando permisos de cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No hay acceso a la cámara</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.permissionButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name="camera-reverse" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.galleryButton}>
              <Ionicons name="images" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.captureButtons}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.videoButton, isRecording && styles.recordingButton]}
                onPress={isRecording ? stopRecording : recordVideo}
              >
                <Ionicons 
                  name={isRecording ? "stop" : "videocam"} 
                  size={24} 
                  color="#fff" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.placeholder} />
          </View>
        </View>
      </Camera>

      {/* Post Modal */}
      <Modal
        visible={showPostModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowPostModal(false)}
            >
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Nuevo Post</Text>
            
            <TouchableOpacity onPress={handlePost}>
              <Text style={styles.modalPost}>Publicar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <TextInput
              style={styles.postInput}
              placeholder="Escribe algo sobre tu post..."
              placeholderTextColor="#666"
              value={postContent}
              onChangeText={setPostContent}
              multiline
              maxLength={500}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtons: {
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  videoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#ff4444',
  },
  placeholder: {
    width: 50,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalCancel: {
    color: '#666',
    fontSize: 16,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalPost: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  postInput: {
    color: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
});