import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { RankingProvider, useRanking } from "./RankingContext";
import Menu from "./Menu";
import "./PublicPage.css";
import secretStoryLogo from "./images/Secret_Story_Logo.png";

const SecretPage = () => {
  const { rankings, loading } = useRanking();
  const [randomizedRankings, setRandomizedRankings] = useState([]);

  useEffect(() => {
    if (!loading) {
      const shuffledRankings = [...rankings];
      shuffledRankings.sort(() => Math.random() - 0.5);
      setRandomizedRankings(shuffledRankings);
    }
  }, [loading, rankings]);

  // Filtrer les lignes avec show === 1
  const filteredRankings = randomizedRankings.filter(
    (rowData) => rowData.show === 1
  );

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
            value={filteredRankings} // Utiliser le tableau filtré
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
      <SecretPage />
    </RankingProvider>
  );
};

export default App;
