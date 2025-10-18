import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('es')

  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light'
    const savedLanguage = localStorage.getItem('language') || 'es'
    
    setTheme(savedTheme)
    setLanguage(savedLanguage)
    
    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const translations = {
    es: {
      home: 'Inicio',
      profile: 'Perfil',
      chat: 'Chat',
      notifications: 'Notificaciones',
      stories: 'Historias',
      achievements: 'Logros',
      settings: 'Configuración',
      logout: 'Cerrar Sesión',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      post: 'Publicar',
      like: 'Me gusta',
      comment: 'Comentar',
      share: 'Compartir',
      follow: 'Seguir',
      following: 'Siguiendo',
      followers: 'Seguidores',
      posts: 'Publicaciones',
      search: 'Buscar',
      whatsHappening: '¿Qué está pasando?',
      writePost: 'Escribe algo...',
      sendMessage: 'Enviar mensaje',
      darkMode: 'Modo oscuro',
      lightMode: 'Modo claro'
    },
    en: {
      home: 'Home',
      profile: 'Profile',
      chat: 'Chat',
      notifications: 'Notifications',
      stories: 'Stories',
      achievements: 'Achievements',
      settings: 'Settings',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      post: 'Post',
      like: 'Like',
      comment: 'Comment',
      share: 'Share',
      follow: 'Follow',
      following: 'Following',
      followers: 'Followers',
      posts: 'Posts',
      search: 'Search',
      whatsHappening: "What's happening?",
      writePost: 'Write something...',
      sendMessage: 'Send message',
      darkMode: 'Dark mode',
      lightMode: 'Light mode'
    }
  }

  const t = (key) => translations[language][key] || key

  const value = {
    theme,
    language,
    toggleTheme,
    changeLanguage,
    t
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}