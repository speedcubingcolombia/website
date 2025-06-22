import { useState } from "react";
import LinkAlternativo from "./Links.jsx";

export default function AlternadorLinks() {
  const [mostrarAlternativos, setMostrarAlternativos] = useState(false);

  const linksOriginales = [
    { title: "WCA Página Oficial", url: "https://www.worldcubeassociation.org" },
    { title: "Torneos Oficiales CO", url: "https://www.worldcubeassociation.org/competitions?region=CO" },
    { title: "WCA Live", url: "https://live.worldcubeassociation.org" },
  ];

  const linksAlternativos = [
    { title: "CubeSkills", url: "https://cubeskills.com" },
    { title: "CsTimer", url: "https://cstimer.net" },
    { title: "YouTube", url: "https://youtube.com" },
  ];

  const linksParaMostrar = mostrarAlternativos ? linksAlternativos : linksOriginales;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {linksParaMostrar.map((link, index) => (
        <LinkAlternativo key={index} title={link.title} url={link.url} />
      ))}

      <button
        onClick={() => setMostrarAlternativos(!mostrarAlternativos)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition"
      >
        {mostrarAlternativos ? "Volver" : "Más recursos"}
      </button>
    </div>
  );
}
