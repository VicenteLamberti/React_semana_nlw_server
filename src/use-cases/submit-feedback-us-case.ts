import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type:string,
    comment:string,
    screenshot?:string
}

export class SubmitFeedbackUseCase{
//     private feedbackRepository : FeedbacksRepository;
// constructor(
//     feedbackRepository: PrismaFeedbacksRepository
// ){
//     this.feedbackRepository =feedbackRepository
// }

constructor(
    private feedbackRepository: PrismaFeedbacksRepository,
    private mailAdapter:MailAdapter
){}
    


    async execute(request:SubmitFeedbackUseCaseRequest){
        const {  type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is required');
        }

        if(!comment){
            throw new Error('Comment is required');
        }
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw Error('Invalid screenshot format');
        }
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendEmail({
            subject:'novo feedback',
            body:[
                `<div styles = "font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback ${type}</p>`,
                `<p>Tipo do feedback ${comment}</p>`,
                `<\div>`
            ].join('\n')
        })
    }
}