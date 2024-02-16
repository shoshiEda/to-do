// const Router = ReactRouterDOM.BrowserRouter
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { TaskDetails } from "./pages/TaskDetails.jsx"
import { TaskEdit } from "./pages/TaskEdit.jsx"
import {TaskIndex } from "./pages/TaskIndex.jsx"


export function App() {

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>                       
                        <Route path="/" element={<TaskIndex />} />
                        <Route path="/task/:taskId" element={<TaskDetails />} />
                        <Route path="/task/edit/:taskId" element={<TaskEdit />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
} 