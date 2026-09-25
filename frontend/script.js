// API Configuration
const API_URL = 'http://localhost:3000/api';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('departmentForm').addEventListener('submit', addDepartment);
    document.getElementById('studentForm').addEventListener('submit', addStudent);
    document.getElementById('courseForm').addEventListener('submit', addCourse);
    document.getElementById('enrollmentForm').addEventListener('submit', addEnrollment);
    document.getElementById('gradeForm').addEventListener('submit', addGrade);
    document.getElementById('modalForm').addEventListener('submit', handleModalSubmit);
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');

    // Load data for the section
    if (sectionId === 'departments') {
        loadDepartments();
    } else if (sectionId === 'students') {
        loadStudents();
        loadDepartmentsForSelect('studentDept');
    } else if (sectionId === 'courses') {
        loadCourses();
        loadDepartmentsForSelect('courseDept');
    } else if (sectionId === 'enrollments') {
        loadEnrollments();
        loadStudentsForSelect('enrollStudent');
        loadCoursesForSelect('enrollCourse');
    } else if (sectionId === 'grades') {
        loadGrades();
        loadEnrollmentsForSelect('gradeEnrollment');
    } else if (sectionId === 'dashboard') {
        loadDashboard();
    }
}

// Alert Message
function showAlert(message, type = 'success') {
    const alertEl = document.getElementById('alert');
    alertEl.textContent = message;
    alertEl.className = `alert show ${type}`;
    setTimeout(() => {
        alertEl.classList.remove('show');
    }, 3000);
}

// ==================== DEPARTMENTS ====================

function loadDepartments() {
    fetch(`${API_URL}/departments`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#departmentsTable tbody');
            tbody.innerHTML = '';
            data.forEach(dept => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${dept.DepartmentID}</td>
                    <td>${dept.DepartmentName}</td>
                    <td>${dept.HeadOfDepartment || 'N/A'}</td>
                    <td class="actions">
                        <button onclick="editDepartment(${dept.DepartmentID})" class="btn btn-small btn-primary">Edit</button>
                        <button onclick="deleteDepartment(${dept.DepartmentID})" class="btn btn-small btn-danger">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => showAlert('Error loading departments: ' + err, 'error'));
}

function addDepartment(e) {
    e.preventDefault();
    const data = {
        DepartmentName: document.getElementById('deptName').value,
        HeadOfDepartment: document.getElementById('deptHead').value
    };
    
    fetch(`${API_URL}/departments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        showAlert('Department added successfully!');
        document.getElementById('departmentForm').reset();
        loadDepartments();
    })
    .catch(err => showAlert('Error adding department: ' + err, 'error'));
}

function editDepartment(id) {
    fetch(`${API_URL}/departments/${id}`)
        .then(res => res.json())
        .then(dept => {
            const fields = document.getElementById('modalFields');
            fields.innerHTML = `
                <input type="hidden" id="editId" value="${id}">
                <input type="text" id="editDeptName" value="${dept.DepartmentName}" placeholder="Department Name">
                <input type="text" id="editDeptHead" value="${dept.HeadOfDepartment || ''}" placeholder="Head of Department">
            `;
            document.getElementById('modalTitle').textContent = 'Edit Department';
            window.currentEdit = {
                type: 'department',
                id: id
            };
            document.getElementById('modal').classList.add('show');
        })
        .catch(err => showAlert('Error fetching department: ' + err, 'error'));
}

function deleteDepartment(id) {
    if (confirm('Are you sure you want to delete this department?')) {
        fetch(`${API_URL}/departments/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                showAlert('Department deleted successfully!');
                loadDepartments();
            })
            .catch(err => showAlert('Error deleting department: ' + err, 'error'));
    }
}

function loadDepartmentsForSelect(selectId) {
    fetch(`${API_URL}/departments`)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectId);
            const currentValue = select.value;
            select.innerHTML = '<option value="">Select Department</option>';
            data.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.DepartmentID;
                option.textContent = dept.DepartmentName;
                select.appendChild(option);
            });
            select.value = currentValue;
        })
        .catch(err => console.error('Error loading departments: ' + err));
}

// ==================== STUDENTS ====================

function loadStudents() {
    fetch(`${API_URL}/students`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#studentsTable tbody');
            tbody.innerHTML = '';
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.StudentID}</td>
                    <td>${student.FirstName} ${student.LastName}</td>
                    <td>${student.Email}</td>
                    <td>${student.Phone || 'N/A'}</td>
                    <td>${student.DepartmentName || 'N/A'}</td>
                    <td class="actions">
                        <button onclick="editStudent(${student.StudentID})" class="btn btn-small btn-primary">Edit</button>
                        <button onclick="deleteStudent(${student.StudentID})" class="btn btn-small btn-danger">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => showAlert('Error loading students: ' + err, 'error'));
}

function addStudent(e) {
    e.preventDefault();
    const data = {
        FirstName: document.getElementById('firstName').value,
        LastName: document.getElementById('lastName').value,
        Email: document.getElementById('email').value,
        Phone: document.getElementById('phone').value,
        DateOfBirth: document.getElementById('dateOfBirth').value,
        Address: document.getElementById('address').value,
        DepartmentID: document.getElementById('studentDept').value
    };
    
    fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        showAlert('Student added successfully!');
        document.getElementById('studentForm').reset();
        loadStudents();
    })
    .catch(err => showAlert('Error adding student: ' + err, 'error'));
}

function editStudent(id) {
    fetch(`${API_URL}/students/${id}`)
        .then(res => res.json())
        .then(student => {
            const fields = document.getElementById('modalFields');
            fields.innerHTML = `
                <input type="hidden" id="editId" value="${id}">
                <input type="text" id="editFirstName" value="${student.FirstName}" placeholder="First Name">
                <input type="text" id="editLastName" value="${student.LastName}" placeholder="Last Name">
                <input type="email" id="editEmail" value="${student.Email}" placeholder="Email">
                <input type="tel" id="editPhone" value="${student.Phone || ''}" placeholder="Phone">
                <input type="date" id="editDateOfBirth" value="${student.DateOfBirth || ''}">
                <input type="text" id="editAddress" value="${student.Address || ''}" placeholder="Address">
            `;
            document.getElementById('modalTitle').textContent = 'Edit Student';
            window.currentEdit = {
                type: 'student',
                id: id
            };
            document.getElementById('modal').classList.add('show');
        })
        .catch(err => showAlert('Error fetching student: ' + err, 'error'));
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        fetch(`${API_URL}/students/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                showAlert('Student deleted successfully!');
                loadStudents();
            })
            .catch(err => showAlert('Error deleting student: ' + err, 'error'));
    }
}

function loadStudentsForSelect(selectId) {
    fetch(`${API_URL}/students`)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">Select Student</option>';
            data.forEach(student => {
                const option = document.createElement('option');
                option.value = student.StudentID;
                option.textContent = `${student.FirstName} ${student.LastName}`;
                select.appendChild(option);
            });
        })
        .catch(err => console.error('Error loading students: ' + err));
}

// ==================== COURSES ====================

function loadCourses() {
    fetch(`${API_URL}/courses`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#coursesTable tbody');
            tbody.innerHTML = '';
            data.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.CourseID}</td>
                    <td>${course.CourseCode}</td>
                    <td>${course.CourseName}</td>
                    <td>${course.Credits}</td>
                    <td>${course.DepartmentName || 'N/A'}</td>
                    <td class="actions">
                        <button onclick="editCourse(${course.CourseID})" class="btn btn-small btn-primary">Edit</button>
                        <button onclick="deleteCourse(${course.CourseID})" class="btn btn-small btn-danger">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => showAlert('Error loading courses: ' + err, 'error'));
}

function addCourse(e) {
    e.preventDefault();
    const data = {
        CourseName: document.getElementById('courseName').value,
        CourseCode: document.getElementById('courseCode').value,
        Credits: document.getElementById('credits').value,
        DepartmentID: document.getElementById('courseDept').value
    };
    
    fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        showAlert('Course added successfully!');
        document.getElementById('courseForm').reset();
        loadCourses();
    })
    .catch(err => showAlert('Error adding course: ' + err, 'error'));
}

function editCourse(id) {
    fetch(`${API_URL}/courses/${id}`)
        .then(res => res.json())
        .then(course => {
            const fields = document.getElementById('modalFields');
            fields.innerHTML = `
                <input type="hidden" id="editId" value="${id}">
                <input type="text" id="editCourseName" value="${course.CourseName}" placeholder="Course Name">
                <input type="text" id="editCourseCode" value="${course.CourseCode}" placeholder="Course Code">
                <input type="number" id="editCredits" value="${course.Credits}" placeholder="Credits">
            `;
            document.getElementById('modalTitle').textContent = 'Edit Course';
            window.currentEdit = {
                type: 'course',
                id: id
            };
            document.getElementById('modal').classList.add('show');
        })
        .catch(err => showAlert('Error fetching course: ' + err, 'error'));
}

function deleteCourse(id) {
    if (confirm('Are you sure you want to delete this course?')) {
        fetch(`${API_URL}/courses/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                showAlert('Course deleted successfully!');
                loadCourses();
            })
            .catch(err => showAlert('Error deleting course: ' + err, 'error'));
    }
}

function loadCoursesForSelect(selectId) {
    fetch(`${API_URL}/courses`)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">Select Course</option>';
            data.forEach(course => {
                const option = document.createElement('option');
                option.value = course.CourseID;
                option.textContent = `${course.CourseCode} - ${course.CourseName}`;
                select.appendChild(option);
            });
        })
        .catch(err => console.error('Error loading courses: ' + err));
}

// ==================== ENROLLMENTS ====================

function loadEnrollments() {
    fetch(`${API_URL}/enrollments`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#enrollmentsTable tbody');
            tbody.innerHTML = '';
            data.forEach(enrollment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${enrollment.EnrollmentID}</td>
                    <td>${enrollment.StudentName}</td>
                    <td>${enrollment.CourseName}</td>
                    <td>${enrollment.EnrollmentDate}</td>
                    <td>${enrollment.Semester || 'N/A'}</td>
                    <td>${enrollment.AcademicYear || 'N/A'}</td>
                    <td class="actions">
                        <button onclick="editEnrollment(${enrollment.EnrollmentID})" class="btn btn-small btn-primary">Edit</button>
                        <button onclick="deleteEnrollment(${enrollment.EnrollmentID})" class="btn btn-small btn-danger">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => showAlert('Error loading enrollments: ' + err, 'error'));
}

function addEnrollment(e) {
    e.preventDefault();
    const data = {
        StudentID: document.getElementById('enrollStudent').value,
        CourseID: document.getElementById('enrollCourse').value,
        EnrollmentDate: document.getElementById('enrollmentDate').value,
        Semester: document.getElementById('semester').value,
        AcademicYear: document.getElementById('academicYear').value
    };
    
    fetch(`${API_URL}/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        showAlert('Enrollment added successfully!');
        document.getElementById('enrollmentForm').reset();
        loadEnrollments();
    })
    .catch(err => showAlert('Error adding enrollment: ' + err, 'error'));
}

function editEnrollment(id) {
    fetch(`${API_URL}/enrollments/${id}`)
        .then(res => res.json())
        .then(enrollment => {
            const fields = document.getElementById('modalFields');
            fields.innerHTML = `
                <input type="hidden" id="editId" value="${id}">
                <input type="date" id="editEnrollmentDate" value="${enrollment.EnrollmentDate}">
                <input type="text" id="editSemester" value="${enrollment.Semester || ''}" placeholder="Semester">
                <input type="text" id="editAcademicYear" value="${enrollment.AcademicYear || ''}" placeholder="Academic Year">
            `;
            document.getElementById('modalTitle').textContent = 'Edit Enrollment';
            window.currentEdit = {
                type: 'enrollment',
                id: id
            };
            document.getElementById('modal').classList.add('show');
        })
        .catch(err => showAlert('Error fetching enrollment: ' + err, 'error'));
}

function deleteEnrollment(id) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
        fetch(`${API_URL}/enrollments/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                showAlert('Enrollment deleted successfully!');
                loadEnrollments();
            })
            .catch(err => showAlert('Error deleting enrollment: ' + err, 'error'));
    }
}

function loadEnrollmentsForSelect(selectId) {
    fetch(`${API_URL}/enrollments`)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="">Select Enrollment</option>';
            data.forEach(enrollment => {
                const option = document.createElement('option');
                option.value = enrollment.EnrollmentID;
                option.textContent = `${enrollment.StudentName} - ${enrollment.CourseName}`;
                select.appendChild(option);
            });
        })
        .catch(err => console.error('Error loading enrollments: ' + err));
}

// ==================== GRADES ====================

function loadGrades() {
    fetch(`${API_URL}/grades`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#gradesTable tbody');
            tbody.innerHTML = '';
            data.forEach(grade => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${grade.GradeID}</td>
                    <td>${grade.StudentName}</td>
                    <td>${grade.CourseName}</td>
                    <td>${grade.MarksObtained}</td>
                    <td>${grade.GradeLetter || 'N/A'}</td>
                    <td><span class="status ${grade.Status.toLowerCase()}">${grade.Status}</span></td>
                    <td class="actions">
                        <button onclick="editGrade(${grade.GradeID})" class="btn btn-small btn-primary">Edit</button>
                        <button onclick="deleteGrade(${grade.GradeID})" class="btn btn-small btn-danger">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(err => showAlert('Error loading grades: ' + err, 'error'));
}

function addGrade(e) {
    e.preventDefault();
    const data = {
        EnrollmentID: document.getElementById('gradeEnrollment').value,
        MarksObtained: document.getElementById('marks').value,
        GradeLetter: document.getElementById('gradeLetter').value,
        Status: document.getElementById('status').value
    };
    
    fetch(`${API_URL}/grades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        showAlert('Grade added successfully!');
        document.getElementById('gradeForm').reset();
        loadGrades();
    })
    .catch(err => showAlert('Error adding grade: ' + err, 'error'));
}

function editGrade(id) {
    fetch(`${API_URL}/grades/${id}`)
        .then(res => res.json())
        .then(grade => {
            const fields = document.getElementById('modalFields');
            fields.innerHTML = `
                <input type="hidden" id="editId" value="${id}">
                <input type="number" id="editMarks" value="${grade.MarksObtained}" placeholder="Marks" step="0.01">
                <input type="text" id="editGradeLetter" value="${grade.GradeLetter || ''}" placeholder="Grade Letter">
                <select id="editStatus">
                    <option value="Pass" ${grade.Status === 'Pass' ? 'selected' : ''}>Pass</option>
                    <option value="Fail" ${grade.Status === 'Fail' ? 'selected' : ''}>Fail</option>
                </select>
            `;
            document.getElementById('modalTitle').textContent = 'Edit Grade';
            window.currentEdit = {
                type: 'grade',
                id: id
            };
            document.getElementById('modal').classList.add('show');
        })
        .catch(err => showAlert('Error fetching grade: ' + err, 'error'));
}

function deleteGrade(id) {
    if (confirm('Are you sure you want to delete this grade?')) {
        fetch(`${API_URL}/grades/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                showAlert('Grade deleted successfully!');
                loadGrades();
            })
            .catch(err => showAlert('Error deleting grade: ' + err, 'error'));
    }
}

// ==================== MODAL ====================

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function handleModalSubmit(e) {
    e.preventDefault();
    const { type, id } = window.currentEdit;

    if (type === 'department') {
        const data = {
            DepartmentName: document.getElementById('editDeptName').value,
            HeadOfDepartment: document.getElementById('editDeptHead').value
        };
        fetch(`${API_URL}/departments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            showAlert('Department updated successfully!');
            closeModal();
            loadDepartments();
        })
        .catch(err => showAlert('Error updating department: ' + err, 'error'));
    } else if (type === 'student') {
        const data = {
            FirstName: document.getElementById('editFirstName').value,
            LastName: document.getElementById('editLastName').value,
            Email: document.getElementById('editEmail').value,
            Phone: document.getElementById('editPhone').value,
            DateOfBirth: document.getElementById('editDateOfBirth').value,
            Address: document.getElementById('editAddress').value,
            DepartmentID: 1
        };
        fetch(`${API_URL}/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            showAlert('Student updated successfully!');
            closeModal();
            loadStudents();
        })
        .catch(err => showAlert('Error updating student: ' + err, 'error'));
    } else if (type === 'course') {
        const data = {
            CourseName: document.getElementById('editCourseName').value,
            CourseCode: document.getElementById('editCourseCode').value,
            Credits: document.getElementById('editCredits').value,
            DepartmentID: 1
        };
        fetch(`${API_URL}/courses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            showAlert('Course updated successfully!');
            closeModal();
            loadCourses();
        })
        .catch(err => showAlert('Error updating course: ' + err, 'error'));
    } else if (type === 'enrollment') {
        const data = {
            StudentID: 1,
            CourseID: 1,
            EnrollmentDate: document.getElementById('editEnrollmentDate').value,
            Semester: document.getElementById('editSemester').value,
            AcademicYear: document.getElementById('editAcademicYear').value
        };
        fetch(`${API_URL}/enrollments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            showAlert('Enrollment updated successfully!');
            closeModal();
            loadEnrollments();
        })
        .catch(err => showAlert('Error updating enrollment: ' + err, 'error'));
    } else if (type === 'grade') {
        const data = {
            EnrollmentID: 1,
            MarksObtained: document.getElementById('editMarks').value,
            GradeLetter: document.getElementById('editGradeLetter').value,
            Status: document.getElementById('editStatus').value
        };
        fetch(`${API_URL}/grades/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            showAlert('Grade updated successfully!');
            closeModal();
            loadGrades();
        })
        .catch(err => showAlert('Error updating grade: ' + err, 'error'));
    }
}

// ==================== DASHBOARD ====================

function loadDashboard() {
    Promise.all([
        fetch(`${API_URL}/students`).then(r => r.json()),
        fetch(`${API_URL}/courses`).then(r => r.json()),
        fetch(`${API_URL}/departments`).then(r => r.json()),
        fetch(`${API_URL}/enrollments`).then(r => r.json())
    ])
    .then(([students, courses, departments, enrollments]) => {
        document.getElementById('totalStudents').textContent = students.length;
        document.getElementById('totalCourses').textContent = courses.length;
        document.getElementById('totalDepartments').textContent = departments.length;
        document.getElementById('totalEnrollments').textContent = enrollments.length;

        // Recent Students
        const recentStudents = students.slice(0, 5);
        const studentsTbody = document.querySelector('#recentStudentsTable tbody');
        studentsTbody.innerHTML = '';
        recentStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.StudentID}</td>
                <td>${student.FirstName} ${student.LastName}</td>
                <td>${student.Email}</td>
                <td>${student.DepartmentName || 'N/A'}</td>
            `;
            studentsTbody.appendChild(row);
        });

        // Recent Enrollments
        const recentEnrollments = enrollments.slice(0, 5);
        const enrollmentsTbody = document.querySelector('#recentEnrollmentsTable tbody');
        enrollmentsTbody.innerHTML = '';
        recentEnrollments.forEach(enrollment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${enrollment.StudentName}</td>
                <td>${enrollment.CourseName}</td>
                <td>${enrollment.Semester || 'N/A'}</td>
                <td>${enrollment.EnrollmentDate}</td>
            `;
            enrollmentsTbody.appendChild(row);
        });
    })
    .catch(err => showAlert('Error loading dashboard: ' + err, 'error'));
}

// ==================== REPORTS ====================

function loadReport(reportType) {
    let url, tableId, tableBody;

    if (reportType === 'student-grade-report') {
        url = `${API_URL}/reports/student-grade-report`;
        tableId = 'studentGradeReportTable';
    } else if (reportType === 'course-enrollment-summary') {
        url = `${API_URL}/reports/course-enrollment-summary`;
        tableId = 'courseEnrollmentReportTable';
    } else if (reportType === 'failed-students') {
        url = `${API_URL}/reports/failed-students`;
        tableId = 'failedStudentsReportTable';
    } else if (reportType === 'course-statistics') {
        url = `${API_URL}/reports/course-statistics`;
        tableId = 'courseStatsReportTable';
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById(tableId);
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';

            if (reportType === 'student-grade-report') {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.StudentID}</td>
                        <td>${row.StudentName}</td>
                        <td>${row.CourseName}</td>
                        <td>${row.Semester}</td>
                        <td>${row.MarksObtained}</td>
                        <td>${row.GradeLetter}</td>
                        <td>${row.Status}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else if (reportType === 'course-enrollment-summary') {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.CourseName}</td>
                        <td>${row.CourseCode}</td>
                        <td>${row.DepartmentName}</td>
                        <td>${row.TotalEnrollments}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else if (reportType === 'failed-students') {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.StudentName}</td>
                        <td>${row.CourseName}</td>
                        <td>${row.MarksObtained}</td>
                        <td>${row.GradeLetter}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else if (reportType === 'course-statistics') {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.CourseName}</td>
                        <td>${row.TotalStudents}</td>
                        <td>${parseFloat(row.AverageMarks).toFixed(2)}</td>
                        <td>${row.HighestMarks}</td>
                        <td>${row.LowestMarks}</td>
                    `;
                    tbody.appendChild(tr);
                });
            }

            table.classList.remove('hidden');
        })
        .catch(err => showAlert('Error loading report: ' + err, 'error'));
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});
