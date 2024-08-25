import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from 'openai'

const systemPrompt = 
`
You are a helpful assistant designed to assist students in finding the best professors according to their needs. Using the RateMyProfessor dataset and a Retrieval-Augmented Generation (RAG) approach, you will analyze the student's query and provide a list of the top 3 professors that best match their preferences if available. Each professor's recommendation should be accompanied by a brief summary, highlighting their strengths, course subjects, and average rating. Ensure the information is accurate, concise, and tailored to the student's specific query.

Guidelines:

Query Analysis: Carefully analyze the student's query to understand their preferences, such as subject, teaching style, availability, or rating preferences.

Retrieve and Rank: Use the RAG approach to retrieve and rank the top 3 professors that best fit the query criteria. Consider factors like subject relevance, student ratings, and specific strengths.

Provide Summaries: For each professor, provide a brief summary that includes:

Name: The professor's full name.
Subject: The subjects or courses they teach.
Average Rating: Their average rating based on student reviews.
Highlights: Key strengths, teaching style, and any notable feedback from students.
Be Neutral and Helpful: Present information in a neutral and helpful manner, avoiding any bias or personal opinions.

Clarify and Refine: If the student's query is unclear or vague, ask clarifying questions to ensure the recommendations are as accurate and relevant as possible.

Example Interaction:

User: "I'm looking for a professor who teaches computer science and has great ratings for being clear in lectures."

Agent Response:

"Here are the top 3 professors based on your query:

Dr. John Doe

Subject: Computer Science (Introduction to Algorithms, Data Structures)
Average Rating: 4.8/5
Highlights: Dr. Doe is known for his clear and structured lectures, making complex topics easy to understand. Students appreciate his approachable nature and thorough explanations.
Prof. Jane Smith

Subject: Computer Science (Artificial Intelligence, Machine Learning)
Average Rating: 4.7/5
Highlights: Prof. Smith has a talent for breaking down difficult concepts in AI and Machine Learning. She is praised for her interactive teaching style and practical examples.
Dr. Emily Johnson

Subject: Computer Science (Operating Systems, Networks)
Average Rating: 4.6/5
Highlights: Dr. Johnson's lectures are highly organized, and she often incorporates real-world examples to enhance understanding. Students find her exams fair and reflective of the material covered."
`

export async function POST(req) {
    try {
      const data = await req.json()
      
      const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
      })
      const index = pc.index('rag').namespace('ns1')
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
  
      const text = data[data.length - 1].content
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      })
  
      const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
      })
  
      let resultString = '\n\nReturned results from vector db (done automatically):'
      results.matches.forEach((match) => {
        resultString += `\nProfessor: ${match.id}\nReview: ${match.metadata.stars}\nSubject: ${match.metadata.subject}\nStars: ${match.metadata.stars}\n\n`
      })
  
      const lastMessage = data[data.length - 1]
      const lastMessageContent = lastMessage.content + resultString
      const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
      
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          ...lastDataWithoutLastMessage,
          { role: 'user', content: lastMessageContent },
        ],
        model: 'gpt-4o-mini',
        stream: true,
      });
  
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                const text = encoder.encode(content);
                controller.enqueue(text);
              }
            }
          } catch (err) {
            controller.error(err);
          } finally {
            controller.close();
          }
        }
      });
  
      return new Response(stream)
  
    } catch (error) {
      console.error('Error in POST /api/chat:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }