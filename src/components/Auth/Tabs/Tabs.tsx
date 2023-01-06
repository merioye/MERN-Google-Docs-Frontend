import './Tabs.scss'
import { motion } from 'framer-motion'

type IProps = {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}
const Tabs = ({ activeTab, setActiveTab }: IProps) => {
  return (
    <div>
      <div className='tabs' style={{ width: '100%' }}>
        <div
          className={activeTab === 'login' ? 'active-tab' : ''}
          onClick={() => setActiveTab('login')}
        >
          Login
        </div>
        <div
          className={activeTab === 'register' ? 'active-tab' : ''}
          onClick={() => setActiveTab('register')}
        >
          Register
        </div>
      </div>
      <motion.div
        className='border-bottom'
        animate={{ translateX: activeTab === 'login' ? 0 : '100%' }}
      ></motion.div>
    </div>
  )
}

export default Tabs
