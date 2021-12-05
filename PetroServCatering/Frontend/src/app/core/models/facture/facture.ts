import { Commande } from "../commande/commande";
import { Etat } from "../etat/etat";
import {LigneFacture} from "../facture/ligneFacture";
import { Fournisseur } from "../fournisseur/fournisseur";
import { User } from "../user/userEntity";

export class Facture {
    id: number;
    numero: string;
    totalHt: number ;
    totalTtc: number ;
    totalTaxe: number ;
    timbre: number ;
    remise : number ;
	date: Date ;
    etat: Etat;
    user: User;
    fournisseur: Fournisseur;
    ligneFactures: LigneFacture[];
    commande: Commande;
  }
