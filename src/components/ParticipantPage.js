// ParticipantPage.js

import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { RankingProvider, useRanking } from "./RankingContext";
import Menu from "./Menu"; // Importez le composant Menu
import "./ParticipantPage.css"; // Créez un fichier CSS pour cette page
import secretStoryLogo from "./images/Secret_Story_Logo.png";

const ParticipantPage = () => {
  const { rankings, loading } = useRanking();

  const getParticipantImageUrl = (participantName) => {
    const imageName = participantName.toLowerCase().replace(/ /g, "_") + ".png";
    return `/images/${imageName}`;
  };

  const handleRefreshClick = () => {
    // Actualiser la page en rechargeant la fenêtre
    window.location.reload();
  };

  return (
    <div className="public-page">
      {" "}
      {/* Utilisez la classe "public-page" pour la structure */}
      <img
        src={secretStoryLogo}
        alt="Logo Secret Story"
        className="logo"
        style={{ width: "300px", height: "auto" }}
      />
      <Card className="card">
        <Menu />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="participant1-grid">
            {" "}
            {/* Utilisez la classe "participant1-grid" pour la grille */}
            {rankings.map((participant) => (
              <Card key={participant._id} className="participant1-card">
                <div className="participant-container">
                  <img
                    src={getParticipantImageUrl(participant.nom)}
                    alt={participant.nom}
                    className="participant1-image"
                  />
                  {participant.find === 1 && (
                    <img
                      src="/images/croix.png"
                      alt="Croix"
                      className="croix-image"
                    />
                  )}
                </div>
                <div className="participant1-name">
                  {participant.nom.toUpperCase()}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
      <Button
        label="Actualiser la liste"
        icon="pi pi-refresh"
        className={classNames("refresh-button")}
        onClick={handleRefreshClick}
      />
    </div>
  );
};

const App = () => {
  return (
    <RankingProvider>
      <ParticipantPage />
    </RankingProvider>
  );
};

export default App;
