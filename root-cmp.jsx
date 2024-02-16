// const Router = ReactRouterDOM.BrowserRouter
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { TaskDetails } from "./pages/TaskDetails.jsx"
import {TaskIndex } from "./pages/TaskIndex.jsx"
import {UserDetails } from "./pages/UserDetails.jsx"



export function App() {

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>                       
                        <Route path="/" element={<TaskIndex />} />
                        <Route path="/task/:taskId" element={<TaskDetails />} />
                        <Route path="/user/:userId" element={<UserDetails />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
} 