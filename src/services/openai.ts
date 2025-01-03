import OpenAI from 'openai';
import { chunkText } from '../utils/textUtils';
import { parseResumeText, FormattedResume } from '../utils/resumeFormatter';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const SYSTEM_PROMPT = `You are an expert resume tailoring assistant. Format the resume in a clear, professional structure with these sections:
- Header (name and contact)
- Summary/Objective
- Experience
- Education
- Skills

For each experience:
- Use strong action verbs
- Quantify achievements
- Match keywords from job description
- Keep formatting consistent

Maintain truthfulness while optimizing content.`;

export async function generateTailoredResume(
  jobDescription: string,
  currentResume: string
): Promise<FormattedResume> {
  try {
    const resumeChunks = chunkText(currentResume, 1000); // Reduced chunk size
    let tailoredChunks: string[] = [];

    for (const chunk of resumeChunks) {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `Job Description:\n${jobDescription}\n\nResume Section:\n${chunk}\n\nPlease optimize this section of the resume to better match the job description while maintaining the same structure.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      if (response.choices[0].message.content) {
        tailoredChunks.push(response.choices[0].message.content);
      }

      await delay(1000);
    }

    const combinedResume = tailoredChunks.join('\n');
    return parseResumeText(combinedResume);
  } catch (error: any) {
    console.error('Error generating tailored resume:', error);
    throw new Error(error.message || 'Failed to generate tailored resume');
  }
}