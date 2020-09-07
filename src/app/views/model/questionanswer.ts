

export class answerModel{
    constructor(
            public psid: number,
            public testCategoryId : number,
            public questionBankId : number,
            public testResultId : number,
            public answer : string,
            public altAnswer : string,
    ){}
}