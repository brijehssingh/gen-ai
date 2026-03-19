import {GoogleGenAI} from "@google/genai"
import env from "dotenv"
 env.config();
  
const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
       
})


   export default async function invokeai() {
    


    const res = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"helloe genai is coffee is good for heakth or not"
    })

    console.log(res.text);
    
}


