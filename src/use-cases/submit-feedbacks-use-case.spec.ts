// test('sum 2 + 2', () => {
//     expect(2 + 2).toBe(4);
// })

import { SubmitFeedbackUseCase } from "./submit-feedback-us-case";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(  
    { create : createFeedbackSpy },
    { sendEmail: sendEmailSpy }
)
describe('Submit feedback', ()=>{
    it('should be able to submit a feedback', async ()=>{
        
        await expect(submitFeedback.execute({
            type:"BUG",
            comment:"example comment",
            screenshot:'data:image/png;base64,812ksoapkspa'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });


    it('should not be able to submit a feedback without type', async ()=>{
        
        await expect(submitFeedback.execute({
            type:"",
            comment:"example comment",
            screenshot:'data:image/png;base64,812ksoapkspa'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async ()=>{
        
        await expect(submitFeedback.execute({
            type:"BUG",
            comment:"",
            screenshot:'data:image/png;base64,812ksoapkspa'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async ()=>{
        
        await expect(submitFeedback.execute({
            type:"BUG",
            comment:"comment",
            screenshot:'startWith'
        })).rejects.toThrow();
    });
});