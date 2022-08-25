import { PipeTransform,Pipe } from "@angular/core";
import { CommandeList } from "../models/commandeList";

@Pipe({
    name:'commandeFilter'
})

export class CommandeFilter implements PipeTransform{
    transform(commandes: CommandeList[], searchTerm: string) {
        if(!commandes || !searchTerm){
            return commandes
        }
        return commandes.filter(commande => commande.etat?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}
@Pipe({
    name:'CommandeDateFilter'
})
export class CommandeDateFilter implements PipeTransform{
    transform(commandes: CommandeList[], searchTermDate: any) {
        if(!commandes || !searchTermDate){
            return commandes
        }
        return commandes.filter((commande:any) => {
            const date = new Date(commande.dateCommande)
            return date.toLocaleDateString() == new Date(searchTermDate).toLocaleDateString()
        });
    }
}