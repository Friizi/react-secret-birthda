import React, { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { RankingProvider, useRanking } from "./RankingContext";
import Menu from "./Menu";
import axios from "axios";
import "./AdminPage.css";
import secretStoryLogo from "./images/Secret_Story_Logo.png";

const AdminPage = () => {
  const { rankings, loading } = useRanking();
  const [nominantOptions, setNominantOptions] = useState([]);
  const [nomineeOptions, setNomineeOptions] = useState([]);
  const [secretOptions, setSecretOptions] = useState([]);
  const [selectedNominant, setSelectedNominant] = useState(null);
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [selectedSecret, setSelectedSecret] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // État pour désactiver le bouton
  const toast = useRef(null); // Référence pour le composant Toast

  useEffect(() => {
    // Alimenter les options des listes déroulantes à partir de rankings
    if (!loading && rankings) {
      // Filtrer les participants avec find égal à 0
      const nominantOptions = rankings.map((participant) => ({
        label: participant.nom,
        value: participant.nom,
      }));

      const nomineeOptions = [];
      const secretOptions = [];

      for (const participant of rankings) {
        if (participant.find === 0) {
          nomineeOptions.push({
            label: participant.nom,
            value: participant.nom,
          });

          secretOptions.push({
            label: participant.secret,
            value: participant.secret,
          });
        }
      }

      setNominantOptions(nominantOptions);
      setNomineeOptions(nomineeOptions);
      setSecretOptions(secretOptions);
    }
  }, [loading, rankings]);

  useEffect(() => {
    // Vérifiez si toutes les listes ont un élément sélectionné
    if (selectedNominant && selectedNominee && selectedSecret) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedNominant, selectedNominee, selectedSecret]);

  const handleNominationSubmit = () => {
    axios
      .post("http://localhost:3001/api/nominate", {
        nominant: selectedNominant,
        nominee: selectedNominee,
        secret: selectedSecret,
      })
      .then((response) => {
        console.log("Nomination réussie !", response.data);
        // Affichage du message Toast en cas de succès
        toast.current.show({
          severity: "success",
          summary: "Succès",
          detail: "Nomination réussie !",
        });
        // Effacez le message après un certain délai (par exemple, 3000 millisecondes)
        setTimeout(() => toast.current.clear(), 3000);

        // Réinitialisez les sélections dans les listes déroulantes
        setSelectedNominant(null);
        setSelectedNominee(null);
        setSelectedSecret(null);
        setIsButtonDisabled(true);
      })
      .catch((error) => {
        console.error("Erreur lors de la nomination :", error);
        // Affichage du message Toast en cas d'erreur
        toast.current.show({
          severity: "error",
          summary: "Erreur",
          detail: "Erreur lors de la nomination.",
        });
        // Effacez le message après un certain délai (par exemple, 3000 millisecondes)
        setTimeout(() => toast.current.clear(), 3000);
      });
  };

  const filterNomineeOptions = () => {
    // Filtrer les options de nominé pour exclure le nominant sélectionné
    return nomineeOptions.filter((option) => option.value !== selectedNominant);
  };

  const filterNominantOptions = () => {
    // Filtrer les options de nominant pour exclure le nominé sélectionné
    return nominantOptions.filter((option) => option.value !== selectedNominee);
  };

  return (
    <div className="public-page admin-page2">
      <Toast ref={toast} />
      <img
        src={secretStoryLogo}
        alt="Logo Secret Story"
        className="logo"
        style={{ width: "300px", height: "auto" }}
      />
      <Card className="card2">
        <Menu />
        <div className="nomination-form2">
          <Dropdown
            value={selectedNominant}
            options={filterNominantOptions()} // Utiliser la fonction de filtre pour exclure le nominé sélectionné
            onChange={(e) => setSelectedNominant(e.value)}
            placeholder="Sélectionnez un nominant"
          />
          <Dropdown
            value={selectedNominee}
            options={filterNomineeOptions()} // Utiliser la fonction de filtre pour exclure le nominant sélectionné
            onChange={(e) => setSelectedNominee(e.value)}
            placeholder="Sélectionnez un nominé"
          />
          <Dropdown
            value={selectedSecret}
            options={secretOptions}
            onChange={(e) => setSelectedSecret(e.value)}
            placeholder="Sélectionnez un secret"
          />
          <Button
            label="Nomination"
            icon="pi pi-check2"
            onClick={handleNominationSubmit}
            className="p-button2"
            disabled={isButtonDisabled}
          />
        </div>
      </Card>
    </div>
  );
};

const App = () => {
  return (
    <RankingProvider>
      <AdminPage />
    </RankingProvider>
  );
};

export default App;
