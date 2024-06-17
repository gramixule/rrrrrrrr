// src/DetailsSection.jsx
import React, { useState } from "react";

const DetailsSection = ({ row }) => {
  const [pot, setPot] = useState(0);
  const [cut, setCut] = useState(0);
  const total_teren = row["Square Meters"];
  const pret = row.Price;

  // Calculations based on the provided formula
  const amprenta_sol_permis = total_teren * pot;
  const suprafata_totala_permisa = total_teren * cut;
  const diferenta_teren_neocupata = total_teren - amprenta_sol_permis;
  const pret_cumparare_mp = pret / total_teren;
  const cost_constructie_mp = 1000; // Example value
  const pret_estimare_constructie = cost_constructie_mp * (1 + 0.10);
  const pret_total_constructie = pret_estimare_constructie * suprafata_totala_permisa;
  const pret_total_cumparare = pret;
  const pret_total_investitie = pret_total_cumparare + pret_total_constructie;
  const pret_total_per_mp = pret_total_investitie / suprafata_totala_permisa;
  const incidenta_pret_cumparare = pret_cumparare_mp / suprafata_totala_permisa;
  const pret_vanzare_estimat = pret_total_per_mp * 1.3;

  return (
    <div className="details-section">
      <div className="details-left">
        <div className="details-propriety">
          <h2>Property Details</h2>
          <p>Zone: {row.Zone}</p>
          <p>Price: {row.Price}</p>
          <p>Type: {row.Type}</p>
          <p>Square Meters: {row["Square Meters"]}</p>
          <p>Description: {row.Description}</p>
          <p>Proprietor: {row.Proprietor}</p>
          <p>Phone Number: {row["Phone Number"]}</p>
          <p>Days Since Posted: {row["Days Since Posted"]}</p>
          <p>Date and Time Posted: {row["Date and Time Posted"]}</p>
        </div>
        <div className="details-ml">
          <h2>ML Statistics</h2>
          <p>No data to show</p>
        </div>
      </div>
      <div className="details-right">
        <h2>Calculations</h2>
        <label>
          POT:
          <input type="number" value={pot} onChange={(e) => setPot(parseFloat(e.target.value))} />
        </label>
        <label>
          CUT:
          <input type="number" value={cut} onChange={(e) => setCut(parseFloat(e.target.value))} />
        </label>
        <p>Amprenta la sol permisa construibila: {amprenta_sol_permis.toFixed(2)}</p>
        <p>Suprafata totala desfasurata permisa de construit: {suprafata_totala_permisa.toFixed(2)}</p>
        <p>Diferenta de teren neocupata de cladiri: {diferenta_teren_neocupata.toFixed(2)}</p>
        <p>Pret de cumparare mp teren: {pret_cumparare_mp.toFixed(2)}</p>
        <p>Pret estimat total constructie noua: {pret_estimare_constructie.toFixed(2)}</p>
        <p>Pret total constructie noua: {pret_total_constructie.toFixed(2)}</p>
        <p>Pret total cumparare teren: {pret_total_cumparare.toFixed(2)}</p>
        <p>Pret total investitie: {pret_total_investitie.toFixed(2)}</p>
        <p>Pret total per mp construit constructie noua: {pret_total_per_mp.toFixed(2)}</p>
        <p>Incidenta pretului de cumparare mp teren per Suprafata totala mp desfasurata permisa: {incidenta_pret_cumparare.toFixed(2)}</p>
        <p>Pret de vanzare estimat /mp constructie noua la un profit de 30%/mp construit: {pret_vanzare_estimat.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DetailsSection;
