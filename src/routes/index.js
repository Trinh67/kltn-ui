// Layouts
import { HeaderOnly } from '~/components/Layout';

// Pages
import Home from '~/pages/Home';
import Help from '~/pages/Help';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import FileManager from '~/pages/Manager';
import Login from '~/pages/Login';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/help', component: Help, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

const privateRoutes = [
    { path: '/profile', component: Profile, layout: HeaderOnly },
    { path: '/manager', component: FileManager, layout: HeaderOnly },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
