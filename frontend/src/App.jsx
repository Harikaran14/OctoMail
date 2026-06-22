import './App.css'
import Layout from './components/Layout'
import AppRoutes from './routes/AppRoutes'
import useAuth from './context/useAuth'

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App
