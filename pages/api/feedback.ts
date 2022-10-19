import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        res.status(200).json({ message: "this is not POST req!" })
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
        const feedbackFile = path.join(process.cwd(), 'data', 'feedback.json')
        const feedbackFileData = fs.readFileSync(feedbackFile).toString()
        const data = JSON.parse(feedbackFileData)
        data.push(newData)

        fs.writeFileSync(feedbackFile, JSON.stringify(data))
        res.status(201).json({ message: "success storing email & feedback", newData })
    }
}