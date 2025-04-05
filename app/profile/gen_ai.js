class GoogleGenAI {
    constructor(apiKey, model, systemPrompt, responseSchema) {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: model,
      });
      this.systemPrompt = systemPrompt;
      this.responseSchema = responseSchema;
      this.generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      };
      
      // If a responseSchema is provided, add it to the generationConfig
      if (responseSchema) {
        this.generationConfig.responseSchema = responseSchema;
        this.generationConfig.responseMimeType =  "application/json";
      }
    }
  
    async generateResponse(userInput) {
      const chatSession = this.model.startChat({
        generationConfig: this.generationConfig,
        history: [{
          role: "user",
          parts: [
            {
              text: this.systemPrompt
            }
          ]
        }],
      });
  
      const result = await chatSession.sendMessage(userInput);
      return result.response.text();
    }
  }
  
  module.exports = GoogleGenAI;