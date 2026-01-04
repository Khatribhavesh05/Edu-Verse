

import { Book, BrainCircuit, Code, Dna, Globe, GraduationCap, Home, LayoutDashboard, MessageSquare, Award, Shapes, Atom, Recycle, TestTube, Infinity, PenLine, Blocks, MessageCircle, GanttChartSquare, Landmark, Building2, Globe2, Binary, CircuitBoard, Scale, Lightbulb, MoveHorizontal, Pen, Brain } from "lucide-react";

export const subjects = [
  { name: 'Mathematics', slug: 'mathematics', icon: Infinity },
  { name: 'Science', slug: 'science', icon: Dna },
  { name: 'English', slug: 'english', icon: Book },
  { name: 'Social Studies', slug: 'social-studies', icon: Globe },
  { name: 'Computer Science', slug: 'computer-science', icon: Code },
  { name: 'General Knowledge', slug: 'general-knowledge', icon: GraduationCap },
];

export const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/ai-tutor', label: 'AI Chatbot', icon: MessageSquare },
    { href: '/topic-description', label: 'Topic Description', icon: BrainCircuit },
];

export const progressData = [
  { subject: 'Mathematics', progress: 70 },
  { subject: 'Science', progress: 40 },
  { subject: 'English', progress: 85 },
  { subject: 'Social Studies', progress: 60 },
  { subject: 'Computer Science', progress: 90 },
  { subject: 'General Knowledge', progress: 50 },
];

export const badges = [
  { name: 'Quiz Master', icon: GraduationCap },
  { name: 'Fast Learner', icon: MessageSquare },
  { name: 'Science Whiz', icon: Dna },
  { name: 'Math Genius', icon: BrainCircuit },
  { name: 'Bookworm', icon: Book },
  { name: 'Equation Master', icon: Award },
  { name: 'Number Navigator', icon: Award },
  { name: 'Geometry Pro', icon: Award },
  { name: 'Grammar Guru', icon: Award },
  { name: 'Storyteller', icon: Award },
  { name: 'Vocabulary Virtuoso', icon: Award },
  { name: 'History Buff', icon: Award },
  { name: 'World Traveler', icon: Award },
  { name: 'Civic Leader', icon: Award },
  { name: 'Binary Brain', icon: Award },
  { name: 'Logic Lord', icon: Award },
  { name: 'Algorithm Ace', icon: Award },
  { name: 'Trivia Titan', icon: Award },
  { name: 'Category King', icon: Award },
  { name: 'Invention Inspector', icon: Award },
  { name: 'Ecosystem Expert', icon: Award },
  { name: 'Master Chemist', icon: Award },
];

export const games = [
    { name: 'Equation Quest', slug: 'game1', subject: 'mathematics', description: 'Solve for the unknown variable in this algebraic adventure.', icon: Brain },
    { name: 'Number Line Navigation', slug: 'game2', subject: 'mathematics', description: 'Master integers by navigating a number line.', icon: MoveHorizontal },
    { name: 'Polygon Playground', slug: 'game3', subject: 'mathematics', description: 'Learn geometry by drawing polygons.', icon: Pen },
    { name: 'Save the Planet', slug: 'game1', subject: 'science', description: 'Catch recyclable items and learn why recycling is important.', icon: Recycle },
    { name: 'Ecosystem Balance Challenge', slug: 'game2', subject: 'science', description: 'Manage populations to keep the ecosystem from collapsing.', icon: Dna },
    { name: 'Chemistry Lab', slug: 'game3', subject: 'science', description: 'Combine atoms to build molecules and learn chemical formulas.', icon: TestTube },
    { name: 'Word Weaver', slug: 'game1', subject: 'english', description: 'Unscramble words to form correct sentences and master grammar.', icon: PenLine },
    { name: 'Story Scrambler', slug: 'game2', subject: 'english', description: 'Arrange jumbled paragraphs to reconstruct a coherent story.', icon: Blocks },
    { name: 'Synonym Sprint', slug: 'game3', subject: 'english', description: 'Race against time to match words with their synonyms.', icon: MessageCircle },
    { name: 'Historical Timeline', slug: 'game1', subject: 'social-studies', description: 'Order historical events correctly on a timeline.', icon: GanttChartSquare },
    { name: 'Civics Builder', slug: 'game2', subject: 'social-studies', description: 'Answer civics questions to build and grow a city.', icon: Building2 },
    { name: 'World Traveler', slug: 'game3', subject: 'social-studies', description: 'Guess the country of a famous world landmark.', icon: Globe2 },
    { name: 'Binary Blitz', slug: 'game1', subject: 'computer-science', description: 'Convert decimal numbers to binary against the clock.', icon: Binary },
    { name: 'Logic Gate Labyrinth', slug: 'game2', subject: 'computer-science', description: 'Solve puzzles by connecting logic gates to build circuits.', icon: CircuitBoard },
    { name: 'Data Structure Drills', slug: 'game3', subject: 'computer-science', description: 'Learn sorting algorithms by visually arranging data.', icon: BrainCircuit },
    { name: 'Fact or Fiction Frenzy', slug: 'game1', subject: 'general-knowledge', description: 'Test your knowledge by quickly identifying facts from fiction.', icon: Scale },
    { name: 'Category Conundrum', slug: 'game2', subject: 'general-knowledge', description: 'Find the item that doesn\'t belong in the category.', icon: Shapes },
    { name: 'Invention Timeline', slug: 'game3', subject: 'general-knowledge', description: 'Guess the correct era for famous inventions.', icon: Lightbulb },
];

export const mathQuestions = [
    { question: "5 + 8 = ?", answers: ["13", "12", "15", "10"], correctAnswer: "13" },
    { question: "12 - 4 = ?", answers: ["8", "7", "9", "6"], correctAnswer: "8" },
    { question: "7 * 3 = ?", answers: ["21", "20", "24", "18"], correctAnswer: "21" },
    { question: "15 / 5 = ?", answers: ["3", "4", "5", "2"], correctAnswer: "3" },
    { question: "9 + 6 = ?", answers: ["15", "14", "16", "13"], correctAnswer: "15" },
    { question: "18 - 9 = ?", answers: ["9", "8", "10", "7"], correctAnswer: "9" },
    { question: "4 * 8 = ?", answers: ["32", "30", "36", "28"], correctAnswer: "32" },
    { question: "24 / 6 = ?", answers: ["4", "3", "5", "6"], correctAnswer: "4" },
    { question: "13 + 7 = ?", answers: ["20", "19", "21", "18"], correctAnswer: "20" },
    { question: "20 - 5 = ?", answers: ["15", "14", "16", "13"], correctAnswer: "15" },
];

export const equationQuestions = [
    { question: "x + 5 = 12", answers: ["x = 7", "x = 5", "x = 17", "x = 6"], correctAnswer: "7" },
    { question: "x - 3 = 10", answers: ["x = 13", "x = 7", "x = 10", "x = 30"], correctAnswer: "13" },
    { question: "2 * x = 18", answers: ["x = 9", "x = 8", "x = 16", "x = 36"], correctAnswer: "9" },
    { question: "x / 4 = 5", answers: ["x = 20", "x = 1", "x = 9", "x = 1.25"], correctAnswer: "20" },
    { question: "8 + x = 15", answers: ["x = 7", "x = 23", "x = 8", "x = 1.875"], correctAnswer: "7" },
    { question: "14 - x = 6", answers: ["x = 8", "x = 20", "x = 9", "x = -8"], correctAnswer: "8" },
    { question: "x * 3 = 21", answers: ["x = 7", "x = 24", "x = 18", "x = 63"], correctAnswer: "7" },
    { question: "30 / x = 6", answers: ["x = 5", "x = 24", "x = 36", "x = 180"], correctAnswer: "5" },
    { question: "x + 9 = 9", answers: ["x = 0", "x = 18", "x = 1", "x = 81"], correctAnswer: "0" },
    { question: "5 * x = 25", answers: ["x = 5", "x = 20", "x = 30", "x = 125"], correctAnswer: "5" },
];
