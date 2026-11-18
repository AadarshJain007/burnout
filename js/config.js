const ITEMS = [
  { name: 'ENTRANCE EXAM PAPER', sub: '90 questions of pure pain', hp: 4, type: 'tank', obj: 'folder', icon: '📝', pts: 400 },
  { name: 'SURPRISE TEST', sub: '"just a small one"', hp: 2, type: 'fast', obj: 'folder', icon: '📄', pts: 150 },
  { name: 'REPORT CARD', sub: 'sign here, beta', hp: 3, type: 'standard', obj: 'folder', icon: '📑', pts: 250 },
  { name: 'ATTENDANCE 75%', sub: 'you were sick. nobody cares', hp: 2, type: 'fast', obj: 'folder', icon: '🥶', pts: 200 },
  { name: 'COACHING FEE', sub: '₹₹₹₹₹', hp: 3, type: 'shielded', obj: 'book', icon: '💸', pts: 300 },
  { name: 'RANK LIST', sub: 'you are a number now', hp: 4, type: 'standard', obj: 'folder', icon: '📉', pts: 350 },
  { name: 'PRACTICAL FILE', sub: 'due yesterday', hp: 2, type: 'fast', obj: 'folder', icon: '📁', pts: 180 },
  { name: 'TOPPER NEIGHBOUR KID', sub: 'topped. again.', hp: 3, type: 'dodger', obj: 'phone', icon: '🤡', pts: 320 },
  { name: 'MONDAY 6 AM', sub: 'alarm.exe', hp: 2, type: 'deadline', obj: 'alarm', icon: '⏰', pts: 250, timer: 9 },
  { name: 'NEGATIVE MARKING', sub: '−1 for being brave', hp: 3, type: 'standard', obj: 'folder', icon: '❌', pts: 280 },
  { name: 'THE CUTOFF', sub: 'went up by 5 marks', hp: 3, type: 'standard', obj: 'book', icon: '📊', pts: 260 },
  { name: 'ANSWER KEY', sub: 'your answer was right. too late.', hp: 2, type: 'fast', obj: 'folder', icon: '🗝️', pts: 220 },
  { name: 'PTM', sub: '"he is intelligent but..."', hp: 3, type: 'standard', obj: 'coffee', icon: '☕', pts: 270 },
  { name: 'ENDLESS SYLLABUS', sub: 'chapter 47 of 46', hp: 5, type: 'tank', obj: 'book', icon: '📚', pts: 450 }
];

const BOSSES = [
  { name: 'BOARD EXAM', sub: 'Wave 1 Boss', hp: 20, obj: 'boss', icon: '🏛️', pts: 1500, wave: 1 },
  { name: 'FINAL RANK', sub: 'Wave 2 Boss', hp: 26, obj: 'boss', icon: '👑', pts: 2500, wave: 2 },
  { name: 'THE CUTOFF', sub: 'Wave 3 Boss', hp: 34, obj: 'boss', icon: '📉', pts: 3500, wave: 3 },
  { name: 'ENTRANCE EXAM', sub: 'Wave 4 Boss', hp: 42, obj: 'boss', icon: '👹', pts: 4500, wave: 4 },
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
  'Your marks do not define you.',
  'Breathe. Then smash.',
  'Nobody remembers the rank list in 10 years.',
  'Rage is a valid study break.',
  'You are more than a percentile.',
  'Paper is cheap. Your sanity is not.'
];

const WORDS = ['SMASH!', 'BONK!', 'TAKE THAT!', 'CRUNCH!', 'GOODBYE!', 'NO MORE!', 'BOOM!', 'FREEDOM!'];

const WEAPONS = {
  hammer: { name: 'Hammer', icon: '🔨', dmg: 1, cd: 0, knockback: false, aoe: 0 },
  bat: { name: 'Bat', icon: '🏏', dmg: 2, cd: 240, knockback: true, aoe: 0 },
  bomb: { name: 'Bomb', icon: '💣', dmg: 4, cd: 0, knockback: false, aoe: 220 }
};
