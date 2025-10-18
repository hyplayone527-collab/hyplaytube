import { useTheme } from '../context/ThemeContext'
import Achievements from '../components/Achievements'

const AchievementsPage = () => {
  const { t } = useTheme()

  return (
    <div className="achievements-page">
      <div className="page-header">
        <h1>{t('achievements')}</h1>
        <p>Desbloquea logros completando diferentes actividades en la red social</p>
      </div>
      
      <Achievements />
    </div>
  )
}

export default AchievementsPage