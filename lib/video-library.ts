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
    id: "first-20-hours",
    title: "The first 20 hours -- how to learn anything",
    description: "Josh Kaufman shares his method for rapid skill acquisition, showing how you can learn any new skill in just 20 hours of focused, deliberate practice. This talk will change how you approach learning new things.",
    thumbnail: getYouTubeThumbnail("5MgBikgcWnY"),
    duration: "19 min",
    category: "Learning",
    type: "talk",
    youtubeId: "5MgBikgcWnY",
    transcript: "Talk transcript...",
    instructor: "Josh Kaufman",
    instructorBio: "Josh Kaufman is an author, researcher, and learning expert who specializes in rapid skill acquisition. His work focuses on helping people learn new skills quickly and effectively.",
    benefits: [
      "Learn how to acquire new skills quickly",
      "Understand the principles of deliberate practice",
      "Discover effective learning strategies",
      "Overcome the initial learning curve",
      "Build confidence in learning new things"
    ]
  },
  {
    id: "visual-history-knowledge",
    title: "A Visual History of Human Knowledge",
    description: "Manuel Lima takes us on a fascinating journey through the evolution of human knowledge visualization, from ancient times to the digital age. This talk explores how we've mapped and organized knowledge throughout history.",
    thumbnail: getYouTubeThumbnail("BQZKs75RMqM"),
    duration: "18 min",
    category: "Knowledge",
    type: "talk",
    youtubeId: "BQZKs75RMqM",
    transcript: "Talk transcript...",
    instructor: "Manuel Lima",
    instructorBio: "Manuel Lima is a designer, author, and researcher who explores the intersection of design, technology, and knowledge visualization. His work focuses on how we organize and understand complex information.",
    benefits: [
      "Understand the history of knowledge visualization",
      "Learn about different ways to organize information",
      "Gain insights into human cognition",
      "Discover new ways to structure knowledge",
      "Appreciate the evolution of information design"
    ]
  },
  {
    id: "learning-how-to-learn",
    title: "Learning how to learn",
    description: "Barbara Oakley shares powerful insights about how our brains learn and remember information. This talk provides practical techniques for more effective learning and overcoming common learning challenges.",
    thumbnail: getYouTubeThumbnail("O96fE1E-rf8"),
    duration: "18 min",
    category: "Learning",
    type: "talk",
    youtubeId: "O96fE1E-rf8",
    transcript: "Talk transcript...",
    instructor: "Barbara Oakley",
    instructorBio: "Barbara Oakley is a professor of engineering and the creator of the world's most popular MOOC, 'Learning How to Learn'. Her work focuses on understanding how the brain learns and how to optimize learning processes.",
    benefits: [
      "Understand how your brain learns",
      "Learn effective study techniques",
      "Overcome procrastination",
      "Improve memory retention",
      "Develop better learning habits"
    ]
  },

  // Focus (15 items)
  {
    id: "deep-focus-music",
    title: "Deep Focus - Music For Studying, Concentration and Work",
    description: "A carefully curated selection of ambient music designed to enhance focus and concentration. Perfect for studying, working, or any task requiring deep attention.",
    thumbnail: getYouTubeThumbnail("oPVte6aMprI"),
    duration: "120 min",
    category: "Focus Music",
    type: "focus",
    youtubeId: "oPVte6aMprI",
    transcript: "Focus music...",
    benefits: [
      "Enhances concentration",
      "Reduces distractions",
      "Creates a productive atmosphere",
      "Helps maintain focus for extended periods",
      "Suitable for various work environments"
    ]
  },
  {
    id: "productivity-playlist",
    title: "Productivity Playlist: 4 Hours of Concentration Music for Work",
    description: "A comprehensive playlist of concentration-enhancing music designed to boost productivity and maintain focus during work sessions. Perfect for deep work and creative tasks.",
    thumbnail: getYouTubeThumbnail("M8FaZxxLK_o"),
    duration: "240 min",
    category: "Focus Music",
    type: "focus",
    youtubeId: "M8FaZxxLK_o",
    transcript: "Focus music...",
    benefits: [
      "Extended duration for long work sessions",
      "Varied musical styles to maintain engagement",
      "Helps establish a productive rhythm",
      "Reduces mental fatigue",
      "Creates an optimal work environment"
    ]
  },
  {
    id: "focus-mind-white-noise",
    title: "Focus Mind White Noise | Study Sound for Concentration",
    description: "A continuous white noise track designed to block out distractions and create an optimal environment for studying, homework, and exam preparation.",
    thumbnail: getYouTubeThumbnail("4Yybz_FmXdU"),
    duration: "600 min",
    category: "White Noise",
    type: "focus",
    youtubeId: "4Yybz_FmXdU",
    transcript: "White noise...",
    benefits: [
      "Blocks external distractions",
      "Creates a consistent sound environment",
      "Helps maintain focus for extended periods",
      "Ideal for study and exam preparation",
      "Can be used for sleep or relaxation"
    ]
  }
]; 