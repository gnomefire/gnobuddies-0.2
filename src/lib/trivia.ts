import prisma from '$lib/prisma'
import { getAllUsers } from '../../websocketServer/util';
import * as questionData from 'data/JEOPARDY_QUESTIONS1.json'
export const randomQuestion = async () => {
    const numQuestions = await prisma.jQuestion.count()
    const skip = Math.floor(Math.random() * numQuestions)        
    const data = await prisma.jQuestion.findMany({
        skip: skip,
        take: 1,
    }).then((data) => data)
    return data
}

export const getAllQuestions = async () => {
    const questions = await questionData.default.map((question) => {
        return {
            question: question.question,
            answer: question.answer,
            value: question.value,
            categoryName: question.category,
            round: question.round,
            airDate: new Date(question.air_date),

        }
    })
    return questions
    
}
export const getAllCategories = async () => {

   

   
}
getAllQuestions().then(console.log)