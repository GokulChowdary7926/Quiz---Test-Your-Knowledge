export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export const allQuizQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: 'Which is the longest river in the world?',
    options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: 'What is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: 'What is the highest mountain in the world?',
    options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Mount Fuji'],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: 'Which continent is the largest by land area?',
    options: ['Africa', 'North America', 'Asia', 'Europe'],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: 'Which country is known as the Land of the Rising Sun?',
    options: ['China', 'South Korea', 'Japan', 'Thailand'],
    correctAnswer: 2,
  },
  {
    id: 13,
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Diamond', 'Platinum', 'Iron'],
    correctAnswer: 1,
  },
  {
    id: 14,
    question: 'Which ocean is the smallest?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: 'What is the speed of light?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s'],
    correctAnswer: 0,
  },
  {
    id: 17,
    question: 'Which is the largest desert in the world?',
    options: ['Gobi Desert', 'Sahara Desert', 'Antarctic Desert', 'Arabian Desert'],
    correctAnswer: 2,
  },
  {
    id: 18,
    question: 'What is the capital of Brazil?',
    options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Buenos Aires'],
    correctAnswer: 2,
  },
  {
    id: 19,
    question: 'Which gas makes up most of Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 2,
  },
]

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, Math.min(count, allQuizQuestions.length))
  return selected.map((q, index) => ({
    ...q,
    id: index + 1,
  }))
}
