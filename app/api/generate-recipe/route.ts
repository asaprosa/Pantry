import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key as an environment variable (see .env.local file)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  console.log('POST request received at /api/generate-recipe');
  try {
    const { ingredients, mealType, cuisine, cookingTime, complexity, userProfile } = await req.json();
    console.log('Received data:', { ingredients, mealType, cuisine, cookingTime, complexity, userProfile });

    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error('GOOGLE_AI_API_KEY is not set');
    }

    const prompt = `Generate a ${complexity} ${cuisine} ${mealType} recipe that takes about ${cookingTime} minutes to prepare, using these ingredients: ${ingredients}. 
    The user has the following health considerations: chronic diseases - ${userProfile?.chronicDiseases || 'None'}, allergies - ${userProfile?.allergies || 'None'}. 
    Please ensure the recipe is suitable given these health considerations. 
    Format the response as follows:
    Recipe Name:
    Ingredients:
    Instructions:
    Nutritional Information:
    Health Considerations:`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipe = response.text();

    return NextResponse.json({ recipe });
  } catch (error: any) {
    console.error('Error generating recipe:', error);
    return NextResponse.json({ error: 'Error generating recipe', details: error.message }, { status: 500 });
  }
}
