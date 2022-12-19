import { useState } from 'react'

import Tabs from '../../components/Auth/Tabs/Tabs'
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm'
import LoginForm from '../../components/Auth/LoginForm/LoginForm'
import './auth.scss'

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login')
  return (
    <div className='container'>
      <div className='form-wrapper'>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'register' ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  )
}

export default Auth
