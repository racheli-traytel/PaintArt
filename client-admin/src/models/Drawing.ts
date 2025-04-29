export class Drawing{
    constructor(
     public   id: number,
  public  title: string,
   public name: string,
   public description: string,
   public category: string,
   public imageUrl: string,
   public userId: number | null,
   public isGeneratedByAI: boolean,
   public createdAt: Date,
   public countRating: number,
   public avgRating: number
    ){}
}