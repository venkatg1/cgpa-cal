const add = document.querySelector("#add");
const courseCode = document.querySelector("#course-code");
const internalMarks = document.querySelector("#unit-load");
const externalMarks = document.querySelector("#unit-load1");
const semister = document.querySelector("#semister");
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector("#tfoot");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");
const creditsInput = document.querySelector("#credits-1");
let gpArry = [];

// Function to determine grade based on marks
function calculateGrade(marks) {
  if (marks >= 90 && marks <= 100) {
    return 'O';
  } else if (marks >= 80) {
    return 'A+';
  } else if (marks >= 70) {
    return 'A';
  } else if (marks >= 60) {
    return 'B+';
  } else if (marks >= 50) {
    return 'B';
  } else if (marks >= 40) {
    return 'C';
  } else {
    return 'Fail';
  }
}

add.addEventListener("click", () => {
  if (
    courseCode.value === "" ||
    internalMarks.value <= 0 ||
    externalMarks.value <= 0 ||
    creditsInput.value <= 0 ||
    semister.selectedIndex === 0
  ) {
    alert("Wrong input, check and try again");
  } else {
    const tr = document.createElement("tr");
    const tdCourseCode = document.createElement("td");
    tdCourseCode.innerHTML = courseCode.value;
    const totalMarks = parseInt(internalMarks.value) + parseInt(externalMarks.value);
    const tdTotalMarks = document.createElement("td");
    tdTotalMarks.innerHTML = totalMarks;
    const credits = totalMarks > 40 ? creditsInput.value : 0;
    const tdCredits = document.createElement("td");
    tdCredits.innerHTML = `${credits} Credits`;
    const grade = calculateGrade(totalMarks);
    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = grade;
    tr.appendChild(tdCourseCode);
    tr.appendChild(tdTotalMarks);
    tr.appendChild(tdCredits);
    tr.appendChild(tdGrade);
    tbody.appendChild(tr);
    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    clear.classList.remove("display-none");
    gpArry.push({
      internalMarks: internalMarks.value,
      externalMarks: externalMarks.value,
      semister: semister.options[semister.selectedIndex].text,
      grade: grade,
      credits: credits,
    });
    console.log(gpArry);
    courseCode.value = "";
    internalMarks.value = "";
    externalMarks.value = "";
    creditsInput.value = "";
    semister.selectedIndex = 0;
  }
});

calcGp.addEventListener("click", () => {
  let totalCredits = 0;
  let totalGradePoints = 0;

  gpArry.forEach((result) => {
    const totalMarks = parseInt(result.internalMarks) + parseInt(result.externalMarks);
    const credits = totalMarks > 40 ? parseInt(result.credits) : 0;

    totalCredits += credits;
    switch (result.grade) {
      case 'O':
        totalGradePoints += 10 * credits;
        break;
      case 'A+':
        totalGradePoints += 9 * credits;
        break;
      case 'A':
        totalGradePoints += 8 * credits;
        break;
      case 'B+':
        totalGradePoints += 7 * credits;
        break;
      case 'B':
        totalGradePoints += 6 * credits;
        break;
      case 'C':
        totalGradePoints += 0 * credits;
        break;
      default:
        break;
    }
  });

  const tr = document.createElement("tr");

  const tdTotalUnitLoad = document.createElement("td");
  tdTotalUnitLoad.innerHTML = `Total Credits: ${totalCredits}`;

  const gpa = totalGradePoints / totalCredits || 0; // Avoid division by zero
  const tdGpa = document.createElement("td");
  tdGpa.setAttribute("colspan", "3");
  tdGpa.innerHTML = `Your GPA is ${gpa.toFixed(2)}`;

  tr.appendChild(tdTotalUnitLoad);
  tr.appendChild(tdGpa);

  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }
  tfoot.appendChild(tr);
});

clear.addEventListener("click", () => {
  gpArry = [];
  tbody.querySelectorAll("*").forEach((child) => child.remove());
  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }

  table.classList.add("display-none");
  calcGp.classList.add("display-none");
  clear.classList.add("display-none");
});
