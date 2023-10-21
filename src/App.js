// App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicPage from "./components/PublicPage";
import PrivatePage from "./components/PrivatePage";
import ParticipantPage from "./components/ParticipantPage";
import SecretPage from "./components/SecretPage";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/adminluly" element={<AdminPage />} />
        <Route path="/participants" element={<ParticipantPage />} />
        <Route path="/secrets" element={<SecretPage />} />
        <Route path="/private" element={<PrivatePage />} />
        {/* Ajoutez d'autres routes ici pour vos différentes pages */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
