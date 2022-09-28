import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationPanel from './components/NavigationPanel'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <NavigationPanel>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </NavigationPanel>
    </BrowserRouter>
  )
}

export default App
