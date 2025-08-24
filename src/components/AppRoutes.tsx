import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Users';
import Posts from '../pages/Posts';
import Profile from '../pages/Profile';
import { ProfileAdmin } from '../pages/ProfileAdmin';
import App from '../App';
import Post from '../pages/Post';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<App />} >
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/post/:id" element={<Post />} />

            <Route path="profile">
                <Route index element={<ProfileAdmin />} />
                <Route path=":id" element={<Profile />} />
            </Route>
                
            </Route>
        </Routes>
    );
};

export default AppRoutes;
