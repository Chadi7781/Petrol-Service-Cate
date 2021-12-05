import { LigneCommande } from "../commande/ligneCommande";
import { Devis } from "../devis/devis";
import { Etat } from "../etat/etat";
import { Fournisseur } from "../fournisseur/fournisseur";

export class Commande {
  id: number;
  numero: string;
  totalHt: number;
  totalTtc: number;
  totalTaxe: number;
  remise: number;
  date: Date;
  etat: Etat;
  fournisseur: Fournisseur;
  ligneCommandes: LigneCommande[];
  devis: Devis;
}
