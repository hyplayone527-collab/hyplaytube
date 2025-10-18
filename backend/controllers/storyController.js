import Story from "../models/Story.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Crear nueva historia
export const createStory = async (req, res) => {
  try {
    const { content, media, type = 'image' } = req.body;

    const story = await Story.create({
      author: req.user._id,
      content,
      media,
      type, // 'image', 'video', 'text'
      backgroundColor: req.body.backgroundColor || '#000000'
    });

    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener historias activas
export const getActiveStories = async (req, res) => {
  try {
    const stories = await Story.findActiveStories();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ver una historia específica
export const viewStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    
    const story = await Story.addView(storyId, req.user._id);
    
    if (!story) {
      return res.status(404).json({ message: "Historia no encontrada" });
    }

    res.json({ message: "Historia vista", story });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener historias de un usuario
export const getUserStories = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const stories = await Story.find({ author: user._id, isActive: true });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar historia
export const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Historia no encontrada" });
    }

    if (story.author !== req.user._id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    await Story.updateOne({ _id: storyId }, { isActive: false });
    res.json({ message: "Historia eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};