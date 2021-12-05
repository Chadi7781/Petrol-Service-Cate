import { Article } from "../article/article";
import { BonReception } from "./bonReception";

export class LigneReception {
    id: number;
    quantite: number;
    remise: number;
    tva: number;
    totalHt: number ;
    totalTtc: number ;
    totalTaxe: number ;
    article: Article;
    BonReception: BonReception;
    dateFabrication: Date;
    dateValidite: Date;
  }
  