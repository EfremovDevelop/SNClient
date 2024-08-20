import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom"

import HomePage from "./Components/Home/HomePage"
import ProjectInfo from "./Components/Project/ProjectInfo"
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import LogOff from "./Components/LogOff/LogOff"
import Register from "./Components/Register/Register"
import Issues from "./Components/Issue/Issues"
import Issue from "./Components/Issue/Issue"
import { AuthProvider } from "./Context/AuthContext"; // Импортируем AuthProvider

const App = () => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        userName: "",
    })

    useEffect(() => {
        const getUser = async () => {
            return await fetch("api/isAuth")
                .then((response) => {
                    response.status === 401 &&
                        setUser({ isAuthenticated: false, userName: "" })
                    return response.json()
                })
                .then(
                    (data) => {
                        if (
                            typeof data !== "undefined" &&
                            typeof data.userName !== "undefined"
                        ) {
                            setUser({ isAuthenticated: true, userName: data.Name })
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getUser()
    }, [setUser])

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={user.isAuthenticated ? <Layout user={user} /> : <Navigate to="/login" />}>
                        <Route index element={<HomePage/>} />
                        <Route path="/logoff" element={<LogOff setUser={setUser} />} />
                        <Route path="/project/:projectId/issues" element={<Issues user={user} />} />
                        <Route path="/project/:projectId/" element={<ProjectInfo user={user} />} />
                        <Route path="/issue/:id" element={<Issue />} />
                        <Route path="*" element={<h3>404</h3>} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
)
