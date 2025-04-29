export class UserGrowth {
    constructor(
        public year: number,
        public month: number,
        public userCount: number
    ) { }
}

export class UserStatisticsDto
{
    constructor(
    public  userId:number,
    public  username:string,
    public  drawingsCount:number,
    public  paintedDrawingsCount:number
    ){}
}

export class SystemStatisticsDto
{
    constructor(
    public  totalUsers:number,
    public  totalDrawings:number,
    public  totalPaintedDrawings:number
    ){}
}