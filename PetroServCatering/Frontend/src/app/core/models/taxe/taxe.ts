import {Article} from '../article/article';


export class Taxe {

  id: number;
  type: string ;
  sens: string ;
  taux: any ;
  dateDebut: Date ;
  dateFin: Date ;
  articles: Article[] ;
}
