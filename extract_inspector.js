const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('const InspectorView = () => {'));
let braceCount = 0;
let endIndex = -1;

for (let i = startIndex; i < lines.length; i++) {
  if (lines[i].includes('{')) braceCount += (lines[i].match(/{/g) || []).length;
  if (lines[i].includes('}')) braceCount -= (lines[i].match(/}/g) || []).length;
  if (braceCount === 0 && i > startIndex) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
    let inspectorCode = lines.slice(startIndex, endIndex + 1).join('\n');
    
    inspectorCode = inspectorCode.replace('const InspectorView = () => {\r', 'const InspectorView = () => {\r\n    const { activeTab, dbStudents, dbTeachers, dbAdmissions, dbMessages, selectedStudent, setSelectedStudent, refreshData } = useAdmin();');
    inspectorCode = inspectorCode.replace('const InspectorView = () => {\n', 'const InspectorView = () => {\n    const { activeTab, dbStudents, dbTeachers, dbAdmissions, dbMessages, selectedStudent, setSelectedStudent, refreshData } = useAdmin();\n');

    const fileContent = `"use client";\nimport React, { useState } from "react";\nimport { motion } from "framer-motion";\nimport { supabase } from "@/lib/supabase";\nimport { useAdmin } from "../../context/AdminContext";\nimport {\n  Users, UserSquare2, Search, Printer, ShieldCheck, Mail, MapPin, Calendar, \n  FileText, ArrowUpRight, Plus, Download, Edit3, Trash2\n} from "lucide-react";\n\nexport ` + inspectorCode;
    
    fs.writeFileSync(path.join(__dirname, 'src', 'components', 'Admin', 'InspectorView.tsx'), fileContent);

    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        if (i >= startIndex && i <= endIndex) continue;
        newLines.push(lines[i]);
    }

    const finalContent = newLines.join('\n').replace(
        'import { FormView } from "@/components/Admin/FormView";',
        'import { FormView } from "@/components/Admin/FormView";\nimport { InspectorView } from "@/components/Admin/InspectorView";'
    );

    fs.writeFileSync(filePath, finalContent);
    console.log("InspectorView extracted successfully!");
} else {
    console.log("Could not find InspectorView!");
}
