import { createBrowserRouter } from 'react-router'
import SearchAndCategory from './components/SearchAndCategory'
import Header from './components/Layout'
import PersonalArea from './components/PersonalArea'
import HeaderPersonal from './components/HeaderPersonal'
import PaintedDrawings from './components/PaintedDrawings'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import FileUploader from './components/Upload'
import ArtUploader from './components/Upload'
import PaintCanvas from './components/PaintCanvas'
import FeatureCards from './components/FeatureCards'
import TopRatedDrawings from './components/Popular'
import Layout from './components/Layout'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { path:'drawings', element: <SearchAndCategory /> },
      { path:'popular', element: <TopRatedDrawings /> },

      { index:true, element: <SearchAndCategory /> },
      { path:':id', element: <PaintCanvas isPainted={false}/> },
      {
        path: '/personal-area',
        element: <><PersonalArea/></>,
        children:[
          { path: 'painted-drawings', element:<PaintedDrawings/> },
          { path: 'upload', element:<ArtUploader/> },
          { path: ':id', element:<PaintCanvas isPainted={true}/> },

        ]
      }
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
 
]);