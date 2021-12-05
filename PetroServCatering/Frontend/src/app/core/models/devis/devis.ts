import { Etat } from "../etat/etat";
import { Fournisseur } from "../fournisseur/fournisseur";
import { User } from "../user/userEntity";
import { LigneDevis } from "./ligneDevis";

export class Devis {
  id: number;
  numero: string;
  date: Date;
  totalHt: number;
  totalTtc: number;
  totalTaxe: number;
  remise: number;
  marge: number;
  etat: Etat;
  fournisseur: Fournisseur;
  user: User;
  ligneDevisList: LigneDevis[];
}
