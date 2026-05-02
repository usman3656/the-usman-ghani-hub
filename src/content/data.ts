export const SITE = {
  name: "Usman Ghani Bawany",
  shortName: "Usman Ghani",
  tagline:
    "Researcher at UCL · Building Foresio · Writing on AI, blockchain, and the philosophy of mind.",
  bio: "MSc Emerging Digital Technologies at University College London, focused on blockchain, machine learning, and the systems where they collide. Previously co-founded Foresio, an AI automation startup, and Uplift Pakistan, a welfare NGO. I write about research I'm doing, books I'm reading, and the questions that keep pulling me out of bed at 2am.",
  location: "London, United Kingdom",
  email: "usman120ghani@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/usman-ghani-bawany/",
    github: "https://github.com/usman3656",
    email: "mailto:usman120ghani@gmail.com",
  },
};

export type Book = {
  title: string;
  author: string;
  rating: number;
  status: "reading" | "finished" | "want-to-read";
  category: "philosophy" | "ai-ml" | "science" | "poetry" | "finance";
  notes: string;
  cover?: string;
};

export const BOOKS: Book[] = [
  {
    title: "Gödel, Escher, Bach",
    author: "Douglas Hofstadter",
    rating: 5,
    status: "finished",
    category: "science",
    notes:
      "The book that turned recursion into a metaphysics. I keep coming back to the dialogues — they're the rare popular philosophy that actually does the work, not just narrates it.",
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    rating: 5,
    status: "finished",
    category: "science",
    notes:
      "Reframed how I think about agency at every level — from cells to firms to ML training runs. The 'gene's-eye view' generalizes shockingly well.",
  },
  {
    title: "I and Thou",
    author: "Martin Buber",
    rating: 4,
    status: "finished",
    category: "philosophy",
    notes:
      "A short book that took me months. Buber's distinction between I-It and I-Thou is the cleanest articulation I've found of why purely instrumental relationships feel hollow.",
  },
  {
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    rating: 4,
    status: "finished",
    category: "finance",
    notes:
      "The convexity framing — systems that gain from disorder — is now a default lens for me. Taleb is occasionally insufferable; the ideas are worth it.",
  },
  {
    title: "The Beginning of Infinity",
    author: "David Deutsch",
    rating: 5,
    status: "reading",
    category: "philosophy",
    notes:
      "Deutsch's claim that explanatory knowledge is open-ended is the most optimistic thing I've read in years. Slow going, dense, worth every page.",
  },
  {
    title: "Reasons and Persons",
    author: "Derek Parfit",
    rating: 5,
    status: "reading",
    category: "philosophy",
    notes:
      "Personal identity, ethics, future generations — Parfit asks the hardest questions in the calmest voice. The thought experiments rewire you.",
  },
  {
    title: "Bulleh Shah: The Mystic of Punjab",
    author: "Bulleh Shah (trans.)",
    rating: 5,
    status: "finished",
    category: "poetry",
    notes:
      "Sufi poetry that does in eight lines what most philosophy does in eight chapters. Read the Punjabi if you can — translation loses the music.",
  },
  {
    title: "Probability Theory: The Logic of Science",
    author: "E. T. Jaynes",
    rating: 5,
    status: "want-to-read",
    category: "ai-ml",
    notes:
      "Long on my list. The Bayesian gospel, written by someone who clearly thought the frequentists had stolen the cathedral.",
  },
];

export type Video = {
  title: string;
  description: string;
  youtubeId: string;
  date: string;
  category: "blockchain" | "ai-ml" | "engineering";
};

// Replace these YouTube IDs with real ones when ready.
export const VIDEOS: Video[] = [
  {
    title: "Zero-Knowledge Proofs, Explained from Scratch",
    description:
      "A walkthrough of zk-SNARKs starting from the interactive proof intuition — no prior cryptography assumed.",
    youtubeId: "gcKCW7CNu_M",
    date: "2026-02-14",
    category: "blockchain",
  },
  {
    title: "Building a Flight Computer for a Student Rocket",
    description:
      "Behind the scenes of UCL Racing Rocket's avionics: the FSM, sensor fusion, and what we learned from blowing things up.",
    youtubeId: "OqicIoUk-VI",
    date: "2026-01-22",
    category: "engineering",
  },
  {
    title: "On Reflexivity in Machine-Learning Markets",
    description:
      "A short talk on the residual multi-factor consensus measure and why crowded ML strategies are a systemic risk.",
    youtubeId: "M7lc1UVf-VE",
    date: "2025-12-08",
    category: "ai-ml",
  },
  {
    title: "Explainable AI in Clinical Settings — A Conversation",
    description:
      "Discussing the ACIT 2023 paper with collaborators: what 'interpretable' really has to mean for a doctor to use a model.",
    youtubeId: "aqz-KE-bpKQ",
    date: "2025-10-30",
    category: "ai-ml",
  },
];
