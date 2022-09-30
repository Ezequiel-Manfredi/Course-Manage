import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MovileContextProvider } from './contexts/MovileContext'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
    <MovileContextProvider>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </MovileContextProvider>
    </BrowserRouter>
  )
}

export default App
