// const Router = ReactRouterDOM.BrowserRouter
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM
const { Provider } = ReactRedux


import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { TaskDetails } from "./pages/TaskDetails.jsx"
import {TaskIndex } from "./pages/TaskIndex.jsx"
import {UserDetails } from "./pages/UserDetails.jsx"
import { store } from './store/store.js'




export function App() {

    return (
        <Provider store={store}>
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
        </Provider>
    )
} 