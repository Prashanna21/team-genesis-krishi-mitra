import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MarketPlace from './pages/MarketPlace.jsx'
import SignupPage from './pages/SignupPage.jsx'
import FarmerDashboard from './pages/FarmerDashboard.jsx'
import RentPage from './pages/RentPage.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import GenerateReportPage from './pages/GenerateReportPage.jsx'
import DiseaseDetectionPage from "./pages/DiseaseDetectionPage.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, //appp
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "marketplace",
        element: <MarketPlace />
      },
      {
        path: "signup",
        element: <SignupPage />
      },
      {
        path: "farmer",
        element: <FarmerDashboard />
      },
      {
        path: "generate-report",
        element: <GenerateReportPage />
      },
      {
        path: "disease-detection",
        element: <DiseaseDetectionPage />
      },
      {
        path: "rent-tools",
        element: <RentPage />
      },

    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
