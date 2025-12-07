export interface Step{
    number: number, 
    name: string, 
    is_done: boolean,
    component?:React.ReactNode,
    is_current?:boolean,
    changeStep?:(step:number)=>void
}