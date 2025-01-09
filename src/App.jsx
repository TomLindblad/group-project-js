
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Startpage from './pages/startpage.jsx';
import Gamepage from './pages/gamepage.jsx';
import Startmenu from './pages/startmenu.jsx';

function App() {

    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Startpage/>}/>
                <Route path="/gamepage" element={<Gamepage/>}/>
                <Route path="/startmenu" element={<Startmenu/>}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App
