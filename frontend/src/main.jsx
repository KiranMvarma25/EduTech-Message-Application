import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import { Provider } from "react-redux";
import appStore from './redux_store/store.js'

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />
  },
  {
    path : "/dashboard",
    element : <Dashboard />
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
  <RouterProvider router={appRouter}></RouterProvider>
  </Provider>
)