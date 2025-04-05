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
    id: "power-hiit",
    title: "Power HIIT Workout",
    description: "A high-intensity interval training session designed to boost your metabolism and improve cardiovascular fitness. Perfect for those looking to maximize their workout in minimal time.",
    thumbnail: getYouTubeThumbnail("dQw4w9WgXcQ"),
    duration: "25 min",
    category: "HIIT",
    type: "workout",
    youtubeId: "dQw4w9WgXcQ",
    transcript: "Workout transcript..."
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