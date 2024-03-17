import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Accueil from "./Accueil";
import dataAccueil from "./Accueil.json";

describe("Composant Accueil", () => {
	it("affiche chaque paragraphe du contenu de l'accueil", () => {
		render(<Accueil />);
		dataAccueil.paragraphes.forEach((paragraphe) => {
			// J'ai utilisé 'getByText' pour vérifier la présence de chaque paragraphe dans le document.
			// La méthode 'toBeInTheDocument' confirme que l'élément est bien dans le document HTML.
			// Pour comprendre comment 'toBeInTheDocument' fonctionne, j'ai consulté la doc de jest-dom ici : https://github.com/testing-library/jest-dom#tobeinthedocument

			expect(screen.getByText(paragraphe)).toBeInTheDocument();
		});
	});
});
