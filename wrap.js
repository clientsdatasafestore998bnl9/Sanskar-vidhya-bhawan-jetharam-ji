const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

if (!content.includes('import { AdminProvider }')) {
    content = content.replace('import { PrintLayout } from "@/components/Admin/PrintLayout";', 'import { PrintLayout } from "@/components/Admin/PrintLayout";\nimport { AdminProvider } from "./context/AdminContext";');
    
    const contextValueString = `
  const adminContextValue = {
      activeTab, setActiveTab, activeSubView, setActiveSubView,
      dbStudents, setDbStudents, dbTeachers, setDbTeachers,
      dbAccounts, setDbAccounts, dbRoutine, setDbRoutine,
      dbExams, setDbExams, dbNotices, setDbNotices,
      dbAdmissions, setDbAdmissions, dbMessages, setDbMessages,
      isSidebarOpen, setIsSidebarOpen, groupMedium, setGroupMedium,
      groupClass, setGroupClass, isMounted, setIsMounted,
      welcomeSlip, setWelcomeSlip, isEditing, setIsEditing,
      isSaving, setIsSaving, selectedStudent, setSelectedStudent,
      printRef, handlePrint, refreshData
  };

  return (
    <AdminProvider value={adminContextValue}>
      <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/20 font-JakartaSans relative overflow-x-hidden text-slate-100">`;

    content = content.replace('  return (\n    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/20 font-JakartaSans relative overflow-x-hidden text-slate-100">', contextValueString);
    content = content.replace('  return (\r\n    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500/20 font-JakartaSans relative overflow-x-hidden text-slate-100">', contextValueString);

    content = content.replace('    </div>\n  );\n}', '    </div>\n    </AdminProvider>\n  );\n}');
    content = content.replace('    </div>\r\n  );\r\n}', '    </div>\r\n    </AdminProvider>\r\n  );\r\n}');

    fs.writeFileSync(filePath, content);
    console.log("AdminProvider added to page.tsx!");
} else {
    console.log("AdminProvider already exists.");
}
