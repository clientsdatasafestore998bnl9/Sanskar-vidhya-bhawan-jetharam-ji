const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/components/Admin/DashboardOverview.tsx');
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/\(s,f\)=>|s,f=>/g, '(s: any, f: any) => ');
content = content.replace(/f=>/g, '(f: any) => ');
content = content.replace(/t=>/g, '(t: any) => ');
content = content.replace(/\(s, i\) =>/g, '(s: any, i: number) => ');

// Also studentsData.slice(0, 5).map has studentsData which is undefined!
// DashboardOverview doesn't define studentsData or staffData! It defines dbStudents and dbTeachers from useAdmin.
// Let me replace studentsData with dbStudents and staffData with dbTeachers.
content = content.replace(/studentsData/g, 'dbStudents');
content = content.replace(/staffData/g, 'dbTeachers');

fs.writeFileSync(file, content);
