import { LigneReception} from "./ligneReception";
import { Fournisseur } from "../fournisseur/fournisseur";
import { User } from "../user/userEntity";
import { Magasin } from "../magasin/magasin";
import { Etat } from "../etat/etat";

export class BonReception {
    id: number;
    numero: string;
    totalHt: number ;
    totalTtc: number ;
    totalTaxe: number ;
    remise: number;
	date: Date ;
    etat: Etat;
    fournisseur: Fournisseur;
    magasin : Magasin;
    user : User;
    ligneReceptions: LigneReception[];
  }
  