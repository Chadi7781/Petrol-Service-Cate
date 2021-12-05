import { Article } from "../article/article";
import { Commande } from "./commande";

export class LigneCommande {
    id: number;
    quantite: number;
    tva: number;
    totalHt: number ;
    totalTtc: number ;
    totalTaxe: number ;
    remise: number ;
    article: Article;
  //  commande: Commande;
  }
  