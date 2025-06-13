import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'


const router = createBrowserRouter([
  {
    path : "/",
    element: <Layout />, //appp
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
<Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  )
