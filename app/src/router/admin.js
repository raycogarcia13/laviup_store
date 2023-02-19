import { 
    lazy, 
    Suspense,
    Component
  } from "react";

import { Routes, Route } from "react-router-dom";
import { AuthProvider} from '../auth'


const Dashboard = lazy( ()=>import('../pages/admin/Dashboard') )

const E404 = lazy( ()=>import('../pages/404') )

export default () =>{
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={ <Suspense fallback={<>...</>}> <Dashboard /> </Suspense>} />
                <Route path="*" element={ <Suspense fallback={<>...</>}><E404 /></Suspense>} />
            </Routes>
        </AuthProvider>
    )
}

