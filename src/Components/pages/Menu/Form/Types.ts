export interface MealType{
    // section_id  : string,
    name        : string,
    price       : number,
    description : string
}


export interface SectionType{
    id?         : string,
    name        : string,
    meals       : MealType[],
}


export interface MenuType{
    name        : string,
    caption     : string,
    description : string,
    sections    : SectionType[]
}


export const emptySectionForm = {
    id      : '',
    name    : ''
}
