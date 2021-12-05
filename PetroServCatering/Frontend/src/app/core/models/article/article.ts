import { TypeArticleService } from "../../service/typeArticle/typeArticle.service";
import { Categorie } from "../categorie/categorie";
import { Edestination } from "../edestination";
import { Edurabilite } from "../edurabilite";
import { Famille } from "../famille/famille";
import { SousFamille } from "../famille/sousfamille";
import { Taxe } from "../taxe/taxe";
import { TypeArticle } from "../typeArticle/typeArticle";

export class Article {
    id: number;
    name: string;
    reference: string ;
	prix: number ;
	tva: number ;
	marge:number;
	dateFabrication: Date ;
	dateValidite: Date ;
	unite: string ;
	
	taxes : Taxe[];

	categorie: Categorie;
	typeArticle : TypeArticle;
	destination : Edestination;
	durabilite : Edurabilite;
	famille: Famille;
	sousFamille: SousFamille;

  }
  