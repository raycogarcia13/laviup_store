import { 
    lazy, 
    Suspense,
    Component
  } from "react";

import { Routes, Route } from "react-router-dom";
import { AuthProvider} from '../auth'


const Register = lazy( ()=>import('../pages/home/Register') )
const Verify = lazy( ()=>import('../pages/home/Verify') )


const E404 = lazy( ()=>import('../pages/404') )

export default () =>{
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={ <Suspense fallback={<>...</>}> <Register /> </Suspense>} />
                <Route path="/verify" element={ <Suspense fallback={<>...</>}> <Verify /> </Suspense>} />
                <Route path="*" element={ <Suspense fallback={<>...</>}><E404 /></Suspense>} />
            </Routes>
        </AuthProvider>
    )
}

