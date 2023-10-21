import React, { createContext, useContext, useEffect, useState } from "react";

// Créez un contexte React pour le classement
const RankingContext = createContext();

// Créez un composant Provider pour le contexte
export const RankingProvider = ({ children }) => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utilisez useEffect pour récupérer les données du classement depuis l'API
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/rankings"); // Assurez-vous que l'URL correspond à votre API
        const data = await response.json();
        setRankings(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du classement.", error);
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <RankingContext.Provider value={{ rankings, loading }}>
      {children}
    </RankingContext.Provider>
  );
};

// Créez un hook personnalisé pour accéder au contexte
export const useRanking = () => {
  return useContext(RankingContext);
};
