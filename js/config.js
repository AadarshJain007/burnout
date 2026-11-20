const DOODLES = {
  skull: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"><path d="M9 16 C9 8, 27 8, 27 16 C27 22, 23 24, 21 26 L15 26 C13 24, 9 22, 9 16 Z"/><circle cx="14" cy="16" r="2" fill="#dc2626"/><circle cx="22" cy="16" r="2" fill="#dc2626"/><line x1="16" y1="23" x2="20" y2="23"/><line x1="16" y1="26" x2="16" y2="29"/><line x1="20" y1="26" x2="20" y2="29"/></svg>',
  warning: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round"><path d="M18 5 L32 30 L4 30 Z"/><line x1="18" y1="13" x2="18" y2="21" stroke-width="2.5"/><circle cx="18" cy="26" r="1.5" fill="#ea580c"/></svg>',
  pen: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round"><path d="M6 30 L10 21 L27 4 L32 9 L15 26 Z"/><line x1="10" y1="21" x2="15" y2="26"/><polygon points="6,30 11,28 8,25" fill="#2563eb"/></svg>',
  rupee: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round"><line x1="10" y1="8" x2="26" y2="8"/><line x1="10" y1="14" x2="23" y2="14"/><path d="M14 8 L14 20 C18 20, 24 19, 24 14 C24 9, 14 9, 14 9"/><line x1="14" y1="19" x2="25" y2="30"/></svg>',
  sweat: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round"><circle cx="17" cy="19" r="11"/><circle cx="13" cy="17" r="1.5" fill="#0284c7"/><circle cx="21" cy="17" r="1.5" fill="#0284c7"/><path d="M14 24 Q17 21 20 24"/><path d="M26 10 C26 7, 30 5, 30 8 C30 12, 26 13, 26 10 Z" fill="#38bdf8"/></svg>',
  highlighter: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#ca8a04" stroke-width="2" stroke-linecap="round"><rect x="10" y="10" width="16" height="18" rx="2" fill="#fef08a"/><polygon points="12,10 18,3 24,10" fill="#ca8a04"/></svg>',
  clock: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="18" r="12"/><line x1="18" y1="18" x2="18" y2="10"/><line x1="18" y1="18" x2="24" y2="20"/><path d="M8 8 L12 5 M28 8 L24 5"/></svg>',
  cross: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round"><line x1="9" y1="9" x2="27" y2="27"/><line x1="27" y1="9" x2="9" y2="27"/></svg>',
  alert: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="18" r="13"/><path d="M18 10 L18 20"/><circle cx="18" cy="24" r="1.5" fill="#dc2626"/></svg>',
  star: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round"><polygon points="18,3 22,13 33,14 24,21 27,32 18,25 9,32 12,21 3,14 14,13" fill="#fef08a"/></svg>',
  calculator: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"><rect x="8" y="5" width="20" height="26" rx="3"/><line x1="12" y1="10" x2="24" y2="10"/><circle cx="13" cy="16" r="1.5"/><circle cx="18" cy="16" r="1.5"/><circle cx="23" cy="16" r="1.5"/><circle cx="13" cy="21" r="1.5"/><circle cx="18" cy="21" r="1.5"/><circle cx="23" cy="21" r="1.5"/></svg>',
  boss: '<svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="20" r="15"/><line x1="13" y1="15" x2="17" y2="17"/><line x1="27" y1="15" x2="23" y2="17"/><circle cx="15" cy="19" r="1.5" fill="#dc2626"/><circle cx="25" cy="19" r="1.5" fill="#dc2626"/><path d="M14 27 Q20 22 26 27"/></svg>'
};

const ITEMS = [
  {
    paperType: 'attendance',
    name: '75% Attendance Warning',
    sub: 'Attendance dropped to 68%. Parents summoned to principal office.',
    stamp: 'SHORTAGE',
    hp: 2,
    pts: 200,
    doodle: 'warning'
  },
  {
    paperType: 'exam',
    name: '12th Board Physics Paper',
    sub: 'Section C has 5-mark derivations and nobody studied ray optics.',
    stamp: 'FAIL',
    hp: 4,
    pts: 450,
    doodle: 'skull'
  },
  {
    paperType: 'notebook',
    name: 'Chemistry Practical Record',
    sub: 'Copied 40 pages of salt analysis from topper during lunch break.',
    stamp: 'RE-WRITE',
    hp: 3,
    pts: 280,
    doodle: 'pen'
  },
  {
    paperType: 'tuition',
    name: 'Coaching Center Mock Test',
    sub: 'Sunday morning 3-hour test. Scored 18 out of 300 in organic chemistry.',
    stamp: 'RANK 842',
    hp: 3,
    pts: 320,
    doodle: 'calculator'
  },
  {
    paperType: 'sticky',
    name: 'School Diary Remark',
    sub: 'Teacher signed in red ink: "Failed to bring maths textbook for 3rd time."',
    stamp: 'SIGN HERE',
    hp: 2,
    pts: 220,
    doodle: 'sweat'
  },
  {
    paperType: 'syllabus',
    name: 'Maths Sample Question Paper',
    sub: 'Integration by parts. 3 pages of rough work, zero final answer.',
    stamp: 'UNSOLVED',
    hp: 3,
    pts: 260,
    doodle: 'highlighter'
  },
  {
    paperType: 'sticky',
    name: 'Surprise Unit Test',
    sub: 'Close books and keep bags outside. 10 questions in 15 minutes.',
    stamp: 'SURPRISE TEST',
    hp: 2,
    pts: 240,
    type: 'deadline',
    timer: 8,
    doodle: 'clock'
  },
  {
    paperType: 'notebook',
    name: 'Biology Diagram Assignment',
    sub: 'Spent 2 hours drawing human eye with gel pen. Teacher wrote "Untidy".',
    stamp: 'RE-DRAW',
    hp: 2,
    pts: 180,
    doodle: 'cross'
  },
  {
    paperType: 'exam',
    name: 'Pre-Board Result Sheet',
    sub: 'Physics: 19/70. Maths: 22/80. Need parent signature before tomorrow.',
    stamp: 'FAIL',
    hp: 3,
    pts: 350,
    doodle: 'alert'
  },
  {
    paperType: 'tuition',
    name: 'Tuition Homework Sheet',
    sub: '50 trigonometry problems due before 5 PM class.',
    stamp: 'DUE TODAY',
    hp: 3,
    pts: 300,
    doodle: 'calculator'
  },
  {
    paperType: 'syllabus',
    name: 'Physics Investigatory Project',
    sub: 'Full-wave rectifier model made with cardboard. Circuit does not turn on.',
    stamp: 'REJECTED',
    hp: 4,
    pts: 400,
    doodle: 'alert'
  },
  {
    paperType: 'sticky',
    name: 'Class Topper Notes',
    sub: 'Claimed they never opened the book, then scored 98 out of 100.',
    stamp: '98 / 100',
    hp: 3,
    pts: 320,
    type: 'dodger',
    doodle: 'star'
  }
];

const BOSSES = [
  {
    paperType: 'exam',
    name: 'SURPRISE UNIT TEST',
    sub: '15 questions in 20 minutes. Blank answer sheet.',
    stamp: 'TIME UP',
    hp: 18,
    pts: 1500,
    wave: 1
  },
  {
    paperType: 'sticky',
    name: 'THE STRICT PRINCIPAL',
    sub: 'Walking down the corridor checking every classroom.',
    stamp: 'SUSPENDED',
    hp: 24,
    pts: 2400,
    wave: 2
  },
  {
    paperType: 'tuition',
    name: 'PARENT-TEACHER MEETING (PTM)',
    sub: 'Teachers discussing your marks with your parents right now.',
    stamp: 'REMARKS',
    hp: 32,
    pts: 3400,
    wave: 3
  },
  {
    paperType: 'syllabus',
    name: 'THE PRE-BOARD EXAMS',
    sub: 'External examiner checking roll numbers at the door.',
    stamp: 'FAILED',
    hp: 40,
    pts: 4500,
    wave: 4
  },
  {
    paperType: 'exam',
    name: '12TH BOARD FINAL EXAM',
    sub: 'Admit card verified. 3 hours on the clock. Finish the paper.',
    stamp: 'BOARD EXAM',
    hp: 55,
    pts: 6000,
    wave: 5
  }
];

const RANKS = [
  [0, 'Backbencher'],
  [300, 'Just Passing (33%)'],
  [800, 'Average Scorer'],
  [1600, 'First Division'],
  [3000, 'Class Topper'],
  [5000, 'School Ranker'],
  [8000, 'State Rank 1']
];

const WORDS = ['SMASHED!', 'CRUSHED!', 'CANCELLED!', 'PASSED!', 'NO HOMEWORK!', 'ACE!', 'BOOM!', 'FREEDOM!'];

const WEAPONS = {
  hammer: {
    name: 'Hammer',
    cursorSvg: '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="#1c1917" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 28l22-22m-18 16l-6 6 3 3 6-6m-3-18l6-6 12 12-6 6-12-12z" fill="#f59e0b"/><rect x="8" y="34" width="8" height="8" rx="2" fill="#475569"/></svg>',
    dmg: 1,
    cd: 0,
    knockback: false,
    aoe: 0,
    shake: 12
  },
  bat: {
    name: 'Bat',
    cursorSvg: '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="#1c1917" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M40 8L14 34l-4-2 2-4 26-26 2 6z" fill="#d97706"/><line x1="14" y1="34" x2="8" y2="40" stroke="#ef4444" stroke-width="4"/><circle cx="7" cy="41" r="2" fill="#ef4444"/></svg>',
    dmg: 2,
    cd: 220,
    knockback: true,
    aoe: 0,
    shake: 7
  },
  bomb: {
    name: 'Bomb',
    cursorSvg: '<svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="#1c1917" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="22" cy="28" r="14" fill="#1e293b"/><circle cx="18" cy="24" r="3" fill="#fff" opacity="0.6"/><path d="M30 16 C33 12, 38 12, 40 8" stroke="#78350f" stroke-width="3"/><circle cx="40" cy="8" r="2.5" fill="#f59e0b"/><line x1="40" y1="5" x2="42" y2="2" stroke="#dc2626" stroke-width="2"/></svg>',
    dmg: 4,
    cd: 0,
    knockback: false,
    aoe: 230,
    shake: 18
  }
};