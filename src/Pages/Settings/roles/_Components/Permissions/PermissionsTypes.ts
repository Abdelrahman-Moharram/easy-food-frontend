
export interface PermissionType {
    has_perm        : boolean
    id              : string
    key             : string
    label           : string
}

export interface moduleType {
    [name:string]   : PermissionType[] 
}
