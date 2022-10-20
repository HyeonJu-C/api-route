import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET') {
        const feedbackFilePath = getFeedbackPath()
        const data = getFileData(feedbackFilePath)
        res.status(200).json({ feedback: data })
        return;
    }
    if (req.method === 'POST') {
        const email = req.body.email
        const feedback = req.body.feedback

        const newData = {
            id: new Date().toISOString(),
            email,
            feedback,
        }

        // store data in /data/feedback.json
        const feedbackFilePath = getFeedbackPath()
        const data = getFileData(feedbackFilePath)
        data.push(newData)

        fs.writeFileSync(feedbackFilePath, JSON.stringify(data))
        res.status(201).json({ message: "success storing email & feedback", newData })
    }
}

function getFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json')
}

function getFileData(filepath: string) {
    const filteData = fs.readFileSync(filepath).toString()
    const data = JSON.parse(filteData)
    return data
}