const ICONS = {
  exam: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h14l6 6v20H6z"/><path d="M20 3v6h6"/><path d="M10 13h12M10 17h12M10 21h8"/><path d="M17 19l4 4m0-4l-4 4" stroke="#dc2626" stroke-width="2.2"/></svg>',
  quiz: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h20v24H6z"/><path d="M10 9h6m-6 5h12m-12 5h8"/><circle cx="21" cy="9" r="1.5" fill="#dc2626" stroke="none"/><path d="M19 19l3 3 5-5" stroke="#dc2626" stroke-width="2.2"/></svg>',
  report: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h16l6 6v18H5z"/><path d="M21 4v6h6"/><text x="10" y="22" font-family="sans-serif" font-weight="900" font-size="12" fill="#dc2626" stroke="none">F</text></svg>',
  attendance: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="6" width="22" height="22" rx="2"/><path d="M5 12h22M11 3v6M21 3v6"/><path d="M11 18l3 3 7-7" stroke="#dc2626" stroke-width="2.2"/></svg>',
  tuition: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="24" height="20" rx="3"/><circle cx="16" cy="16" r="4"/><path d="M16 13v6m-2-4h4"/></svg>',
  gpa: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 26h24M6 8l7 9 6-5 7 11"/><path d="M22 23h4v-4" stroke="#dc2626" stroke-width="2.2"/></svg>',
  lab: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3h8m-4 0v11l6 11a2 2 0 01-1.7 3H9.7a2 2 0 01-1.7-3l6-11V3"/><path d="M10 20h12" stroke="#dc2626"/></svg>',
  student: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="11" r="5"/><path d="M6 27c0-5.5 4.5-8 10-8s10 2.5 10 8"/><path d="M13 10h.01M19 10h.01M13 14s1 2 3 2 3-2 3-2"/></svg>',
  alarm: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="17" r="9"/><path d="M16 12v5l3 2M6 6l3 3M26 6l-3 3M13 28l-2 2M19 28l2 2"/></svg>',
  trick: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="11"/><path d="M16 10v7m0 4h.01" stroke="#dc2626" stroke-width="2.5"/></svg>',
  curve: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 26h24M5 22c5-14 8-16 11-16s6 8 11 16"/></svg>',
  key: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="14" r="5"/><path d="M16 14h11v4m-4-4v3"/></svg>',
  meeting: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="12" r="3"/><circle cx="22" cy="12" r="3"/><path d="M4 25c0-3.3 2.7-5 6-5s6 1.7 6 5M16 25c0-3.3 2.7-5 6-5s6 1.7 6 5"/></svg>',
  textbook: '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6a3 3 0 013-3h18v22H8a3 3 0 00-3 3z"/><path d="M5 24a3 3 0 013-3h18"/><path d="M12 9h8m-8 4h6"/></svg>',
  boss: '<svg viewBox="0 0 32 32" width="34" height="34" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4l4 7h7l-5.5 5 2 7.5L16 19l-7.5 4.5 2-7.5L5 11h7z"/></svg>'
};

const ITEMS = [
  { name: 'FINAL EXAM PAPER', sub: '100 questions of pure pain', hp: 4, type: 'tank', obj: 'folder', iconKey: 'exam', pts: 400 },
  { name: 'POP QUIZ', sub: '"close your books now"', hp: 2, type: 'fast', obj: 'folder', iconKey: 'quiz', pts: 150 },
  { name: 'REPORT CARD', sub: 'sign here or else', hp: 3, type: 'standard', obj: 'folder', iconKey: 'report', pts: 250 },
  { name: 'MANDATORY ATTENDANCE', sub: 'you were sick. nobody cares', hp: 2, type: 'fast', obj: 'folder', iconKey: 'attendance', pts: 200 },
  { name: 'TUITION BILL', sub: '$$$$$', hp: 3, type: 'shielded', obj: 'book', iconKey: 'tuition', pts: 300 },
  { name: 'GPA DROP', sub: 'you are just a number now', hp: 4, type: 'standard', obj: 'folder', iconKey: 'gpa', pts: 350 },
  { name: 'LAB REPORT', sub: 'due at midnight', hp: 2, type: 'fast', obj: 'folder', iconKey: 'lab', pts: 180 },
  { name: 'STRAIGHT-A STUDENT', sub: 'makes it look so easy', hp: 3, type: 'dodger', obj: 'phone', iconKey: 'student', pts: 320 },
  { name: '8 AM LECTURE', sub: 'alarm.exe', hp: 2, type: 'deadline', obj: 'alarm', iconKey: 'alarm', pts: 250, timer: 9 },
  { name: 'TRICK QUESTION', sub: '−1 for guessing', hp: 3, type: 'standard', obj: 'folder', iconKey: 'trick', pts: 280 },
  { name: 'THE GRADE CURVE', sub: 'curved downwards', hp: 3, type: 'standard', obj: 'book', iconKey: 'curve', pts: 260 },
  { name: 'WRONG ANSWER KEY', sub: 'your answer was right. too late.', hp: 2, type: 'fast', obj: 'folder', iconKey: 'key', pts: 220 },
  { name: 'PARENT-TEACHER MEETING', sub: '"great potential, but..."', hp: 3, type: 'standard', obj: 'coffee', iconKey: 'meeting', pts: 270 },
  { name: 'ENDLESS TEXTBOOK', sub: 'chapter 47 of 46', hp: 5, type: 'tank', obj: 'book', iconKey: 'textbook', pts: 450 }
];

const BOSSES = [
  { name: 'MIDTERMS', sub: 'Wave 1 Boss', hp: 20, obj: 'boss', iconKey: 'boss', pts: 1500, wave: 1 },
  { name: 'CLASS RANKING', sub: 'Wave 2 Boss', hp: 26, obj: 'boss', iconKey: 'boss', pts: 2500, wave: 2 },
  { name: 'THE GRADE CURVE', sub: 'Wave 3 Boss', hp: 34, obj: 'boss', iconKey: 'boss', pts: 3500, wave: 3 },
  { name: 'FINAL EXAMS', sub: 'Wave 4 Boss', hp: 42, obj: 'boss', iconKey: 'boss', pts: 4500, wave: 4 },
  { name: 'THE BURNOUT', sub: 'Final Boss', hp: 55, obj: 'boss', iconKey: 'boss', pts: 6000, wave: 5 }
];

const RANKS = [
  [0, 'Stressed Student'],
  [250, 'Tired Student'],
  [700, 'Angry Student'],
  [1400, 'Rebel Student'],
  [2800, 'Chaos Master'],
  [4800, 'Burnout Survivor'],
  [7500, 'Free of the System']
];

const WORDS = ['SMASH!', 'BONK!', 'TAKE THAT!', 'CRUNCH!', 'GOODBYE!', 'NO MORE!', 'BOOM!', 'FREEDOM!'];

const WEAPONS = {
  hammer: {
    name: 'Hammer',
    cursorSvg: '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="#1c1917" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 28l22-22m-18 16l-6 6 3 3 6-6m-3-18l6-6 12 12-6 6-12-12z" fill="#f59e0b"/><rect x="8" y="34" width="8" height="8" rx="2" fill="#57534e"/></svg>',
    dmg: 1,
    cd: 0,
    knockback: false,
    aoe: 0
  },
  bat: {
    name: 'Bat',
    cursorSvg: '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="#1c1917" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M40 8L14 34l-4-2 2-4 26-26 2 6z" fill="#f59e0b"/><path d="M10 36l-3 3 2 2 3-3"/></svg>',
    dmg: 2,
    cd: 240,
    knockback: true,
    aoe: 0
  },
  bomb: {
    name: 'Bomb',
    cursorSvg: '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="#1c1917" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="28" r="14" fill="#1c1917"/><circle cx="18" cy="24" r="3" fill="#fff" stroke="none"/><path d="M30 16l5-5m-2 0c3-1 6 0 7-1"/><circle cx="41" cy="9" r="2.5" fill="#dc2626" stroke="#f59e0b"/></svg>',
    dmg: 4,
    cd: 0,
    knockback: false,
    aoe: 220
  }
};
