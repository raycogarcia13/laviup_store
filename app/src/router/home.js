import { 
    lazy, 
    Suspense,
    Component
  } from "react";

import { Routes, Route } from "react-router-dom";
import { AuthProvider} from '../auth'


const Home = lazy( ()=>import('../pages/home/Home') )
const Login = lazy( ()=>import('../pages/home/Login') )


const E404 = lazy( ()=>import('../pages/404') )

export default () =>{
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={ <Suspense fallback={<>...</>}> <Home /> </Suspense>} />
                <Route path="/login" element={ <Suspense fallback={<>...</>}> <Login /> </Suspense>} />
                <Route path="*" element={ <Suspense fallback={<>...</>}><E404 /></Suspense>} />
            </Routes>
        </AuthProvider>
    )
}

