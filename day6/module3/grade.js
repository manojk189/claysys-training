const students = [];

    function addStudent() {
      const nameInput = document.getElementById("studentName");
      const gradeInput = document.getElementById("studentGrade");

      const name = nameInput.value.trim();
      const grade = parseFloat(gradeInput.value);

      // Validation
      if (name === "") {
        alert("Please enter a student name.");
        return;
      }
      if (isNaN(grade) || grade < 0 || grade > 100) {
        alert("Please enter a valid grade between 0 and 100.");
        return;
      }

      students.push({ name, grade });

      // Clear inputs
      nameInput.value = "";
      gradeInput.value = "";

      alert("Student added successfully.");
    }

    function displayGrades() {
      const studentList = document.getElementById("studentList");
      studentList.innerHTML = "";

      if (students.length === 0) {
        studentList.innerHTML = "<li>No students added yet.</li>";
        return;
      }

      students.forEach((student, index) => {
        const li = document.createElement("li");
        li.textContent = `${student.name} - ${student.grade}`;
        studentList.appendChild(li);
      });
    }

    function calculateAverage() {
      const averageDisplay = document.getElementById("averageGrade");

      if (students.length === 0) {
        averageDisplay.textContent = "Average Grade: N/A";
        return;
      }

      const total = students.reduce((sum, student) => sum + student.grade, 0);
      const average = (total / students.length).toFixed(2);

      averageDisplay.textContent = `Average Grade: ${average}`;
    }
