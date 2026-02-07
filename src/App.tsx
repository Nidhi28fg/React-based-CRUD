import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserList } from './pages/UserList';
import { UserFormPage } from './pages/UserFormPage';
import { LayoutGrid } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <header className="bg-blue-600 border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white ">
              <LayoutGrid />
              <span>User Manager</span>
            </Link>
          </div>
        </header>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/create" element={<UserFormPage />} />
            <Route path="/edit/:id" element={<UserFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
