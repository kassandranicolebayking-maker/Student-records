/* ============================================================
   Student Records Data Processor
   Pure vanilla JavaScript — no HTML, no Node-specific APIs.
   Runs in any JS playground (replit.com, jsitor.com,
   programiz.com/javascript/online-compiler, browser console, etc.)
   ============================================================ */

/* ------------------------------------------------------------
   1. DATA — 30 hardcoded student records
   ------------------------------------------------------------ */
const students = [
  { id: 1,  name: "Ava Santos",     year: 1, course: "Computer Science", grades: [88, 92, 79, 95],     enrolled: true  },
  { id: 2,  name: "Liam Cruz",      year: 2, course: "Computer Science", grades: [72, 68, 75],         enrolled: true  },
  { id: 3,  name: "Maya Reyes",     year: 1, course: "Mathematics",      grades: [95, 91, 98, 100],    enrolled: true  },
  { id: 4,  name: "Noah Garcia",    year: 3, course: "Mathematics",      grades: [60, 55, 70],         enrolled: false },
  { id: 5,  name: "Zoe Fernandez",  year: 2, course: "Biology",          grades: [85, 89, 83],         enrolled: true  },
  { id: 6,  name: "Ethan Torres",   year: 4, course: "Biology",          grades: [77, 80],             enrolled: true  },
  { id: 7,  name: "Mia Ramos",      year: 1, course: "Computer Science", grades: [90, 87, 93],         enrolled: true  },
  { id: 8,  name: "Lucas Dela Cruz",year: 3, course: "Physics",          grades: [65, 70, 68],         enrolled: false },
  { id: 9,  name: "Sofia Mendoza",  year: 2, course: "Physics",          grades: [99, 96, 94],         enrolled: true  },
  { id: 10, name: "Gabriel Ocampo", year: 1, course: "Chemistry",        grades: [58, 62, 60],         enrolled: true  },
  { id: 11, name: "Isabella Ramos", year: 4, course: "Chemistry",        grades: [82, 85, 88, 90],     enrolled: true  },
  { id: 12, name: "Daniel Villar",  year: 2, course: "Mathematics",      grades: [45, 50, 55],         enrolled: false },
  { id: 13, name: "Chloe Aquino",   year: 3, course: "Computer Science", grades: [91, 94, 89],         enrolled: true  },
  { id: 14, name: "Miguel Bautista",year: 1, course: "Biology",          grades: [73, 76, 71],         enrolled: true  },
  { id: 15, name: "Emma Castillo",  year: 4, course: "Physics",          grades: [88, 84, 92],         enrolled: true  },
  { id: 16, name: "Rafael Domingo", year: 2, course: "Chemistry",        grades: [67, 69, 71],         enrolled: true  },
  { id: 17, name: "Nadia Espiritu", year: 3, course: "Mathematics",      grades: [93, 97, 90],         enrolled: true  },
  { id: 18, name: "Diego Flores",   year: 1, course: "Computer Science", grades: [55, 60, 58],         enrolled: false },
  { id: 19, name: "Camila Guerrero",year: 2, course: "Biology",          grades: [80, 82, 79, 85],     enrolled: true  },
  { id: 20, name: "Marco Herrera",  year: 4, course: "Chemistry",        grades: [76, 74, 78],         enrolled: true  },
  { id: 21, name: "Valentina Ilagan",year:1, course: "Physics",          grades: [],                   enrolled: true  },
  { id: 22, name: "Andres Jimenez", year: 3, course: "Computer Science", grades: [86, 88, 90],         enrolled: true  },
  { id: 23, name: "Elena Katigbak", year: 2, course: "Mathematics",      grades: [70, 72, 74],         enrolled: false },
  { id: 24, name: "Joaquin Lopez",  year: 1, course: "Chemistry",        grades: [92, 95, 91],         enrolled: true  },
  { id: 25, name: "Paula Manalo",   year: 4, course: "Biology",          grades: [64, 66, 62],         enrolled: true  },
  { id: 26, name: "Sergio Navarro", year: 3, course: "Physics",          grades: [81, 79, 83],         enrolled: true  },
  { id: 27, name: "Teresa Ocampo",  year: 2, course: "Computer Science", grades: [97, 99, 95],         enrolled: true  },
  { id: 28, name: "Victor Pascual", year: 1, course: "Mathematics",      grades: [59, 61, 63],         enrolled: false },
  { id: 29, name: "Ximena Quimson", year: 4, course: "Chemistry",        grades: [87, 89, 85],         enrolled: true  },
  { id: 30, name: "Yusuf Ramirez",  year: 3, course: "Biology",          grades: [78, 80, 82],         enrolled: true  },
  { id: 31, name: "Zara Salazar",   year: 2, course: "Physics",          grades: [90, 92, 88, 94],     enrolled: true  },
];

/* ------------------------------------------------------------
   2. CORE FUNCTIONS
   ------------------------------------------------------------ */

/**
 * Returns a student's average grade.
 * Handles a student with no grades by returning 0.
 */
function getAverageGrade(student) {
  if (!student || !Array.isArray(student.grades) || student.grades.length === 0) {
    return 0;
  }
  const total = student.grades.reduce((sum, g) => sum + g, 0);
  return total / student.grades.length;
}

/**
 * Returns the top n students sorted by average grade, descending.
 * Does not mutate the original array. Validates n.
 */
function getTopStudents(students, n) {
  if (!Array.isArray(students)) {
    throw new Error("getTopStudents: 'students' must be an array.");
  }
  if (typeof n !== "number" || Number.isNaN(n) || n < 0) {
    throw new Error("getTopStudents: 'n' must be a non-negative number.");
  }
  if (students.length === 0) return [];

  const withAverages = students.map((s) => ({
    ...s,
    averageGrade: getAverageGrade(s),
  }));

  const sorted = withAverages.sort((a, b) => b.averageGrade - a.averageGrade);
  return sorted.slice(0, n);
}

/**
 * Groups students by their course field.
 * Returns a new object; original array/objects untouched.
 */
function groupByCourse(students) {
  if (!Array.isArray(students)) {
    throw new Error("groupByCourse: 'students' must be an array.");
  }
  return students.reduce((groups, student) => {
    const course = student.course || "Unspecified";
    if (!groups[course]) {
      groups[course] = [];
    }
    groups[course] = [...groups[course], student];
    return groups;
  }, {});
}

/**
 * Returns a count of enrolled vs. not-enrolled students.
 */
function getEnrolledCount(students) {
  if (!Array.isArray(students)) {
    throw new Error("getEnrolledCount: 'students' must be an array.");
  }
  const enrolled = students.filter((s) => s.enrolled === true).length;
  const notEnrolled = students.filter((s) => s.enrolled === false).length;
  return { enrolled, notEnrolled };
}

/**
 * Case-insensitive search for a student by name.
 * Returns the matching student object, or null if not found.
 */
function findStudent(students, name) {
  if (!Array.isArray(students)) {
    throw new Error("findStudent: 'students' must be an array.");
  }
  if (typeof name !== "string" || name.trim() === "") {
    return null;
  }
  const target = name.trim().toLowerCase();
  const found = students.filter(
    (s) => typeof s.name === "string" && s.name.toLowerCase() === target
  );
  return found.length > 0 ? found[0] : null;
}

/**
 * Returns the average grade per course, sorted highest to lowest.
 * Result: array of { course, average } objects (easy to read/print).
 */
function getCourseAverages(students) {
  if (!Array.isArray(students)) {
    throw new Error("getCourseAverages: 'students' must be an array.");
  }
  const grouped = groupByCourse(students);

  const averages = Object.keys(grouped).map((course) => {
    const group = grouped[course];
    const total = group.reduce((sum, s) => sum + getAverageGrade(s), 0);
    return { course, average: group.length > 0 ? total / group.length : 0 };
  });

  return averages.sort((a, b) => b.average - a.average);
}

/**
 * Builds a single summary object with overall stats.
 */
function exportSummary(students) {
  if (!Array.isArray(students)) {
    throw new Error("exportSummary: 'students' must be an array.");
  }
  if (students.length === 0) {
    return {
      totalStudents: 0,
      overallAverage: 0,
      topStudent: null,
      courseBreakdown: [],
    };
  }

  const totalStudents = students.length;
  const overallAverage =
    students.reduce((sum, s) => sum + getAverageGrade(s), 0) / totalStudents;
  const topStudent = getTopStudents(students, 1)[0] || null;
  const courseBreakdown = getCourseAverages(students);

  return { totalStudents, overallAverage, topStudent, courseBreakdown };
}

/* ------------------------------------------------------------
   3. STRETCH GOALS
   ------------------------------------------------------------ */

/**
 * Returns only students in a given year level.
 */
function filterByYear(students, year) {
  if (!Array.isArray(students)) {
    throw new Error("filterByYear: 'students' must be an array.");
  }
  if (typeof year !== "number" || year <= 0) {
    throw new Error("filterByYear: 'year' must be a positive number.");
  }
  return students.filter((s) => s.year === year);
}

/**
 * Returns students sorted alphabetically by name.
 */
function sortByName(students) {
  if (!Array.isArray(students)) {
    throw new Error("sortByName: 'students' must be an array.");
  }
  return [...students].sort((a, b) => a.name.localeCompare(b.name));
}

/* ------------------------------------------------------------
   4. HELPERS FOR PRINTING
   ------------------------------------------------------------ */

function fmt(num) {
  return Number(num).toFixed(2);
}

function printDivider(title) {
  console.log("\n" + "=".repeat(50));
  console.log(title);
  console.log("=".repeat(50));
}

/* ------------------------------------------------------------
   5. MAIN — runs everything and prints a labeled report
   ------------------------------------------------------------ */

function main() {
  printDivider("STUDENT RECORDS ANALYSIS REPORT");

  console.log(`Total students in dataset: ${students.length}`);

  // --- Overall average grade ---
  const overallAverage =
    students.reduce((sum, s) => sum + getAverageGrade(s), 0) / students.length;
  console.log(`Overall average grade: ${fmt(overallAverage)}`);

  // --- Enrollment counts ---
  printDivider("ENROLLMENT STATUS");
  const enrollment = getEnrolledCount(students);
  console.log(`Enrolled:     ${enrollment.enrolled}`);
  console.log(`Not enrolled: ${enrollment.notEnrolled}`);

  // --- Top 5 students ---
  printDivider("TOP 5 STUDENTS (by average grade)");
  const top5 = getTopStudents(students, 5);
  top5.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name} — ${fmt(s.averageGrade)} (${s.course}, Year ${s.year})`);
  });

  // --- Course averages ---
  printDivider("AVERAGE GRADE BY COURSE (highest to lowest)");
  const courseAverages = getCourseAverages(students);
  courseAverages.forEach((c) => {
    console.log(`${c.course}: ${fmt(c.average)}`);
  });

  // --- Group by course (counts) ---
  printDivider("STUDENT COUNT PER COURSE");
  const grouped = groupByCourse(students);
  Object.keys(grouped).forEach((course) => {
    console.log(`${course}: ${grouped[course].length} student(s)`);
  });

  // --- findStudent demo ---
  printDivider("FIND STUDENT DEMO");
  const searchHit = findStudent(students, "sofia mendoza");
  console.log(
    `Search "sofia mendoza" ->`,
    searchHit ? `${searchHit.name} (${searchHit.course})` : "Not found"
  );

  const searchMiss = findStudent(students, "Nonexistent Person");
  console.log(
    `Search "Nonexistent Person" ->`,
    searchMiss === null ? "Not found (null returned correctly)" : searchMiss
  );

  // --- Student with no grades (edge case) ---
  printDivider("EDGE CASE: STUDENT WITH NO GRADES");
  const noGradesStudent = findStudent(students, "Valentina Ilagan");
  console.log(
    `${noGradesStudent.name} has ${noGradesStudent.grades.length} grades. ` +
      `Average: ${fmt(getAverageGrade(noGradesStudent))}`
  );

  // --- Empty array edge case ---
  printDivider("EDGE CASE: EMPTY STUDENT ARRAY");
  console.log("getTopStudents([], 3) ->", JSON.stringify(getTopStudents([], 3)));
  console.log("groupByCourse([]) ->", JSON.stringify(groupByCourse([])));
  console.log("getEnrolledCount([]) ->", JSON.stringify(getEnrolledCount([])));
  console.log("getCourseAverages([]) ->", JSON.stringify(getCourseAverages([])));
  console.log("exportSummary([]) ->", JSON.stringify(exportSummary([])));

  // --- Invalid input edge case (stretch: validation) ---
  printDivider("EDGE CASE: INVALID INPUT TO getTopStudents");
  try {
    getTopStudents(students, -2);
  } catch (err) {
    console.log(`Caught expected error: ${err.message}`);
  }

  // --- filterByYear stretch demo ---
  printDivider("STRETCH: FILTER BY YEAR (Year 1)");
  const year1Students = filterByYear(students, 1);
  console.log(`Year 1 students: ${year1Students.length}`);
  year1Students.forEach((s) => console.log(` - ${s.name}`));

  // --- sortByName stretch demo ---
  printDivider("STRETCH: SORT BY NAME (first 5 shown)");
  const alphabetical = sortByName(students);
  alphabetical.slice(0, 5).forEach((s) => console.log(` - ${s.name}`));

  // --- Full summary object ---
  printDivider("EXPORT SUMMARY OBJECT");
  const summary = exportSummary(students);
  console.log(`Total students: ${summary.totalStudents}`);
  console.log(`Overall average: ${fmt(summary.overallAverage)}`);
  console.log(
    `Top student: ${summary.topStudent.name} (${fmt(summary.topStudent.averageGrade)})`
  );
  console.log("Course breakdown:");
  summary.courseBreakdown.forEach((c) => {
    console.log(`   ${c.course}: ${fmt(c.average)}`);
  });

  // --- Proof original array was never mutated ---
  printDivider("SANITY CHECK: ORIGINAL ARRAY UNCHANGED");
  console.log(`students.length is still: ${students.length}`);
  console.log(`students[0] still has no 'averageGrade' key: ${!("averageGrade" in students[0])}`);

  printDivider("END OF REPORT");
}

main();