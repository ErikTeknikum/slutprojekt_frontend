export interface Experiment {
    id: number,
    userId: number,
    name: string,
    title: string,
    desc: string,
    materials: string,
    instructions: string,
    likeCount: number,
    reportCount: number,
    categories: Array<{id: number, exptId: number, category: string}>,
    comments: Array<{id: number, userId: number, name:string, content:string}>
    imageUrls: Array<{id: number, url: string, exptId: string}>

}
