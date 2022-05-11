import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;

        await this.feedbacksRepository.create({
            type, 
            comment, 
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: "Feedback Received",
            body: [
                `<div>`,
                `<h5>${type}</h5>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : ``,                
                `</div>`
            ].join("\n")
        })
    }
}