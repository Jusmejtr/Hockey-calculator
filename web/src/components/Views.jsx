import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Bracket from "./play-off/Bracket";


const Views = () => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/play-off" element={<Bracket />} />
    </Routes>
};

export default Views;