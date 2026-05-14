const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('const DashboardOverview = () => ('));
let braceCount = 0;
let endIndex = -1;

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].includes('(')) braceCount += (lines[i].match(/\(/g) || []).length;
  if (lines[i].includes(')')) braceCount -= (lines[i].match(/\)/g) || []).length;
  if (braceCount === 0 && i > startIndex) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
    let dashboardCode = lines.slice(startIndex, endIndex + 1).join('\n');
    
    // Convert implicit return to explicit return block to inject useAdmin
    dashboardCode = dashboardCode.replace('const DashboardOverview = () => (', 'const DashboardOverview = () => {\n    const { dbStudents, dbTeachers, dbAccounts, setActiveTab, setActiveSubView } = useAdmin();\n    return (');
    // Replace the final ); with );\n};
    dashboardCode = dashboardCode.substring(0, dashboardCode.lastIndexOf(');')) + ');\n};';

    const fileContent = `"use client";\nimport React from "react";\nimport { useAdmin } from "@/app/dashboard/admin/context/AdminContext";\nimport { Users, Library, CheckSquare, Bus, Home, Bell, CreditCard, AlertCircle, Plus, TrendingUp, ChevronRight } from "lucide-react";\n\nexport ` + dashboardCode;
    
    fs.writeFileSync(path.join(__dirname, 'src', 'components', 'Admin', 'DashboardOverview.tsx'), fileContent);

    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        if (i >= startIndex && i <= endIndex) continue;
        newLines.push(lines[i]);
    }

    const finalContent = newLines.join('\n').replace(
        'import { InspectorView } from "@/components/Admin/InspectorView";',
        'import { InspectorView } from "@/components/Admin/InspectorView";\nimport { DashboardOverview } from "@/components/Admin/DashboardOverview";'
    );

    fs.writeFileSync(filePath, finalContent);
    console.log("DashboardOverview extracted successfully!");
} else {
    console.log("Could not find DashboardOverview!");
}
