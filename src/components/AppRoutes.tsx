import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Users';
import Posts from '../pages/Posts';
import Profile from '../pages/Profile';
import { ProfileAdmin } from '../pages/ProfileAdmin';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="profile">
                <Route index element={<ProfileAdmin />} />
                <Route path=":id" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
