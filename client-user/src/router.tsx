import { createBrowserRouter } from 'react-router'
import SearchAndCategory from './components/SearchAndCategory'
import PersonalArea from './components/PersonalArea'
import PaintedDrawings from './components/PaintedDrawings'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ArtUploader from './components/Upload'
import PaintCanvas from './components/PaintCanvas'
import TopRatedDrawings from './components/Popular'
import Layout from './components/Layout'
import MyMostPopularDrawings from './components/MyMostPopularDrawings'
import PaintArtDashboard from './components/PaintArtDashboard'
import RecyclingBinPage from './components/RecyclingBinPage'

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
        path: '/personal-area', element: <PersonalArea/>,
        children:[
          {index:true , element:<PaintArtDashboard/>},
          { path: 'painted-drawings', element:<PaintedDrawings/> },
          { path: 'RecyclingBinPage', element:<RecyclingBinPage/> },
          { path: 'upload', element:<ArtUploader/> },
          { path: ':id', element:<PaintCanvas isPainted={true}/> },
          { path: 'mypopular', element:<MyMostPopularDrawings/> },

        ]
      }
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },
 
]);