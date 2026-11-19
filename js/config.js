const ITEMS = [
  { name: 'FINAL EXAM PAPER', sub: '100 questions of pure pain', hp: 4, type: 'tank', obj: 'folder', icon: '📝', pts: 400 },
  { name: 'POP QUIZ', sub: '"close your books now"', hp: 2, type: 'fast', obj: 'folder', icon: '📄', pts: 150 },
  { name: 'REPORT CARD', sub: 'sign here or else', hp: 3, type: 'standard', obj: 'folder', icon: '📑', pts: 250 },
  { name: 'MANDATORY ATTENDANCE', sub: 'you were sick. nobody cares', hp: 2, type: 'fast', obj: 'folder', icon: '🥶', pts: 200 },
  { name: 'TUITION BILL', sub: '$$$$$', hp: 3, type: 'shielded', obj: 'book', icon: '💸', pts: 300 },
  { name: 'GPA DROP', sub: 'you are just a number now', hp: 4, type: 'standard', obj: 'folder', icon: '📉', pts: 350 },
  { name: 'LAB REPORT', sub: 'due at midnight', hp: 2, type: 'fast', obj: 'folder', icon: '📁', pts: 180 },
  { name: 'STRAIGHT-A STUDENT', sub: 'makes it look so easy', hp: 3, type: 'dodger', obj: 'phone', icon: '🤡', pts: 320 },
  { name: '8 AM LECTURE', sub: 'alarm.exe', hp: 2, type: 'deadline', obj: 'alarm', icon: '⏰', pts: 250, timer: 9 },
  { name: 'TRICK QUESTION', sub: '−1 for guessing', hp: 3, type: 'standard', obj: 'folder', icon: '❌', pts: 280 },
  { name: 'THE GRADE CURVE', sub: 'curved downwards', hp: 3, type: 'standard', obj: 'book', icon: '📊', pts: 260 },
  { name: 'WRONG ANSWER KEY', sub: 'your answer was right. too late.', hp: 2, type: 'fast', obj: 'folder', icon: '🗝️', pts: 220 },
  { name: 'PARENT-TEACHER MEETING', sub: '"great potential, but..."', hp: 3, type: 'standard', obj: 'coffee', icon: '☕', pts: 270 },
  { name: 'ENDLESS TEXTBOOK', sub: 'chapter 47 of 46', hp: 5, type: 'tank', obj: 'book', icon: '📚', pts: 450 }
];

const BOSSES = [
  { name: 'MIDTERMS', sub: 'Wave 1 Boss', hp: 20, obj: 'boss', icon: '🏛️', pts: 1500, wave: 1 },
  { name: 'CLASS RANKING', sub: 'Wave 2 Boss', hp: 26, obj: 'boss', icon: '👑', pts: 2500, wave: 2 },
  { name: 'THE GRADE CURVE', sub: 'Wave 3 Boss', hp: 34, obj: 'boss', icon: '📉', pts: 3500, wave: 3 },
  { name: 'FINAL EXAMS', sub: 'Wave 4 Boss', hp: 42, obj: 'boss', icon: '👹', pts: 4500, wave: 4 },
  { name: 'THE RAT RACE', sub: 'Final Boss', hp: 55, obj: 'boss', icon: '⚡', pts: 6000, wave: 5 }
];

const RANKS = [
  [0, 'Stressed Rat'],
  [250, 'Tired Rat'],
  [700, 'Angry Rat'],
  [1400, 'Rebel Rat'],
  [2800, 'Chaos Rat'],
  [4800, 'Rat King'],
  [7500, 'Escaped the Race 🏆']
];

const QUOTES = [
  'Your grades do not define you.',
  'Breathe. Then smash.',
  'Nobody remembers your GPA in 10 years.',
  'Rage is a valid study break.',
  'You are more than a test score.',
  'Paper is cheap. Your sanity is not.'
];

const WORDS = ['SMASH!', 'BONK!', 'TAKE THAT!', 'CRUNCH!', 'GOODBYE!', 'NO MORE!', 'BOOM!', 'FREEDOM!'];

const WEAPONS = {
  hammer: { name: 'Hammer', icon: '🔨', dmg: 1, cd: 0, knockback: false, aoe: 0 },
  bat: { name: 'Bat', icon: '🏏', dmg: 2, cd: 240, knockback: true, aoe: 0 },
  bomb: { name: 'Bomb', icon: '💣', dmg: 4, cd: 0, knockback: false, aoe: 220 }
};
