// Menu.js
import React from "react";
import "./Menu.css"; // Importez votre fichier CSS

const Menu = () => {
  const redirectToParticipants = () => {
    window.location.href = "/participants";
  };

  return (
    <div className="menu">
      <ul>
        <li>
          <a href="/secrets">Secrets</a>
        </li>
        <li>
          <a href="/">Classement</a>
        </li>
        <li>
          <a href="/participants" onClick={redirectToParticipants}>
            Participants
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
