//Meemo
import meemo1 from '../assets/blogimages/meemo_1.jpg'
import meemo2 from '../assets/blogimages/meemo_2.jpg'
import meemo3 from '../assets/blogimages/meemo_3.jpg'
import meemo4 from '../assets/blogimages/meemo_4.jpg'
import meemo5 from '../assets/blogimages/meemo_5.jpg'

//Musikultura
import musikultura1 from '../assets/blogimages/musikultura_1.png'
import musikultura2 from '../assets/blogimages/musikultura_2.png'
import musikultura3 from '../assets/blogimages/musikultura_3.png'
import musikultura4 from '../assets/blogimages/musikultura_4.png'
import musikultura5 from '../assets/blogimages/musikultura_5.png'
import musikultura6 from '../assets/blogimages/musikultura_6.png'
import musikultura7 from '../assets/blogimages/musikultura_7.png'
import musikultura8 from '../assets/blogimages/musikultura_8.png'
import musikultura9 from '../assets/blogimages/musikultura_9.png'
import musikultura10 from '../assets/blogimages/musikultura_10.png'
import musikultura11 from '../assets/blogimages/musikultura_11.png'
import musikultura12 from '../assets/blogimages/musikultura_12.png'
import musikultura13 from '../assets/blogimages/musikultura_13.png'

//Sinammon
import sinammon1 from '../assets/blogimages/sinnamon_1.png'
import sinammon2 from '../assets/blogimages/sinnamon_2.png'
import sinammon3 from '../assets/blogimages/sinnamon_3.png'
import sinammon4 from '../assets/blogimages/sinnamon_4.png'
import sinammon5 from '../assets/blogimages/sinnamon_5.png'
import sinammon6 from '../assets/blogimages/sinnamon_6.png'
import sinammon7 from '../assets/blogimages/sinnamon_7.png'
import sinammon8 from '../assets/blogimages/sinnamon_8.png'

//Codey's Quest
import dev1 from '../assets/blogimages/dev_1.jpg'
import dev2 from '../assets/blogimages/dev_2.jpg'
import dev3 from '../assets/blogimages/dev_3.jpg'
import dev4 from '../assets/blogimages/dev_4.jpg'
import dev5 from '../assets/blogimages/dev_5.jpg'
import dev6 from '../assets/blogimages/dev_6.jpg'
import dev7 from '../assets/blogimages/dev_7.jpg'
import dev8 from '../assets/blogimages/dev_8.jpg'
import dev9 from '../assets/blogimages/dev_9.jpg'
import dev10 from '../assets/blogimages/dev_10.jpg'
import dev11 from '../assets/blogimages/dev_11.jpg'

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  coverGradient: string
  coverLabel: string
  images?: string[]
  tags: string[]
  content: ContentBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-react-native-calendar-app-Meemo",
    title: "Building a Calendar App Meemo with React Native and Supabase",
    description:
      "What I learned designing contribution graphs, navigation flows, and push notifications for a real-world mobile app.",
    date: "May 2026",
    readTime: 4,
    coverGradient: "from-blue-900/60 to-blue-500/20",
    coverLabel: "React Native",
    images: [meemo1, meemo2, meemo3, meemo4, meemo5],
    tags: ["react-native", "supabase", "mobile"],
    content: [
      {
        type: "paragraph",
        text: "Building Meemo taught me that mobile app architecture decisions compound fast. A choice made in week one — like how you structure navigation context — becomes something you refactor around for weeks afterward.",
      },
      {
        type: "heading",
        text: "The navigation problem",
      },
      {
        type: "paragraph",
        text: "React Navigation is powerful, but it punishes you for not thinking ahead. When I started wiring up the authentication flow alongside the main tab navigator, I ran into context errors that took hours to trace. The root issue: I had nested navigators without properly lifting shared state up.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// The fix: wrap everything in a single NavigationContainer at root
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  )
}`,
      },
      {
        type: "heading",
        text: "Contribution graphs are harder than they look",
      },
      {
        type: "paragraph",
        text: "The contribution graph component went through three complete rebuilds. The first version used absolute positioning, which broke on different screen sizes. The second used a FlatList, which had scroll conflicts with the parent ScrollView. The final version uses a fixed grid calculation based on device width — simple, and it works.",
      },
      {
        type: "subheading",
        text: "Key lessons",
      },
      {
        type: "list",
        items: [
          "Plan your navigator structure before writing a single screen",
          "NativeWind + React Navigation need careful z-index management",
          "Supabase realtime is easy to set up and hard to tear down gracefully",
          "Push notification permissions differ a lot between iOS and Android simulators",
        ],
      },
      {
        type: "paragraph",
        text: "The app still has rough edges, but shipping something real beats a perfect plan sitting in a docx file.",
      },
    ],
  },

  {
    slug: "musikultura-gemini-ai-philippine-instruments",
    title: "Using Gemini AI to Identify Traditional Philippine Instruments",
    description:
      "How we built a camera-powered instrument recognition app for a hackathon — and what surprised me about multimodal AI in practice.",
    date: "June 2026",
    readTime: 5,
    coverGradient: "from-amber-900/60 to-orange-500/20",
    coverLabel: "AI + Culture",
    images: [musikultura4, musikultura2, musikultura3, musikultura1, musikultura5, musikultura6, musikultura7, musikultura8, musikultura9, musikultura10, musikultura11, musikultura12, musikultura13],
    tags: ["gemini", "ai", "hackathon", "philippine-culture"],
    content: [
      {
        type: "paragraph",
        text: "Musikultura started as a hackathon idea: what if you could point your phone at a traditional Philippine instrument and have it tell you what it is, where it comes from, and how to play it? Gemini's multimodal API made that possible in a weekend.",
      },
      {
        type: "heading",
        text: "The prompt matters more than you think",
      },
      {
        type: "paragraph",
        text: "The difference between a useful identification and a hallucinated one often came down to the system prompt. Vague prompts got vague answers. When we structured the prompt to return JSON with confidence scores and regional context, the quality jumped significantly.",
      },
      {
        type: "code",
        language: "typescript",
        code: `const prompt = \`You are an expert on Philippine indigenous instruments.
Analyze this image and return JSON:
{
  "instrument": string,
  "region": string,
  "confidence": number,
  "description": string,
  "playingTechnique": string
}
If no instrument is visible, return { "instrument": null }\``,
      },
      {
        type: "heading",
        text: "Two modes, two experiences",
      },
      {
        type: "paragraph",
        text: "We split the app into Upload Mode (learn, no XP, no pressure) and Camera Scan Mode (discovery, full progression). This felt right — someone studying for a test shouldn't be penalized for uploading the same image twice. Discovery should feel different from studying.",
      },
      {
        type: "quote",
        text: "The best UX decision we made was separating learning from playing. They are different mental modes.",
      },
      {
        type: "paragraph",
        text: "The Gemini API handled ambiguous instrument photos better than I expected. Blurry images, poor lighting, partial views — it still surfaced the right region and instrument family most of the time.",
      },
    ],
  },

  {
    slug: "building-open-source-directory-for-educators",
    title: "How I Solve Frustration of Educators Searching for Open-source Directory Tools Essentail for Teaching",
    description:
      "Not a typical techy site but a directory source essential for educators making teaching a lot easier and bridging the gap between lack of tool resources.",
    date: "June 2026",
    readTime: 3,
    coverGradient: "from-violet-900/60 to-blue-600/20",
    coverLabel: "TypeScript",
    images: [sinammon1, sinammon2, sinammon3, sinammon4, sinammon5, sinammon6, sinammon7, sinammon8],
    tags: ["open-source", "react", "education", "ux"],
    content: [
      {
        type: "paragraph",
        text: "While doom scrolling in tiktok there's a spark of idea came out of my mind instantly. I think of what if there's an all in one place essential tools for educators so they won't have to experience difficulty searching.",
      },
      {
        type: "heading",
        text: "How Tool Data is stored",
      },
      {
        type: "paragraph",
        text: "You're wondering and I am too on how I will put all the essential tools in one place. I searched the web and asked gemini also the tools that are essential for teachers, then it gave me a list of all tools and I have to validate them also. Storing the data is compiled in a JSON Data .ts it is seperated then calling the .ts data to the Landing Page where the tools are stored",
      },
      {
        type: "code",
        language: "typescript",
        code: `export const CATEGORIES: CategoryOption[] = [
  { id: 'all',       label: 'All Tools' },
  { id: 'classroom', label: 'Classroom & Learning Management' },
  { id: 'content',   label: 'Content Creation & Interactive Lessons' },
  { id: 'stem',      label: 'Subject-Specific STEM Tools' },
  { id: 'regional',  label: 'Regional & Localized Resources' },
  { id: 'libraries', label: 'Essential Libraries and Offline Archives' },
]

export const TOOLS: Tool[] = [
  // ── Classroom & Learning Management ──────────────────────────────────────
  {
    id: ,
    name: '',
    category: '',
    categoryId: '',
    offlineCapable: '',
    techSkill: '',
    deviceSupport: [],
    description: '',
    link: '',
    logo: '', 
  },
]`,
      },
      {
        type: "heading",
        text: "DepEd Common OERs",
      },
      {
        type: "paragraph",
        text: "Every open source project faces the question of how far to go. The DepEd OER drill-down alone — scraping a four-level content hierarchy across grade levels, SHS tracks, and subjects — took longer than I expected. The lesson: shipping a well-scoped v1 beats an ambitious v0.5 that never lands.",
      },
    ],
  },

  {
    slug: "devcon-kids-event",
    title: "What I Learned During the Devcon Porac Stem Summer Camp",
    description:
      "Devcon Kids made an impactful Tech Edcuation among young learners. Keeping them interested and curios more about tech leading them to solve, innovate, create impactful technologies.",
    date: "Mar 2026",
    readTime: 4,
    coverGradient: "from-emerald-900/60 to-green-500/20",
    coverLabel: "Open Source",
    images: [dev1, dev2, dev3, dev4, dev5, dev6, dev7, dev8, dev9, dev10, dev11],
    tags: ["education", "lead-learner", "teaching", "micro:bits", "robotics"],
    content: [
      {
        type: "paragraph",
        text: "Being a Lead Learner is a privilege. Having the opportunity to teach kids about technology motivates me to continue pursuing a career in the tech industry. Seeing their curiosity and enthusiasm reminds me how impactful technology can be, especially in a world where it evolves and advances so rapidly. It inspires me to keep learning, growing, and sharing my knowledge with others.",
      },
      {
        type: "heading",
        text: "Hearted Learning",
      },
      {
        type: "paragraph",
        text: "Collaborating with fellow volunteers to plan and deliver engaging learning activities for kids has been a rewarding experience. Working together allows us to create lessons that are both educational and enjoyable. Through careful planning and teamwork, we ensure that every session provides meaningful learning opportunities. Seeing the children's curiosity and confidence grow motivates us to continue improving our approach. This experience has strengthened my collaboration, leadership, and communication skills while reinforcing my passion for education and technology.",
      },
      {
        type: "heading",
        text: "Hope for the future",
      },
      {
        type: "paragraph",
        text: "I hope to inspire young learners to see technology as a tool for creativity, innovation, and positive change. Every learning session is an opportunity to spark their curiosity and build their confidence in exploring new ideas. By guiding them with patience and encouragement, I hope to help them develop skills that will benefit them in the future. I believe that investing in today's young learners helps create a generation of future innovators, problem-solvers, and leaders. Seeing their excitement to learn gives me hope for a brighter future shaped by knowledge, curiosity, and technology.",
      },
    ],
  },
]
