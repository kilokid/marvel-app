import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";

import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />}/>
                        <Route path="/comics" element={<ComicsPage />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;