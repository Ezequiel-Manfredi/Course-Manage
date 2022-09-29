import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MovileContextProvider } from './context/MovileContext'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
    <MovileContextProvider>
      <Routes>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </MovileContextProvider>
    </BrowserRouter>
  )
}

export default App
