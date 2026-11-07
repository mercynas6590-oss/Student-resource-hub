import { User, Resource, EBook, CampusEvent, Opportunity, NotificationItem } from '../types';

export const initialStudentUser: User = {
  id: 'usr_maya_2026',
  name: 'Maya Lin',
  email: 'maya.lin@campus.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  university: 'Metropolitan Institute of Technology',
  major: 'Computer Science & Cognitive AI',
  gradYear: 2026,
  studentId: 'STU-882194',
  savedResourceIds: ['res_cs301_notes', 'ebk_algorithms_cormen'],
  rsvpdEventIds: ['evt_hackathon_2026', 'evt_ai_symposium']
};

export const initialAdminUser: User = {
  id: 'usr_faculty_chen',
  name: 'Prof. Marcus Chen, Ph.D.',
  email: 'marcus.chen@faculty.campus.edu',
  role: 'faculty',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  university: 'Metropolitan Institute of Technology',
  major: 'Faculty of Engineering & Dean of Student Affairs',
  gradYear: 2008,
  studentId: 'FAC-00142',
  savedResourceIds: [],
  rsvpdEventIds: []
};

export const sampleResources: Resource[] = [
  {
    id: 'res_cs301_notes',
    title: 'Distributed Systems & Raft Consensus Complete Lecture Notes',
    courseCode: 'CS 301',
    courseName: 'Distributed Operating Systems',
    department: 'Computer Science',
    category: 'lecture_notes',
    fileType: 'PDF',
    fileSize: '4.8 MB',
    downloads: 1420,
    rating: 4.9,
    reviewsCount: 88,
    uploadDate: 'October 14, 2026',
    uploadedBy: {
      name: 'T.A. Elena Rostova',
      role: 'Head Teaching Assistant',
      verified: true
    },
    semester: 'Fall 2026',
    pages: 42,
    description: 'Comprehensive handwritten & typed lecture notes covering Byzantine fault tolerance, Vector Clocks, CAP theorem, Paxos vs Raft consensus, and gRPC implementations.',
    tags: ['Distributed Systems', 'Consensus', 'Raft', 'Midterm Prep'],
    sampleContentSnippet: `CHAPTER 4: RAFT CONSENSUS ALGORITHM
====================================
1. Fundamental State Machine Replication
- In distributed environments, servers maintain identical replicated logs across leader-follower quorums.
- Raft decomposes consensus into 3 independent subproblems:
  a. Leader Election: randomized election timers (150ms-300ms) prevent split votes.
  b. Log Replication: Leader receives client commands, appends entry, propagates AppendEntries RPCs.
  c. Safety: An entry is committed once replicated on a majority of cluster nodes.`
  },
  {
    id: 'res_cs210_exam',
    title: 'Midterm & Final Examination Archive (2024-2026) with Verified Solutions',
    courseCode: 'CS 210',
    courseName: 'Data Structures & Algorithms',
    department: 'Computer Science',
    category: 'past_exam',
    fileType: 'PDF',
    fileSize: '6.2 MB',
    downloads: 2890,
    rating: 4.95,
    reviewsCount: 164,
    uploadDate: 'November 2, 2026',
    uploadedBy: {
      name: 'Prof. Marcus Chen',
      role: 'Course Director',
      verified: true
    },
    semester: 'Spring 2026',
    pages: 36,
    description: 'Official department past exams including step-by-step master method proofs, red-black tree rotation traces, dynamic programming matrices, and graph shortest path optimizations.',
    tags: ['Past Exam', 'Verified Solutions', 'Algorithms', 'Trees & Graphs'],
    sampleContentSnippet: `EXAM SOLUTION KEY: PROBLEM 3 (DYNAMIC PROGRAMMING)
===================================================
Subproblem: Let DP[i][w] be max value achievable with items 1..i and weight limit w.
Base Case: DP[0][w] = 0 for all w >= 0.
Recurrence:
  DP[i][w] = DP[i-1][w] if weight[i] > w
  DP[i][w] = max(DP[i-1][w], DP[i-1][w - weight[i]] + value[i])
Time Complexity: O(n * W) pseudo-polynomial. Space optimized to O(W) using single row rollback.`
  },
  {
    id: 'res_math240_guide',
    title: 'Linear Algebra, Eigenvalues & SVD Ultimate Cram Sheet',
    courseCode: 'MATH 240',
    courseName: 'Applied Linear Algebra',
    department: 'Mathematics',
    category: 'study_guide',
    fileType: 'PDF',
    fileSize: '2.1 MB',
    downloads: 1845,
    rating: 4.88,
    reviewsCount: 79,
    uploadDate: 'September 28, 2026',
    uploadedBy: {
      name: 'Julian Vance (Peer Tutor)',
      role: 'Math Honor Society Lead',
      verified: true
    },
    semester: 'Fall 2026',
    pages: 14,
    description: 'High-density visual study guide with matrix decomposition shortcuts, orthogonal projections, Gram-Schmidt walkthroughs, and geometric interpretations of determinant transformations.',
    tags: ['Linear Algebra', 'SVD', 'Eigenvalues', 'Formula Sheet'],
    sampleContentSnippet: `SINGULAR VALUE DECOMPOSITION (SVD): A = U Σ V^T
==============================================
- U: m x m orthogonal matrix whose columns are left singular vectors (eigenvectors of A A^T).
- Σ: m x n diagonal matrix with singular values sigma_1 >= sigma_2 >= ... >= 0.
- V: n x n orthogonal matrix whose columns are right singular vectors (eigenvectors of A^T A).
Applications in PCA: First k columns of V span principal subspace capturing maximum variance.`
  },
  {
    id: 'res_bio210_lab',
    title: 'CRISPR-Cas9 Gene Editing Lab Protocol & Gel Electrophoresis Analysis',
    courseCode: 'BIO 210',
    courseName: 'Molecular Cell Biology & Genetics',
    department: 'Bioengineering',
    category: 'lab_manual',
    fileType: 'PDF',
    fileSize: '8.4 MB',
    downloads: 930,
    rating: 4.82,
    reviewsCount: 42,
    uploadDate: 'October 19, 2026',
    uploadedBy: {
      name: 'Dr. Sarah Al-Mansoor',
      role: 'Lab Director',
      verified: true
    },
    semester: 'Fall 2026',
    pages: 28,
    description: 'Official molecular laboratory bench handbook including pipetting protocols, single guide RNA (sgRNA) design criteria, PCR amplifications, and spectrophotometric DNA quantitation curves.',
    tags: ['CRISPR', 'Lab Manual', 'Genetics', 'Protocols'],
    sampleContentSnippet: `LAB MODULE 3: sgRNA INCUBATION & TARGET CLEAVAGE
=================================================
1. Reconstitute synthetic Cas9 endonuclease to 100 nM in 1X NEB rCutSmart buffer.
2. Mix 1 uL Cas9 with 1.5 uL annealed guide RNA; incubate at 25°C for 10 min to form RNP complex.
3. Introduce 200 ng target PCR amplicon; digest at 37°C for 45 min.
4. Quench reaction by adding 1 uL Proteinase K and heat inactivating at 65°C for 15 min.`
  },
  {
    id: 'res_econ102_notes',
    title: 'IS-LM Curve & Monetary Policy Framework Lecture Summaries',
    courseCode: 'ECON 102',
    courseName: 'Macroeconomic Principles & Policy',
    department: 'Economics',
    category: 'lecture_notes',
    fileType: 'PDF',
    fileSize: '3.3 MB',
    downloads: 1210,
    rating: 4.75,
    reviewsCount: 56,
    uploadDate: 'October 25, 2026',
    uploadedBy: {
      name: 'Chloe Tremblay',
      role: 'Economics Student Association',
      verified: true
    },
    semester: 'Fall 2026',
    pages: 22,
    description: 'Crisp diagrams and real-world central bank policy cases explaining Keynesian multipliers, Phillips Curve shifts, liquidity traps, and fiscal stimulus modeling.',
    tags: ['Macroeconomics', 'IS-LM', 'Central Banking', 'Exam Prep'],
    sampleContentSnippet: `MONETARY TRANSMISSION MECHANISM:
==================================
Open Market Purchase of T-Bills -> Bank Reserves Increase -> Federal Funds Rate Declines
-> Commercial Lending Rates Ease -> Capital Expenditure & Housing Investment Expand (I increases)
-> Aggregate Demand (AD) shifts right -> Short-Run Real Output (Y) rises toward full potential.`
  },
  {
    id: 'res_ee105_syllabus',
    title: 'Circuit Analysis & Semiconductor Physics Course Syllabus & Problem Sets',
    courseCode: 'EE 105',
    courseName: 'Fundamentals of Electrical Circuits',
    department: 'Electrical Engineering',
    category: 'syllabus',
    fileType: 'PDF',
    fileSize: '1.9 MB',
    downloads: 740,
    rating: 4.7,
    reviewsCount: 31,
    uploadDate: 'September 5, 2026',
    uploadedBy: {
      name: 'Prof. David K. O\'Connor',
      role: 'Chair of Electrical Eng.',
      verified: true
    },
    semester: 'Fall 2026',
    pages: 18,
    description: 'Complete 15-week course map, grading breakdowns, laboratory rubrics, SPICE simulation assignments, and Fourier frequency response homework problem sets with guidelines.',
    tags: ['Syllabus', 'Problem Sets', 'Circuit Analysis', 'SPICE'],
    sampleContentSnippet: `COURSE BREAKDOWN & WEIGHTING:
- Weekly Laboratory Experiments (Hardware): 25%
- Midterm 1 (Kirchhoff\'s Laws & Thevenin Equivalents): 20%
- Midterm 2 (AC Phasor Analysis & Op-Amps): 20%
- Comprehensive Capstone Final Exam: 35%`
  }
];

export const sampleEBooks: EBook[] = [
  {
    id: 'ebk_algorithms_cormen',
    title: 'Introduction to Algorithms (Collegiate Edition)',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest',
    edition: '4th Campus Licensed Edition',
    isbn: '978-0262046305',
    coverGradient: 'from-blue-600 to-indigo-900',
    department: 'Computer Science',
    pages: 1312,
    rating: 4.9,
    fileSize: '42.5 MB',
    downloads: 4830,
    publishedYear: 2024,
    overview: 'The definitive universal textbook on algorithms, data structures, divide-and-conquer strategies, greedy paradigms, dynamic programming, and computational complexity.',
    chapters: [
      'Role of Algorithms in Computing',
      'Divide-and-Conquer Recurrences',
      'Probabilistic Analysis & Randomized Algorithms',
      'Advanced Data Structures: B-Trees & Fibonacci Heaps',
      'Graph Algorithms & Maximum Flow Networks',
      'NP-Completeness and Approximation Algorithms'
    ]
  },
  {
    id: 'ebk_operating_systems',
    title: 'Operating Systems: Three Easy Pieces',
    author: 'Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau',
    edition: '1.10 Open Academic Edition',
    isbn: '978-1985086593',
    coverGradient: 'from-amber-600 to-orange-950',
    department: 'Computer Science',
    pages: 720,
    rating: 4.92,
    fileSize: '18.4 MB',
    downloads: 3920,
    publishedYear: 2025,
    overview: 'A lucid, witty, and deeply rigorous treatment of virtualization (CPU & memory), concurrency (locks, condition variables, semaphores), and persistence (file systems & crash consistency).',
    chapters: [
      'Dialogue on Virtualization',
      'Address Spaces & Paging Translation',
      'Concurrency: Mutual Exclusion & Spinlocks',
      'Semaphores & Condition Variables',
      'Persistence: I/O Devices & Hard Drives',
      'File System Implementation & FSCK Journaling'
    ]
  },
  {
    id: 'ebk_linear_algebra_strang',
    title: 'Linear Algebra and Its Applications',
    author: 'Gilbert Strang',
    edition: '5th Revised Global Edition',
    isbn: '978-0030105678',
    coverGradient: 'from-emerald-600 to-teal-950',
    department: 'Mathematics',
    pages: 608,
    rating: 4.88,
    fileSize: '24.1 MB',
    downloads: 3150,
    publishedYear: 2023,
    overview: 'Renowned introduction illustrating the Four Fundamental Subspaces, projections, eigenvalues, positive definite matrices, and Fourier series transformations.',
    chapters: [
      'Vectors and Linear Combinations',
      'Solving Linear Equations: Elimination & LU Factorization',
      'Vector Spaces, Subspaces, and Dimension',
      'Orthogonality and Least Squares Regression',
      'Eigenvalues, Eigenvectors, and Matrix Powers',
      'Singular Value Decomposition (SVD) and Pseudoinverses'
    ]
  },
  {
    id: 'ebk_microeconomics_varian',
    title: 'Intermediate Microeconomics: A Modern Approach',
    author: 'Hal R. Varian',
    edition: '9th Academic Edition',
    isbn: '978-0393123968',
    coverGradient: 'from-rose-600 to-red-950',
    department: 'Economics',
    pages: 840,
    rating: 4.79,
    fileSize: '29.8 MB',
    downloads: 2410,
    publishedYear: 2024,
    overview: 'Analytical examination of consumer choice, utility maximization, game theory equilibria, monopoly pricing, externalities, and general competitive equilibrium.',
    chapters: [
      'The Budget Constraint and Consumer Preferences',
      'Utility Functions and Marginal Rate of Substitution',
      'Slutsky Equation: Income vs Substitution Effects',
      'Strategic Interaction and Nash Equilibrium',
      'Asymmetric Information: Adverse Selection & Moral Hazard'
    ]
  }
];

export const sampleEvents: CampusEvent[] = [
  {
    id: 'evt_hackathon_2026',
    title: 'Campus Hackathon 2026: AI for Sustainable Cities',
    category: 'Hackathon',
    organizer: 'ACM Student Chapter & Google Cloud Student Club',
    date: 'Friday, Nov 14 – Sunday, Nov 16, 2026',
    time: '6:00 PM (48 Hours)',
    location: 'Engineering Commons & Innovation Pavilion (Hall A)',
    attendeesCount: 340,
    maxCapacity: 450,
    description: 'Annual campus hackathon featuring $15,000 in student prizes, industry mentors from Google and OpenAI, free gourmet food, midnight workshops, and hardware loaner desks.',
    isVirtual: false,
    tags: ['Coding', 'Hackathon', 'Prizes', 'Team Building']
  },
  {
    id: 'evt_career_roundtable',
    title: 'Dean’s STEM Career & Tech Internship Roundtable',
    category: 'Career',
    organizer: 'University Career & Professional Development Center',
    date: 'Wednesday, Nov 12, 2026',
    time: '4:00 PM – 7:00 PM',
    location: 'Student Union Center, Grand Ballroom 2',
    attendeesCount: 215,
    maxCapacity: 300,
    description: 'Meet senior engineering managers, alumni founders, and talent recruiters from leading tech firms, biotech labs, and clean-energy startups offering Summer 2027 internships.',
    isVirtual: false,
    tags: ['Career Fair', 'Networking', 'Internships', 'Alumni']
  },
  {
    id: 'evt_ai_symposium',
    title: 'Frontiers in Neural Science & LLM Safety Research Seminar',
    category: 'Academic',
    organizer: 'Dept. of Computer Science & Brain Cognitive Institute',
    date: 'Thursday, Nov 13, 2026',
    time: '2:30 PM – 4:00 PM',
    location: 'Science Auditorium (Room 101) + Live Stream',
    attendeesCount: 180,
    maxCapacity: 250,
    description: 'Guest lecture by visiting Stanford and MIT research fellows discussing mechanist interpretability, hallucination boundaries, and safe autonomous agent reasoning.',
    isVirtual: true,
    tags: ['Research', 'AI Ethics', 'Keynote', 'Faculty']
  },
  {
    id: 'evt_wellness_fest',
    title: 'Midterm Calm: Therapy Dogs & Mindfulness Workshop',
    category: 'Social',
    organizer: 'Campus Student Wellbeing Services & Peer Mentors',
    date: 'Tuesday, Nov 11, 2026',
    time: '11:00 AM – 3:00 PM',
    location: 'Central Quad Lawn (Rain Site: Rec Hall)',
    attendeesCount: 420,
    maxCapacity: 500,
    description: 'Take a restorative study break before midterms with certified emotional support dogs, free matcha latte bar, guided breathwork sessions, and free exam care packages.',
    isVirtual: false,
    tags: ['Mental Health', 'Wellness', 'Free Coffee', 'Pets']
  },
  {
    id: 'evt_robotics_demo',
    title: 'Autonomous Rover & Quadruped Robotics Demo Day',
    category: 'Club',
    organizer: 'IEEE Robotics & Mechatronics Society',
    date: 'Saturday, Nov 15, 2026',
    time: '1:00 PM – 4:30 PM',
    location: 'MakerSpace Courtyard & Testing Arena',
    attendeesCount: 165,
    maxCapacity: 200,
    description: 'Watch student-built bipedal robots, lidar terrain navigation vehicles, and autonomous racing drones compete on the obstacle test course.',
    isVirtual: false,
    tags: ['Robotics', 'Hardware', 'MakerSpace', 'Demo']
  }
];

export const sampleOpportunities: Opportunity[] = [
  {
    id: 'opp_quantum_fellowship',
    title: 'Undergraduate Quantum Computing Research Assistantship',
    organization: 'National Laboratory for Applied Quantum Science',
    type: 'Research Assistantship',
    location: 'Campus Physics Complex (Lab 3B)',
    stipend: '$24.50 / hr (15-20 hrs/week)',
    deadline: 'December 1, 2026',
    department: 'Physics & Computer Science',
    description: 'Work alongside post-doctoral scientists on superconducting qubit calibration and quantum circuit simulation with Python and Qiskit.',
    requirements: ['Sophomore standing or above', 'Proficiency in Python/C++', 'Completion of Linear Algebra (MATH 240)'],
    applyLink: 'https://campus.edu/research/quantum-fellows'
  },
  {
    id: 'opp_tech_intern',
    title: 'Software Engineering Summer 2027 Co-Op / Internship',
    organization: 'Apex Aerospace & Satellite Dynamics',
    type: 'Internship',
    location: 'Tech Innovation Park & Hybrid',
    stipend: '$45.00 / hr + Housing Relocation',
    deadline: 'November 30, 2026',
    department: 'Computer Science & Aerospace',
    description: 'Build real-time ground telemetry pipelines, orbital mechanics simulation engines, and distributed streaming backend microservices.',
    requirements: ['CS, CE, or Math Majors', 'Strong understanding of data structures', 'Familiarity with Git and Linux'],
    applyLink: 'https://apexastro.com/careers/interns'
  },
  {
    id: 'opp_ta_math',
    title: 'Peer Learning Assistant / Teaching Assistant: Calculus II',
    organization: 'Department of Mathematics',
    type: 'Campus Job',
    location: 'Academic Tutoring Center',
    stipend: '$19.00 / hr (10 hrs/week)',
    deadline: 'December 10, 2026',
    department: 'Mathematics',
    description: 'Lead two weekly problem-solving recitations, hold drop-in office hours, and assist professors with homework formatting and grading.',
    requirements: ['Grade of A- or higher in MATH 141/142', 'Good communication skills', 'Full-time student status'],
    applyLink: 'https://campus.edu/math/ta-applications'
  }
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'New Verified Solution Uploaded',
    message: 'Prof. Marcus Chen uploaded the 2026 Final Exam Solution Key for CS 210.',
    timestamp: '25m ago',
    read: false,
    type: 'academic'
  },
  {
    id: 'notif_2',
    title: 'Hackathon Registration Confirmed',
    message: 'You are RSVP\'d for Campus Hackathon 2026! Check in at Hall A at 5:30 PM.',
    timestamp: '2h ago',
    read: false,
    type: 'event'
  },
  {
    id: 'notif_3',
    title: 'Quantum Fellowship Applications Open',
    message: 'Research Assistantship applications for Spring 2027 close on Dec 1.',
    timestamp: '1d ago',
    read: true,
    type: 'opportunity'
  }
];
