
import Home from '../Home';
import Piano from '../piano/piano';
import User from '../user/user';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/piano',
    element: <Piano />,
  },
  {
    path: '/user',
    element: <User />,
  },
];

export default routes;
