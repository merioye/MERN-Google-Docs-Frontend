import { useState } from 'react'

import { Tabs } from '../../components/Auth'
import { RegisterForm } from '../../components/Auth'
import { LoginForm } from '../../components/Auth'
import './auth.scss'

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login')
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'register' ? <RegisterForm setActiveTab={setActiveTab} /> : <LoginForm />}
      </div>
    </div>
  )
}

export default Auth
