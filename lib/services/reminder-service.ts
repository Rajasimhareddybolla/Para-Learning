import GoogleGenAI from "@/app/profile/gen_ai.js";

// Reminder system prompt 
const REMINDER_SYSTEM_PROMPT = `
You are an AI reminder system for PARA, the Supreme Evolution App.
Your job is to provide personalized reminders, timings, and notification text
tailored to the user's daily routine and habit formation goals.

Create 3 different personalized reminders based on:
- User's daily routine
- History of completing tasks
- Current streak information
- Personal goals and preferences

For each reminder, provide:
- time: A suggested time for the reminder (e.g., "07:00 AM")
- engagement_notification: A short, engaging notification message
- task_id: A simple identifier for the task (e.g., "meditation-reminder-1")
- motivation_quote: A brief motivational quote relevant to the user's goals

Each reminder should focus on different aspects (meditation, exercise, journaling, etc.) 
and target different times throughout the day.

Keep notifications concise, personalized, and motivating.

Return your response AS PLAIN TEXT, not as JSON.
`;

export interface ReminderData {
  time: string;
  engagement_notification: string;
  task_id: string;
  motivation_quote: string;
}

export async function generateReminders(userContext: string): Promise<ReminderData[]> {
  try {
    // Initialize the Gemini AI
    const apiKey = "AIzaSyA9kMN5ja0slIyAAgBLbD1RjouUMFgfOSk";
    const ai = new GoogleGenAI(
      apiKey,
      "gemini-2.0-flash",
      REMINDER_SYSTEM_PROMPT,
      null // Remove schema to fix the error
    );
    
    // Generate 3 personalized reminders based on user context
    const prompt = `Generate 3 personalized reminders for this user context: ${userContext}`;
    
    const rawResponse = await ai.generateResponse(prompt, {
      additionalContext: userContext
    });
    
    // Parse the response to extract reminders
    const reminders: ReminderData[] = [];
    
    // Process the text response to extract reminders
    try {
      // Look for patterns like "time:" or "Time:" followed by content
      const lines = rawResponse.split('\n');
      let currentReminder: Partial<ReminderData> = {};
      let reminderCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.match(/^reminder\s*\d+/i) || line.match(/^#\d+/i) || line === '') {
          // Start of a new reminder or empty line
          if (Object.keys(currentReminder).length >= 4) {
            reminders.push(currentReminder as ReminderData);
            currentReminder = {};
            reminderCount++;
          }
          continue;
        }
        
        // Extract fields from lines
        if (line.match(/^time:/i)) {
          currentReminder.time = line.replace(/^time:\s*/i, '').trim();
        } else if (line.match(/^engagement_notification:|^notification:|^message:/i)) {
          currentReminder.engagement_notification = line.replace(/^(engagement_notification|notification|message):\s*/i, '').trim();
        } else if (line.match(/^task_id:|^id:/i)) {
          currentReminder.task_id = line.replace(/^(task_id|id):\s*/i, '').trim();
        } else if (line.match(/^motivation_quote:|^quote:/i)) {
          currentReminder.motivation_quote = line.replace(/^(motivation_quote|quote):\s*/i, '').trim();
        }
      }
      
      // Add the last reminder if complete
      if (Object.keys(currentReminder).length >= 4) {
        reminders.push(currentReminder as ReminderData);
      }
      
      // If parsing failed to extract reminders, create fallback reminders
      if (reminders.length === 0) {
        // Get some text fragments from the response to create semi-personalized fallbacks
        const textChunks = rawResponse.split(/[.!?]/);
        const validChunks = textChunks.filter(chunk => chunk.length > 20);
        const getChunk = (index: number) => validChunks[index % validChunks.length]?.trim() || "Stay consistent with your practice";
        
        reminders.push(
          {
            time: "07:30 AM",
            engagement_notification: getChunk(0),
            task_id: "morning-reminder-1",
            motivation_quote: "Small steps, big changes."
          },
          {
            time: "12:30 PM",
            engagement_notification: getChunk(1),
            task_id: "midday-reminder-1",
            motivation_quote: "Persistence beats resistance."
          },
          {
            time: "06:00 PM",
            engagement_notification: getChunk(2),
            task_id: "evening-reminder-1",
            motivation_quote: "Consistency creates excellence."
          }
        );
      }
    } catch (parseError) {
      console.error("Error parsing reminders from response:", parseError);
      throw new Error("Failed to parse reminders");
    }
    
    return reminders;
  } catch (error) {
    console.error("Failed to generate reminders:", error);
    // Return fallback reminders if generation fails
    return [
      {
        time: "07:30 AM",
        engagement_notification: "Time for morning meditation! Start your day with calm focus.",
        task_id: "morning-meditation-1",
        motivation_quote: "A peaceful mind leads to a productive day."
      },
      {
        time: "12:30 PM",
        engagement_notification: "Quick midday movement break! Stand up and stretch for 5 minutes.",
        task_id: "midday-movement-1",
        motivation_quote: "Small breaks create big energy."
      },
      {
        time: "09:00 PM",
        engagement_notification: "Time to reflect on today's wins in your journal.",
        task_id: "evening-reflection-1",
        motivation_quote: "Reflection turns experience into insight."
      }
    ];
  }
}

// Modify the existing function to use the new multi-reminder approach
export async function generateReminder(userContext: string): Promise<ReminderData> {
  const reminders = await generateReminders(userContext);
  return reminders[0] || {
    time: "08:00 AM",
    engagement_notification: "Time for your daily practice! Keep your streak going.",
    task_id: "default-reminder-1",
    motivation_quote: "Consistency is the key to transformation."
  };
}
