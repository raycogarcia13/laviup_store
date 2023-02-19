import { 
    lazy, 
    Suspense,
    Component
  } from "react";

import { Routes, Route } from "react-router-dom";
import { AuthProvider} from '../auth'


const Dashboard = lazy( ()=>import('../pages/store/Dashboard') )
const EditStore = lazy( ()=>import('../pages/store/EditStore') )
const Products = lazy( ()=>import('../pages/store/Products') )

const E404 = lazy( ()=>import('../pages/404') )

export default () =>{
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={ <Suspense fallback={<>...</>}> <Dashboard /> </Suspense>} />
                <Route path="/edit" element={ <Suspense fallback={<>...</>}> <EditStore /> </Suspense>} />
                <Route path="/products" element={ <Suspense fallback={<>...</>}> <Products /> </Suspense>} />
                <Route path="*" element={ <Suspense fallback={<>...</>}><E404 /></Suspense>} />
            </Routes>
        </AuthProvider>
    )
}

