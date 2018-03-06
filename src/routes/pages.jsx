import LoginPage from 'views/Pages/LoginPage.jsx';
import RegisterPage from 'views/Pages/RegisterPage.jsx';
import UserPage from 'views/Pages/UserPage.jsx';

var pagesRoutes = [
  { path: '/pages/login-page', name: 'Login Page', mini: 'LP', component: LoginPage },
  { path: '/pages/register-page', name: 'Register', mini: 'RP', component: RegisterPage }
];

export default pagesRoutes;
