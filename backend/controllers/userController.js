    import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "El usuario o email ya existe"
      });
    }

    // Crear nuevo usuario
    const user = await User.create({
      username,
      email,
      password,
      fullName
    });

    // Generar token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      bio: user.bio,
      avatar: user.avatar,
      followers: user.followers,
      following: user.following,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });

    if (user && (await User.comparePassword(password, user.password))) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        bio: user.bio,
        avatar: user.avatar,
        followers: user.followers,
        following: user.following,
        token
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener perfil de usuario
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Remover password y popular followers/following
    const { password, ...userWithoutPassword } = user;
    
    // Obtener datos de followers y following
    const followers = await Promise.all(
      user.followers.map(async (id) => {
        const follower = await User.findById(id);
        return follower ? {
          _id: follower._id,
          username: follower.username,
          fullName: follower.fullName,
          avatar: follower.avatar
        } : null;
      })
    );

    const following = await Promise.all(
      user.following.map(async (id) => {
        const followed = await User.findById(id);
        return followed ? {
          _id: followed._id,
          username: followed.username,
          fullName: followed.fullName,
          avatar: followed.avatar
        } : null;
      })
    );

    res.json({
      ...userWithoutPassword,
      followers: followers.filter(Boolean),
      following: following.filter(Boolean)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, bio, avatar },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seguir usuario
export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (currentUser.following.includes(req.params.userId)) {
      return res.status(400).json({ message: "Ya sigues a este usuario" });
    }

    // Actualizar following del usuario actual
    const updatedFollowing = [...currentUser.following, req.params.userId];
    await User.findByIdAndUpdate(req.user._id, { following: updatedFollowing });

    // Actualizar followers del usuario a seguir
    const updatedFollowers = [...userToFollow.followers, req.user._id];
    await User.findByIdAndUpdate(req.params.userId, { followers: updatedFollowers });

    res.json({ message: "Usuario seguido exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dejar de seguir usuario
export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar following del usuario actual
    const updatedFollowing = currentUser.following.filter(
      id => id !== req.params.userId
    );
    await User.findByIdAndUpdate(req.user._id, { following: updatedFollowing });

    // Actualizar followers del usuario a dejar de seguir
    const updatedFollowers = userToUnfollow.followers.filter(
      id => id !== req.user._id
    );
    await User.findByIdAndUpdate(req.params.userId, { followers: updatedFollowers });

    res.json({ message: "Dejaste de seguir al usuario" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar usuarios
export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    
    const users = await User.search(q);
    
    // Seleccionar solo campos necesarios
    const filteredUsers = users.map(user => ({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      avatar: user.avatar
    }));

    res.json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};