import { Article } from "../article/article";
import { Devis } from "./devis";

export class LigneDevis {
  id: number;
  quantite: number;
  totalHt: number;
  totalTtc: number;
  totalTaxe: number;
  remise: number;
  article: Article;
  devis: Devis;
}
