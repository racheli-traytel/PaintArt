type Drawing={
    id:number,
    name:string
    title:string,
    description:string,
    category: number,
    imageUrl:string,
    userId:number,
    isGeneratedByAI: boolean,
    avgRating:number
    countRating:number,
    createdAt:Date
}
export default Drawing