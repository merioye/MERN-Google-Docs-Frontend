import './Home.scss'
import { CreateDoc, DocumentsList } from '../../components/Home'
import { Navbar } from '../../components/Shared'

const Home = () => {
  return (
    <div className='home-page'>
      <Navbar />
      <CreateDoc />
      <DocumentsList />
    </div>
  )
}

export default Home
