// Layouts
import { HeaderOnly } from '~/components/Layout';

// Pages
import Home from '~/pages/Home';
import Feedback from '~/pages/Feedback';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Statistic from '~/pages/Statistic';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile, layout: HeaderOnly },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/statistic', component: Statistic, layout: HeaderOnly },
    { path: '/feedback', component: Feedback, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
