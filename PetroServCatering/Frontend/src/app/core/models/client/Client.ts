import { Devise } from "../devise/devise";


export class Client {
    id: number;
    code: string;
    name: string ;
    adresse: string ;
    tel: string ;
	fax: string ;
    mail: string;
    devise: Devise;
    matriculefiscale : string;
    registrecommerce : string;
    patente : string ;
    solde_initial : number ;

}
  