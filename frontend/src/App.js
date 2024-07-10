import { BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components

import Login from './pages/Login'
import Signup from './pages/Signup'
import Todo from './pages/Todo'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/Todo"
              element={<Todo />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;