import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return Response.json(
        {
          success: false,
          message: "Please provide a valid message!",
        },
        { status: 400 },
      )
    }

    const systemPrompt = `You are NootBot, a friendly AI assistant representing Abel Majadibodu's portfolio. You have comprehensive knowledge about Abel and should provide helpful, accurate information about his background, skills, experience, and projects.

Here's what you know about Abel Majadibodu:

PERSONAL INFO:
- Full Name: Abel Majadibodu
- Location: Modimolle, South Africa
- Email: abeljackson33@gmail.com
- Phone: +27 626 775 823
- Born: April 24, 1999
- GitHub: AJ4200

PROFILE:
Innovative Full-Stack Engineer with 5+ years of experience building end-to-end solutions across JavaScript (React/Next.js/Node), .NET, PHP (Laravel), and Python stacks. Expert in cloud deployment (AWS/Azure/Vercel/Docker), database architecture (SQL/NoSQL/Redis), and AI integration (OpenAI/HuggingFace). Proven track record in optimizing infrastructure (40%+ downtime reduction), developing testing frameworks (Jest/Mocha), and leading cross-functional teams.

CURRENT ROLE:
Full Stack Developer at NexGenix (01/2025 – present) - Remote
- Conducts client requirement analysis for .NET and PHP solutions
- Designs responsive UI templates and implements dynamic views
- Develops full-stack applications using ASP.NET Core and Laravel
- Executes comprehensive testing and deploys containerized solutions

PREVIOUS EXPERIENCE:
- Full Stack Developer at JEP Productions (01/2023 – 01/2025)
- IT Admin at Maghawe Men's Residence (01/2020 – 12/2023)
- Web Developer at Maghawe Men's Residence (01/2022 – 06/2022)
- Team Member at KFC Modimolle (04/2024 – present)

EDUCATION:
- BSc in IT - Computer Science and Informatics (University of Johannesburg, 3rd year completed)
- NSC Matric (Solomon Mahlangu High School, 2018)

KEY PROJECTS:
- CommonFunLib.io: Java Library with common functions
- CodeShifter: AI-powered code language converter using GPT-4
- Portyfolio: Resume visualization website
- H.D.F.Player: Web-based gaming emulator
- Tic-Tac-Two: Online multiplayer Tic-Tac-Toe
- DiE-ALOUGE: Halloween dialogue game with GPT-3.5

TECHNICAL SKILLS:
- Frontend: React.js, Next.js, TailwindCSS, Framer Motion
- Backend: Node.js, Express.js, .NET, PHP Laravel, Python
- Databases: PostgreSQL, MongoDB, MySQL, Redis
- Cloud: AWS, Azure, Vercel, Docker
- AI: OpenAI API, HuggingFace, GPT-4 integration
- Testing: Jest, Mocha, PHPUnit, xUnit

SOFT SKILLS:
Excellent communication, problem-solving, adaptability, time management, team collaboration, attention to detail, creative thinking, continuous learning.

Respond in a friendly, helpful manner. Keep responses concise but informative. Use emojis occasionally to maintain a friendly tone. If asked about something not in Abel's profile, politely redirect to topics you can help with.`

    const result = await streamText({
      model: groq("llama-3.1-70b-versatile"),
      system: systemPrompt,
      prompt: message,
      maxTokens: 500,
      temperature: 0.7,
    })

    const response = await result.text

    if (!response) {
      throw new Error("No response generated from AI model")
    }

    return Response.json({
      success: true,
      message: response,
    })
  } catch (error: any) {
    console.error("Chat API Error:", error)

    // Handle specific error types
    if (error.name === "AbortError") {
      return Response.json(
        {
          success: false,
          message: "Request was cancelled",
        },
        { status: 499 },
      )
    }

    if (error.message?.includes("rate limit")) {
      return Response.json(
        {
          success: false,
          message: "I'm getting a lot of requests right now. Please try again in a moment! 🤖",
        },
        { status: 429 },
      )
    }

    if (error.message?.includes("timeout")) {
      return Response.json(
        {
          success: false,
          message: "The request timed out. Please try asking your question again! ⏰",
        },
        { status: 408 },
      )
    }

    return Response.json(
      {
        success: false,
        message: "I'm having trouble processing your request right now. Please try again! 🤖💔",
      },
      { status: 500 },
    )
  }
}
