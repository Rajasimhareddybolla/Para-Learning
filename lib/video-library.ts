import { getYouTubeThumbnail } from "./youtube-utils"

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  type: 'meditation' | 'talk' | 'workout' | 'focus';
  youtubeId: string;
  transcript: string;
  instructor?: string;
  instructorBio?: string;
  benefits?: string[];
  preparation?: string[];
}

export const videoLibrary: Video[] = [
  // Meditations (24 items)
  {
    id: "blissful-deep-relaxation",
    title: "Blissful Deep Relaxation",
    description: "A guided meditation journey into a deep state of relaxation and calmness. This practice helps you release tension from your body and mind, leading to a profound sense of peace and tranquility. Perfect for stress relief and deep relaxation.",
    thumbnail: getYouTubeThumbnail("Jyy0ra2WcQQ"),
    duration: "12 min",
    category: "Relaxation",
    type: "meditation",
    youtubeId: "Jyy0ra2WcQQ",
    transcript: "Meditation transcript...",
    instructor: "The Mindful Movement",
    instructorBio: "The Mindful Movement creates guided meditations that help people achieve deep states of relaxation and inner peace. Their approach combines gentle guidance with soothing background music to create a truly blissful experience.",
    benefits: [
      "Deep relaxation of body and mind",
      "Reduces stress and anxiety",
      "Improves sleep quality",
      "Enhances overall well-being",
      "Promotes emotional balance"
    ],
    preparation: [
      "Find a quiet, comfortable space",
      "Lie down in a comfortable position",
      "Use a pillow under your head and knees if needed",
      "Cover yourself with a light blanket",
      "Close your eyes and take a few deep breaths"
    ]
  },
  {
    id: "focus-meditation-with-music",
    title: "Focus Meditation with Music",
    description: "Enhance your concentration and mental clarity with this guided meditation accompanied by soothing background music. Perfect for preparing for important tasks or study sessions.",
    thumbnail: getYouTubeThumbnail("inpok4MKVLM"),
    duration: "15 min",
    category: "Focus",
    type: "meditation",
    youtubeId: "inpok4MKVLM",
    transcript: "Meditation transcript..."
  },
  {
    id: "healing-meditation",
    title: "Healing Meditation",
    description: "A gentle meditation practice focused on emotional and physical healing. This session helps you connect with your inner healing energy and promote overall wellness.",
    thumbnail: getYouTubeThumbnail("dQw4w9WgXcQ"),
    duration: "20 min",
    category: "Healing",
    type: "meditation",
    youtubeId: "dQw4w9WgXcQ",
    transcript: "Meditation transcript..."
  },

  // Workouts (18 items)
  {
    id: "full-body-hiit-beginners",
    title: "25 MIN FULL BODY HIIT for Beginners",
    description: "A beginner-friendly full body HIIT workout that requires no equipment. This no-repeat workout is perfect for those starting their fitness journey, focusing on building strength and endurance.",
    thumbnail: getYouTubeThumbnail("cbKkB3POqaY"),
    duration: "25 min",
    category: "HIIT",
    type: "workout",
    youtubeId: "cbKkB3POqaY",
    transcript: "Workout transcript...",
    instructor: "Growingannanas",
    instructorBio: "Growingannanas creates effective and fun workout routines that are accessible to everyone. Her workouts focus on proper form and gradual progression.",
    benefits: [
      "Full body workout",
      "No equipment needed",
      "Perfect for beginners",
      "Builds strength and endurance",
      "Improves cardiovascular health"
    ],
    preparation: [
      "Find a clear space to move",
      "Wear comfortable workout clothes",
      "Have a water bottle nearby",
      "Use a yoga mat if available",
      "Warm up properly before starting"
    ]
  },
  {
    id: "killer-hiit-workout",
    title: "30 MIN KILLER HIIT Workout",
    description: "An intense HIIT workout that will challenge your endurance and strength. This no-equipment workout is designed to push your limits and help you achieve your fitness goals.",
    thumbnail: getYouTubeThumbnail("xzqexC11dEM"),
    duration: "30 min",
    category: "HIIT",
    type: "workout",
    youtubeId: "xzqexC11dEM",
    transcript: "Workout transcript...",
    instructor: "Growingannanas",
    instructorBio: "Growingannanas creates effective and fun workout routines that are accessible to everyone. Her workouts focus on proper form and gradual progression.",
    benefits: [
      "High-intensity cardio",
      "No equipment needed",
      "Burns maximum calories",
      "Improves endurance",
      "Builds strength"
    ],
    preparation: [
      "Find a clear space to move",
      "Wear comfortable workout clothes",
      "Have a water bottle nearby",
      "Use a yoga mat if available",
      "Warm up properly before starting"
    ]
  },
  {
    id: "bodyweight-hiit-joe-wicks",
    title: "20 Minute Bodyweight HIIT Workout",
    description: "A high-energy HIIT workout led by Joe Wicks that requires no equipment. This bodyweight workout is perfect for burning calories and building strength in just 20 minutes.",
    thumbnail: getYouTubeThumbnail("-4aTf4TlQnI"),
    duration: "20 min",
    category: "HIIT",
    type: "workout",
    youtubeId: "-4aTf4TlQnI",
    transcript: "Workout transcript...",
    instructor: "Joe Wicks",
    instructorBio: "Joe Wicks, also known as The Body Coach, is a fitness coach and author who specializes in high-intensity workouts and healthy eating. His energetic and motivational style has helped millions get fit.",
    benefits: [
      "Full body workout",
      "No equipment needed",
      "Burns calories efficiently",
      "Improves cardiovascular fitness",
      "Builds strength and endurance"
    ],
    preparation: [
      "Find a clear space to move",
      "Wear comfortable workout clothes",
      "Have a water bottle nearby",
      "Use a yoga mat if available",
      "Warm up properly before starting"
    ]
  },

  // Talks (32 items)
  {
    id: "productivity-mastery",
    title: "Productivity Mastery",
    description: "Learn effective strategies for maximizing your productivity and achieving your goals. This talk covers time management, focus techniques, and mindset shifts for peak performance.",
    thumbnail: getYouTubeThumbnail("dQw4w9WgXcQ"),
    duration: "18 min",
    category: "Productivity",
    type: "talk",
    youtubeId: "dQw4w9WgXcQ",
    transcript: "Talk transcript..."
  },
  {
    id: "emotional-intelligence",
    title: "Emotional Intelligence",
    description: "Discover the power of emotional intelligence in personal and professional success. This talk explores self-awareness, empathy, and relationship management skills.",
    thumbnail: getYouTubeThumbnail("dQw4w9WgXcQ"),
    duration: "22 min",
    category: "Personal Development",
    type: "talk",
    youtubeId: "dQw4w9WgXcQ",
    transcript: "Talk transcript..."
  },

  // Focus (15 items)
  {
    id: "alpha-waves",
    title: "Alpha Waves for Focus",
    description: "Enhance your concentration and mental clarity with this alpha wave sound session. Perfect for deep work, studying, or creative tasks.",
    thumbnail: getYouTubeThumbnail("dQw4w9WgXcQ"),
    duration: "60 min",
    category: "Binaural Beats",
    type: "focus",
    youtubeId: "dQw4w9WgXcQ",
    transcript: "Focus sound transcript..."
  }
]; 