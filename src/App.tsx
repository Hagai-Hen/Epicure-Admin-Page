import { Dashboard } from './components/Dashboard/Dashboard'
import SideBar from './components/SideBar/SideBar'
import { SIDE_BAR } from './resources/content'

function App() {

  return (
    <div style={{display: 'flex'}}>
    <SideBar collections={SIDE_BAR.COLLECTIONS} />
    <Dashboard data={['']}/>
    </div>
  )
}

export default App
