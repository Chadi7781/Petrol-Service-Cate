import { Article } from "../article/article";
import { Facture } from "./facture";

export class LigneFacture {
    id: number;
    quantite: number;
    tva: number;
    remise: number;
    totalHt: number ;
    totalTtc: number ;
    totalTaxe: number ;
    article: Article;
  // facture: Facture;
  }
  