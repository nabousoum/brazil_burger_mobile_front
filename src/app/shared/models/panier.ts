import { BoissonTailleBoisson } from "./detail"
import { Produit } from "./produit"


export interface Panier{
    burgerCommandes?: BurgerCommande[]
    menuCommandes?: MenuCommande[]
    boissonCommandes?: BoissonCommande[]
    friteCommandes?: FriteCommande[]
    zone?:Zone
}

export interface Zone{
    id?:number
    libelle?:string
    prix?:number
}

/* BurgerCommande */
export interface BurgerCommande{
    quantite: number
    burger?: Produit
}

/* MenuCommande */

export interface MenuCommande{
    quantite: number
    menu?:Menu
}

export interface Menu{
    id: number
    nom?: string
    image?:Blob
    type?:string
    prix?:number
    commandeMenuBoissonTailles: CommandeMenuBoissonTaille[]
}

export interface CommandeMenuBoissonTaille{
    quantite?: number
    boissonTailles?: BoissonTailleBoisson
}


/* BoissonCommande */

export interface BoissonCommande{
    quantite: number
    boissonTailleBoisson?: BoissonTailleBoisson
    prix?:number
}

/* FriteCommande */

export interface FriteCommande{
    quantite: number
    portionFrite?: Produit
    prix?:number
}
