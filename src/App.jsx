import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
const App = ()=> {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="/" element={<History/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
