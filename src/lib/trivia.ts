import prisma from '$lib/prisma'

import * as questionData from './data/JEOPARDY_QUESTIONS1.json';
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
            category: question.category,
            airDate: new Date(question.air_date),
            question: question.question,
            answer: question.answer,
            value: question.value,
            round: question.round,
            showNumber: question.show_number

        }
    })
    return questions
    
}
export const getAllCategories = async () => {
    const categories = await questionData.default.map((question) => {
        return question.category
    })
    return categories.filter((value, index, self) => self.indexOf(value) === index)

   
}

