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


  let linksParaMostrar;

  if (mostrarAlternativos) {
    linksParaMostrar = linksAlternativos;
  } else {
    linksParaMostrar = linksOriginales;
  }


  return (
    
      <div className="flex flex-col items-center gap-y-8">
        {linksParaMostrar.map((link, index) => (
          <LinkAlternativo key={index} title={link.title} url={link.url} />
        ))}

        <div className="flex flex-col justify-center cursor-pointer w-full p-4 text-sm text-center text-white transition-all duration-500 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl lg:text-xl hover:bg-opacity-40 hover:scale-110">
          <button
            onClick={() => setMostrarAlternativos(!mostrarAlternativos)}
          >
            <span className="font-semibold">
              {mostrarAlternativos ? "Volver" : "Más recursos"}
            </span>
          </button>
        </div>
      </div>
    
  );
}
