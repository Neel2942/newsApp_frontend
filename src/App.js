import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Auth
import RegistrationFrom from './components/pages/RegistrationFrom';
import Login from './components/pages/Login';
// Backyard
import AdminHome from './components/backyard/AdminHome';
import AdminNavbar from './components/backyard/AdminNavbar';
import InsertCategory from './components/backyard/InsertCategory';
import InsertTags from './components/backyard/InsertTags';
import ViewCategories from './components/backyard/ViewCategories';
import ViewTags from './components/backyard/ViewTags';
import ViewUsers from './components/backyard/ViewUsers';
import ViewPosts from './components/backyard/ViewPosts';
import InsertPosts from './components/backyard/InsertPosts';
// Client Side
import NavBar from './components/pages/NavBar';
import Home from './components/pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Backyard Routes */}
          <Route path="backyard" element={<AdminNavbar/>}>
            <Route index element={<AdminHome/>}/>

            <Route path="registration" element={<RegistrationFrom/>}/>
            <Route path="login" element={<Login/>}/>

            <Route path="viewUsers" element={<ViewUsers/>}/>

            <Route path="viewCategory" element={<ViewCategories/>}/>
            <Route path="addCategory" element={<InsertCategory/>}/>
            <Route path="updateCategory" element={<InsertCategory/>}queryParams/>

            <Route path="viewTags" element={<ViewTags/>}/>
            <Route path="addTags" element={<InsertTags/>}/>
            <Route path="updateTags" element={<InsertTags/>}queryParams/>

            <Route path="viewPosts" element={<ViewPosts/>}/>
            <Route path="addPosts" element={<InsertPosts/>}/>
            <Route path="updatePosts" element={<InsertPosts/>}queryParams/>
          </Route>
          {/* Client's Routes */}
          <Route path="/" element={<NavBar/>}>
            <Route index element={<Home/>}/>

            <Route path="registration" element={<RegistrationFrom/>}/>
            <Route path="login" element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
