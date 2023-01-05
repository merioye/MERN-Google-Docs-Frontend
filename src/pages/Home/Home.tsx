import { useQuery } from '@apollo/client'

import { CreateDoc, DocumentsList } from '../../components/Home'
import { Navbar } from '../../components/Shared'
import { GETMYDOCS } from '../../graphql/queries/doc.queries'
import { Doc } from '../../types/shared.types'
import { GetMyDocsData } from '../../types/useQuery.types'
import './Home.scss'

const Home = () => {
  const { data, loading, error } = useQuery<GetMyDocsData>(GETMYDOCS)

  return (
    <div className='home-page'>
      <Navbar />
      <CreateDoc />
      {error && <h5>{error.message}</h5>}
      {loading ? (
        <h4 style={{ textAlign: 'center', marginTop: '50px' }}>Loading documents...</h4>
      ) : (
        <DocumentsList docs={data?.getMyDocs.docs as Doc[]} />
      )}
    </div>
  )
}

export default Home
