import { routes } from '@/routes'
import { useRoutes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {useRoutes(routes)}
    </div>
  )
}

export default App