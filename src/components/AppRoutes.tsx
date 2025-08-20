import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Users';
import Posts from '../pages/Posts';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
        </Routes>
    );
};

export default AppRoutes;
