import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { RankingProvider, useRanking } from "./RankingContext";
import Menu from "./Menu"; // Importez le composant Menu
import "./PublicPage.css";
import secretStoryLogo from "./images/Secret_Story_Logo.png";

const SecretPage = () => {
  const { rankings, loading } = useRanking();
  const [randomizedRankings, setRandomizedRankings] = useState([]);

  useEffect(() => {
    if (!loading) {
      // Copiez le tableau rankings pour le trier aléatoirement
      const shuffledRankings = [...rankings];
      // Triez le tableau aléatoirement
      shuffledRankings.sort(() => Math.random() - 0.5);
      // Mettez à jour l'état avec le tableau trié aléatoirement
      setRandomizedRankings(shuffledRankings);
    }
  }, [loading, rankings]);

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
            value={randomizedRankings} // Utilisez le tableau trié aléatoirement
            className="datatable responsive-datatable"
            stripedRows
          >
            <Column
              field="secret"
              header="SECRET"
              body={(rowData) => (
                <span
                  className={classNames("secret-text", {
                    "secret-text-crossed": rowData.find === 1,
                  })}
                >
                  {rowData.secret}
                </span>
              )}
              style={{ textAlign: "center" }}
            />
          </DataTable>
        )}
      </Card>
      <Button
        label="Actualiser le classement"
        icon="pi pi-refresh"
        className={classNames("refresh-button")}
      />
    </div>
  );
};

const App = () => {
  return (
    <RankingProvider>
      <SecretPage />
    </RankingProvider>
  );
};

export default App;
