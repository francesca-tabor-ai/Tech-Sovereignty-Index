import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import CountryDetail from './pages/CountryDetail'
import Simulator from './pages/Simulator'
import Procurement from './pages/Procurement'
import Methodology from './pages/Methodology'
import Data from './pages/Data'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/country/:countryId" element={<CountryDetail />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/procurement" element={<Procurement />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </Layout>
  )
}

export default App
