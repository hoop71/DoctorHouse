import Dashboard from 'views/Dashboard/Dashboard.jsx';
import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import pagesRoutes from './pages.jsx';

var pages = [{ path: '/pages/user-page', name: 'User Page', mini: 'UP', component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'pe-7s-graph',
        component: Dashboard
    },
    {
        collapse: true,
        path: '/maps',
        name: 'Maps',
        state: 'openMaps',
        icon: 'pe-7s-map-marker',
        views: [{ path: '/maps/google-maps', name: 'Google Maps', mini: 'GM', component: GoogleMaps }]
    },
    {
        collapse: true,
        path: '/pages',
        name: 'Pages',
        state: 'openPages',
        icon: 'pe-7s-gift',
        views: pages
    },
    { redirect: true, path: '/', pathTo: '/dashboard', name: 'Dashboard' }
];
export default dashRoutes;
