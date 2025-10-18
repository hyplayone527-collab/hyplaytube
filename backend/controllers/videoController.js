import Video from "../models/Video.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Subir nuevo video
export const uploadVideo = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      videoUrl, 
      thumbnail, 
      category, 
      tags, 
      isPublic = true,
      duration 
    } = req.body;

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnail,
      author: req.user._id,
      category,
      tags: tags || [],
      isPublic,
      duration: parseInt(duration) || 0
    });

    const populatedVideos = await Video.findWithPopulate({ _id: video._id });
    const populatedVideo = populatedVideos[0];

    res.status(201).json(populatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener videos trending
export const getTrendingVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const videos = await Video.findWithPopulate({}, { 
      sortBy: 'trending', 
      skip, 
      limit 
    });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener videos por categoría
export const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 20;

    const videos = await Video.findByCategory(category, { limit });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener video específico
export const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Incrementar vistas
    await Video.incrementViews(videoId);

    const videos = await Video.findWithPopulate({ _id: videoId });
    const video = videos[0];

    if (!video) {
      return res.status(404).json({ message: "Video no encontrado" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener videos del canal (usuario)
export const getChannelVideos = async (req, res) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Canal no encontrado" });
    }

    const videos = await Video.findByChannel(user._id, { skip, limit });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Dislike video
export const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { action } = req.body; // 'like' o 'dislike'

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video no encontrado" });
    }

    let likes = [...video.likes];
    let dislikes = [...video.dislikes];

    // Remover de ambas listas primero
    likes = likes.filter(id => id !== req.user._id);
    dislikes = dislikes.filter(id => id !== req.user._id);

    // Agregar a la lista correspondiente
    if (action === 'like') {
      likes.push(req.user._id);
    } else if (action === 'dislike') {
      dislikes.push(req.user._id);
    }

    await Video.findByIdAndUpdate(videoId, { likes, dislikes });

    // Crear notificación si es like
    if (action === 'like' && video.author !== req.user._id) {
      try {
        await Notification.create({
          type: 'video_like',
          sender: req.user._id,
          recipient: video.author,
          video: videoId,
          message: 'le gustó tu video'
        });
      } catch (notificationError) {
        console.log('Error creating notification:', notificationError);
      }
    }

    const updatedVideos = await Video.findWithPopulate({ _id: videoId });
    res.json(updatedVideos[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comentar video
export const commentVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { content } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video no encontrado" });
    }

    const comment = {
      author: req.user._id,
      content,
      createdAt: new Date().toISOString(),
      likes: []
    };

    const comments = [...video.comments, comment];
    await Video.findByIdAndUpdate(videoId, { comments });

    // Crear notificación
    if (video.author !== req.user._id) {
      try {
        await Notification.create({
          type: 'video_comment',
          sender: req.user._id,
          recipient: video.author,
          video: videoId,
          message: 'comentó tu video'
        });
      } catch (notificationError) {
        console.log('Error creating notification:', notificationError);
      }
    }

    const updatedVideos = await Video.findWithPopulate({ _id: videoId });
    res.json(updatedVideos[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar videos
export const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;
    const limit = parseInt(req.query.limit) || 20;

    if (!q) {
      return res.json([]);
    }

    const videos = find('videos').filter(video => 
      video.isPublic && (
        video.title.toLowerCase().includes(q.toLowerCase()) ||
        video.description.toLowerCase().includes(q.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(q.toLowerCase()))
      )
    ).slice(0, limit);

    const populatedVideos = videos.map(video => populate(video, [
      { path: 'author', collection: 'users', select: 'username fullName avatar' }
    ]));

    res.json(populatedVideos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar video
export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video no encontrado" });
    }

    if (video.author !== req.user._id) {
      return res.status(403).json({ message: "No autorizado para eliminar este video" });
    }

    await Video.findByIdAndDelete(videoId);
    res.json({ message: "Video eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener estadísticas del canal
export const getChannelStats = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: "Canal no encontrado" });
    }

    const videos = await Video.find({ author: user._id, isPublic: true });
    
    const stats = {
      totalVideos: videos.length,
      totalViews: videos.reduce((sum, video) => sum + video.views, 0),
      totalLikes: videos.reduce((sum, video) => sum + video.likes.length, 0),
      totalComments: videos.reduce((sum, video) => sum + video.comments.length, 0),
      subscribers: user.followers.length,
      totalRevenue: videos.reduce((sum, video) => sum + (video.revenue || 0), 0)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};