import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import Achievement from "../models/Achievement.js";

// Crear nuevo post
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    const post = await Post.create({
      author: req.user._id,
      content,
      image
    });
    
    const populatedPosts = await Post.findWithPopulate({ _id: post._id });
    const populatedPost = populatedPosts[0];

    // Verificar logros después de crear post
    try {
      await Achievement.checkAndAwardAchievements(req.user._id, {});
    } catch (achievementError) {
      console.log('Error checking achievements:', achievementError);
    }

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener feed de posts
export const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id);
    const followingIds = [...user.following, req.user._id];

    const posts = await Post.findByAuthors(followingIds, { skip, limit });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener posts de un usuario
export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const posts = await Post.findByAuthors([user._id], { skip, limit });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dar like a un post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    let likes = [...post.likes];
    if (likes.includes(req.user._id)) {
      // Quitar like
      likes = likes.filter(id => id !== req.user._id);
    } else {
      // Dar like
      likes.push(req.user._id);
    }

    await Post.findByIdAndUpdate(req.params.postId, { likes });

    // Crear notificación si es un nuevo like
    if (!post.likes.includes(req.user._id) && post.author !== req.user._id) {
      try {
        await Notification.createLikeNotification(
          req.params.postId,
          req.user._id,
          post.author
        );
      } catch (notificationError) {
        console.log('Error creating notification:', notificationError);
      }
    }

    const updatedPosts = await Post.findWithPopulate({ _id: req.params.postId });
    const updatedPost = updatedPosts[0];

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comentar en un post
export const commentPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    const comment = {
      author: req.user._id,
      content,
      createdAt: new Date().toISOString()
    };

    const comments = [...post.comments, comment];
    await Post.findByIdAndUpdate(req.params.postId, { comments });

    // Crear notificación de comentario
    if (post.author !== req.user._id) {
      try {
        await Notification.createCommentNotification(
          req.params.postId,
          req.user._id,
          post.author
        );
      } catch (notificationError) {
        console.log('Error creating notification:', notificationError);
      }
    }

    const updatedPosts = await Post.findWithPopulate({ _id: req.params.postId });
    const updatedPost = updatedPosts[0];

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" });
    }

    if (post.author !== req.user._id) {
      return res.status(403).json({ message: "No autorizado para eliminar este post" });
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: "Post eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};