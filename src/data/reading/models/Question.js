export default class Question{

    constructor(data){

        this.id=data.id;

        this.type=data.type;

        this.question=data.question;

        this.options=data.options ?? [];

        this.answer=data.answer;

        this.explanation=data.explanation ?? "";

        this.skill=data.skill ?? "";

        this.difficulty=data.difficulty ?? "medium";

        this.section=data.section ?? 1;

    }
}