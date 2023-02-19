import { 
  lazy, 
  Suspense, 
} from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider, ProtectedRoute, NoAuthRoute } from "./auth"

  
  // import 'antd/dist/antd.min.css'
  import "./assets/styles/main.css";
  import "./assets/styles/responsive.css";
  
  const Home = lazy(()=>import('./template/Home'))
  const Admin = lazy(()=>import('./template/Admin'))
  const Store = lazy(()=>import('./template/Store'))
  const Register = lazy(()=>import('./template/Register'))

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <Routes basename={process.env.PUBLIC_URL}>
            <Route path="/admin/*" exact element={ <ProtectedRoute><Suspense fallback={<>...</>}><Admin /></Suspense></ProtectedRoute>} />
            <Route path="/store/*" exact element={ <ProtectedRoute><Suspense fallback={<>...</>}><Store /></Suspense></ProtectedRoute>} />
            <Route path="/auth/*" exact element={ <NoAuthRoute><Suspense fallback={<>...</>}><Register /></Suspense></NoAuthRoute>} />
            <Route path="*" exact element={ <NoAuthRoute><Suspense fallback={<>...</>}><Home /></Suspense></NoAuthRoute>} />
          </Routes>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
