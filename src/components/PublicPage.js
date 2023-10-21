import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { RankingProvider, useRanking } from "./RankingContext";
import Menu from "./Menu"; // Importez le composant Menu
import "./PublicPage.css";
import secretStoryLogo from "./images/Secret_Story_Logo.png";
import { Tag } from "primereact/tag";

const PublicPage = () => {
  const { rankings, loading } = useRanking();

  // Fonction pour générer l'URL de l'image du participant en fonction de son nom
  const getParticipantImageUrl = (participantName) => {
    // Convertir le nom du participant en minuscules et remplacer les espaces par des tirets bas
    const imageName = participantName.toLowerCase().replace(/ /g, "_") + ".png";

    // Retourner l'URL complète de l'image en utilisant le chemin du répertoire public
    return `/images/${imageName}`;
  };

  const handleRefreshClick = () => {
    // Actualiser la page en rechargeant la fenêtre
    window.location.reload();
  };

  return (
    <div className="public-page">
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
          <DataTable
            value={rankings}
            className="datatable responsive-datatable"
            stripedRows
          >
            <Column
              header="#"
              headerStyle={{ width: "3rem" }}
              body={(data, options) => (
                <span className="circle-pink">{options.rowIndex + 1}</span>
              )}
            />
            <Column
              field="participant"
              header="PARTICIPANT"
              body={(rowData) => (
                <div className="participant-container">
                  <img
                    src={getParticipantImageUrl(rowData.nom)}
                    className="participant-image"
                  />
                  <div className="participant-name">
                    {rowData.nom.toUpperCase()}
                  </div>
                </div>
              )}
            />
            <Column
              field="Secret"
              header="SECRET"
              body={(rowData) => (rowData.find !== 0 ? rowData.secret : "")}
              className="secret-text"
            />
            <Column
              field="cagnotte"
              header="CAGNOTTE"
              body={(rowData) => (
                <Tag
                  value={rowData.cagnotte.toLocaleString() + " €"}
                  severity={
                    rowData.cagnotte === 0
                      ? "danger"
                      : rowData.cagnotte > 0 && rowData.cagnotte < 10000
                      ? "warning"
                      : "success"
                  }
                ></Tag>
              )}
            />
          </DataTable>
        )}
      </Card>
      <Button
        label="Actualiser le classement"
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
      <PublicPage />
    </RankingProvider>
  );
};

export default App;
