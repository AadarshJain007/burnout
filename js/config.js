const DOODLES = {
  skull: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"><path d="M9 16 C9 8, 27 8, 27 16 C27 22, 23 24, 21 26 L15 26 C13 24, 9 22, 9 16 Z"/><circle cx="14" cy="16" r="2" fill="#dc2626"/><circle cx="22" cy="16" r="2" fill="#dc2626"/><line x1="16" y1="23" x2="20" y2="23"/><line x1="16" y1="26" x2="16" y2="29"/><line x1="20" y1="26" x2="20" y2="29"/></svg>',
  warning: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round"><path d="M18 5 L32 30 L4 30 Z"/><line x1="18" y1="13" x2="18" y2="21" stroke-width="2.5"/><circle cx="18" cy="26" r="1.5" fill="#ea580c"/></svg>',
  pen: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round"><path d="M6 30 L10 21 L27 4 L32 9 L15 26 Z"/><line x1="10" y1="21" x2="15" y2="26"/><polygon points="6,30 11,28 8,25" fill="#2563eb"/></svg>',
  rupee: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round"><line x1="10" y1="8" x2="26" y2="8"/><line x1="10" y1="14" x2="23" y2="14"/><path d="M14 8 L14 20 C18 20, 24 19, 24 14 C24 9, 14 9, 14 9"/><line x1="14" y1="19" x2="25" y2="30"/></svg>',
  sweat: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round"><circle cx="17" cy="19" r="11"/><circle cx="13" cy="17" r="1.5" fill="#0284c7"/><circle cx="21" cy="17" r="1.5" fill="#0284c7"/><path d="M14 24 Q17 21 20 24"/><path d="M26 10 C26 7, 30 5, 30 8 C30 12, 26 13, 26 10 Z" fill="#38bdf8"/></svg>',
  highlighter: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#ca8a04" stroke-width="2" stroke-linecap="round"><rect x="10" y="10" width="16" height="18" rx="2" fill="#fef08a"/><polygon points="12,10 18,3 24,10" fill="#ca8a04"/></svg>',
  clock: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="18" r="12"/><line x1="18" y1="18" x2="18" y2="10"/><line x1="18" y1="18" x2="24" y2="20"/><path d="M8 8 L12 5 M28 8 L24 5"/></svg>',
  chai: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#78350f" stroke-width="2" stroke-linecap="round"><path d="M9 12 L12 30 L24 30 L27 12 Z" fill="#fed7aa"/><path d="M13 8 Q14 4 15 2 M18 8 Q19 4 20 2 M23 8 Q24 4 25 2"/><line x1="8" y1="12" x2="28" y2="12"/></svg>',
  cross: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round"><line x1="9" y1="9" x2="27" y2="27"/><line x1="27" y1="9" x2="9" y2="27"/></svg>',
  alert: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="18" r="13"/><path d="M18 10 L18 20"/><circle cx="18" cy="24" r="1.5" fill="#dc2626"/></svg>',
  bug: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#7c3aed" stroke-width="2" stroke-linecap="round"><ellipse cx="18" cy="19" rx="7" ry="9" fill="#ddd6fe"/><line x1="18" y1="10" x2="18" y2="28"/><line x1="8" y1="14" x2="12" y2="16"/><line x1="28" y1="14" x2="24" y2="16"/><line x1="7" y1="20" x2="11" y2="20"/><line x1="29" y1="20" x2="25" y2="20"/><line x1="8" y1="26" x2="12" y2="24"/><line x1="28" y1="26" x2="24" y2="24"/></svg>',
  snake: '<svg viewBox="0 0 36 36" width="30" height="30" fill="none" stroke="#15803d" stroke-width="2.2" stroke-linecap="round"><path d="M10 28 C12 20, 22 28, 24 18 C26 9, 14 10, 14 6"/><circle cx="14" cy="5" r="1.5" fill="#15803d"/></svg>',
  boss: '<svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="20" r="15"/><line x1="13" y1="15" x2="17" y2="17"/><line x1="27" y1="15" x2="23" y2="17"/><circle cx="15" cy="19" r="1.5" fill="#dc2626"/><circle cx="25" cy="19" r="1.5" fill="#dc2626"/><path d="M14 27 Q20 22 26 27"/></svg>'
};

const ITEMS = [
  {
    paperType: 'attendance',
    name: '74.2% Attendance',
    sub: 'HOD: "Rules are rules beta, see you in summer sem."',
    stamp: 'DE-BARRED',
    hp: 2,
    pts: 200,
    doodle: 'warning'
  },
  {
    paperType: 'exam',
    name: 'End-Sem Paper (Out of Syllabus)',
    sub: 'Question 1: Derive entire universe. 40 students staring at ceiling fan.',
    stamp: '0 / 50',
    hp: 4,
    pts: 450,
    doodle: 'skull'
  },
  {
    paperType: 'notebook',
    name: 'Practical File Submission',
    sub: '120 pages handwritten overnight just for 1 red tick mark in 2 seconds.',
    stamp: 'RE-WRITE',
    hp: 3,
    pts: 280,
    doodle: 'pen'
  },
  {
    paperType: 'tuition',
    name: 'Semester Fee Fine',
    sub: 'Pay ₹65,000 + ₹2,000 late fee or portal blocks your admit card.',
    stamp: 'OVERDUE',
    hp: 3,
    pts: 320,
    doodle: 'rupee'
  },
  {
    paperType: 'sticky',
    name: 'Viva with External Examiner',
    sub: '"Tell me difference between Java and JavaScript" *sweating starts*',
    stamp: 'VIVA FAIL',
    hp: 2,
    pts: 220,
    doodle: 'sweat'
  },
  {
    paperType: 'syllabus',
    name: 'Xerox Notes (Module 5)',
    sub: 'Photocopy wala charged ₹40. Entire chapter is font size 5 blurred.',
    stamp: 'UNREAD',
    hp: 3,
    pts: 260,
    doodle: 'highlighter'
  },
  {
    paperType: 'sticky',
    name: '8 AM Lab Proxy Caught',
    sub: 'Attempted proxy for roommate. Both got marked absent + HOD called.',
    stamp: 'CAUGHT',
    hp: 2,
    pts: 240,
    type: 'deadline',
    timer: 8,
    doodle: 'clock'
  },
  {
    paperType: 'notebook',
    name: 'Hostel Mess Menu',
    sub: 'Monday aloo, Tuesday aloo matar, Wednesday existential dread.',
    stamp: 'UNCOOKED',
    hp: 2,
    pts: 180,
    doodle: 'chai'
  },
  {
    paperType: 'exam',
    name: 'Backlog Registration Form',
    sub: '₹1,500 per subject. "Bhai re-evaluation bhar de pakka nikal jayega."',
    stamp: 'REPEAT',
    hp: 3,
    pts: 350,
    doodle: 'cross'
  },
  {
    paperType: 'tuition',
    name: 'Scholarship Portal Timeout',
    sub: 'Government portal crashed at 11:59 PM. Bye bye ₹25,000 reimbursement.',
    stamp: 'REJECTED',
    hp: 3,
    pts: 300,
    doodle: 'alert'
  },
  {
    paperType: 'syllabus',
    name: 'B.Tech Final Year Project',
    sub: 'Copied from 2017 GitHub repo. Praying it compiles on professor laptop.',
    stamp: 'BUGGY',
    hp: 4,
    pts: 400,
    doodle: 'bug'
  },
  {
    paperType: 'sticky',
    name: 'Topper: "I Haven\'t Studied"',
    sub: 'Said "bhai I will fail for sure" then scored 9.8 CGPA and top rank.',
    stamp: '9.8 CGPA',
    hp: 3,
    pts: 320,
    type: 'dodger',
    doodle: 'snake'
  }
];

const BOSSES = [
  {
    paperType: 'exam',
    name: 'STRICT HOD SUMMONS',
    sub: '"Your attendance is 61%. Bring your parents tomorrow 9 AM sharp."',
    stamp: 'SUMMONED',
    hp: 18,
    pts: 1500,
    wave: 1
  },
  {
    paperType: 'sticky',
    name: 'THE EXTERNAL VIVA EXAMINER',
    sub: '"Page 84 open karo. Explain diagram 4.3 without looking at the board."',
    stamp: 'INTERNAL ZERO',
    hp: 24,
    pts: 2400,
    wave: 2
  },
  {
    paperType: 'tuition',
    name: 'ACCOUNTS SECTION BABU',
    sub: '"Lunch time shuru ho gaya. Counter 3 pe jao, wahan bolenge counter 1 pe aao."',
    stamp: 'COUNTER CLOSED',
    hp: 32,
    pts: 3400,
    wave: 3
  },
  {
    paperType: 'syllabus',
    name: 'CAMPUS PLACEMENT CRITERIA',
    sub: '"Criteria: 90% in 10th, 12th, B.Tech & nursery. Package: 3.2 LPA support role."',
    stamp: 'NOT ELIGIBLE',
    hp: 40,
    pts: 4500,
    wave: 4
  },
  {
    paperType: 'exam',
    name: 'THE RAT RACE (SHARMA JI KA BETA)',
    sub: '"Sharma ji ke ladke ne 45 LPA ka off-campus crack kar liya. Tum kya kar rahe ho?"',
    stamp: 'BURNOUT SUPREME',
    hp: 55,
    pts: 6000,
    wave: 5
  }
];

const RANKS = [
  [0, 'First Year Fresher'],
  [300, 'Attendance Defaulter'],
  [800, 'Backlog Warrior'],
  [1600, 'Proxy Master'],
  [3000, 'One-Night Study Legend'],
  [5000, 'Placement Survivor'],
  [8000, 'Degree Holder (Freedom)']
];

const WORDS = ['SMASHED!', 'DHO DAALA!', 'KHATAM!', 'FATAK!', 'DEBARRED!', 'BYE BYE!', 'PASSED!', 'CLEARED!'];

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