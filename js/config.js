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
    name: '75% Minimum Attendance Notice',
    sub: 'Principal: "You missed 4 days with fever. Bring parents to school tomorrow."',
    stamp: 'DE-BARRED',
    hp: 2,
    pts: 200,
    doodle: 'warning'
  },
  {
    paperType: 'exam',
    name: '12th Board Physics Paper',
    sub: 'Question 4: Derive entire electromagnetism for 3 marks. Everyone staring at ceiling.',
    stamp: 'GRADE F',
    hp: 4,
    pts: 450,
    doodle: 'skull'
  },
  {
    paperType: 'notebook',
    name: 'Chemistry Practical Record',
    sub: 'Copied 70 pages from the topper during lunch break just for one red signature.',
    stamp: 'RE-WRITE',
    hp: 3,
    pts: 280,
    doodle: 'pen'
  },
  {
    paperType: 'tuition',
    name: 'Coaching Institute Test Series',
    sub: 'Sunday 6 AM mock exam. Scored 14 out of 300 in Organic Chemistry.',
    stamp: 'RANK 482',
    hp: 3,
    pts: 320,
    doodle: 'calculator'
  },
  {
    paperType: 'sticky',
    name: 'Diary Note for Parents',
    sub: 'Teacher: "Your child was found staring out the classroom window during Calculus."',
    stamp: 'SIGN HERE',
    hp: 2,
    pts: 220,
    doodle: 'sweat'
  },
  {
    paperType: 'syllabus',
    name: 'Maths Sample Question Paper',
    sub: 'Problem 1: "Find x". I can not even find the motivation to turn page 2.',
    stamp: 'UNSOLVED',
    hp: 3,
    pts: 260,
    doodle: 'highlighter'
  },
  {
    paperType: 'sticky',
    name: 'Surprise Morning Unit Test',
    sub: '"Close all notebooks and keep bags outside. 20 algebra questions in 15 minutes."',
    stamp: 'POP QUIZ',
    hp: 2,
    pts: 240,
    type: 'deadline',
    timer: 8,
    doodle: 'clock'
  },
  {
    paperType: 'notebook',
    name: 'Biology Diagram Homework',
    sub: 'Spent 3 hours drawing human heart with gel pen. Teacher wrote "Untidy" across page.',
    stamp: 'RE-DRAW',
    hp: 2,
    pts: 180,
    doodle: 'cross'
  },
  {
    paperType: 'exam',
    name: 'Pre-Board Result Sheet',
    sub: 'Passed English, failed Physics and Maths. Currently hiding paper under mattress.',
    stamp: 'DETENTION',
    hp: 3,
    pts: 350,
    doodle: 'alert'
  },
  {
    paperType: 'tuition',
    name: 'Tuition Center Homework Sheet',
    sub: '60 trigonometry proofs due by 5 PM. Brain currently operating at 2% capacity.',
    stamp: 'OVERDUE',
    hp: 3,
    pts: 300,
    doodle: 'calculator'
  },
  {
    paperType: 'syllabus',
    name: 'Science Exhibition Project Model',
    sub: 'Volcano model made at 3 AM using cardboard, baking soda, and red watercolor.',
    stamp: 'COLLAPSED',
    hp: 4,
    pts: 400,
    doodle: 'alert'
  },
  {
    paperType: 'sticky',
    name: 'Class Topper: "I Did Not Study"',
    sub: 'Claims they slept all night without opening book, then scores 99 out of 100.',
    stamp: '99 / 100',
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
    sub: 'No formula sheets allowed. 15 questions in 30 minutes. Solve now.',
    stamp: 'TIME UP',
    hp: 18,
    pts: 1500,
    wave: 1
  },
  {
    paperType: 'sticky',
    name: 'THE STRICT PRINCIPAL',
    sub: 'Walking slowly down the corridor with hands behind back, looking into class.',
    stamp: 'DETENTION',
    hp: 24,
    pts: 2400,
    wave: 2
  },
  {
    paperType: 'tuition',
    name: 'PARENT-TEACHER MEETING (PTM)',
    sub: '"Your child has good potential, but gets distracted and talks constantly in class."',
    stamp: 'COMPLAINT',
    hp: 32,
    pts: 3400,
    wave: 3
  },
  {
    paperType: 'syllabus',
    name: 'THE PRE-BOARD EXAMS',
    sub: 'Strict external invigilator tapping pen on desk every 5 seconds.',
    stamp: 'FAILED',
    hp: 40,
    pts: 4500,
    wave: 4
  },
  {
    paperType: 'exam',
    name: '12TH BOARD FINAL EXAM',
    sub: 'Rolled-up admit card, barcode stickers, seal broken. Answer everything.',
    stamp: 'BOARD EXAM',
    hp: 55,
    pts: 6000,
    wave: 5
  }
];

const RANKS = [
  [0, 'Backbencher'],
  [300, 'Average Student'],
  [800, 'Crammer'],
  [1600, 'Coaching Survivor'],
  [3000, 'Honor Roll Contender'],
  [5000, 'Class Topper'],
  [8000, 'Board Exam Legend']
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