const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'admin', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

const calendarStart = lines.findIndex(l => l.includes('const PremiumCalendar = ('));
const calendarEnd = lines.findIndex((l, i) => i > calendarStart && l.startsWith('};'));

const printStart = lines.findIndex((l, i) => i > calendarEnd && l.includes('const PrintLayout = ('));
const printEnd = lines.findIndex((l, i) => i > printStart && l.startsWith('};'));

if (calendarStart !== -1 && printStart !== -1) {
    const calendarCode = lines.slice(calendarStart, calendarEnd + 1).join('\n');
    const printCode = lines.slice(printStart, printEnd + 1).join('\n');

    // Create PremiumCalendar.tsx
    const calendarFileContent = `"use client";\nimport React, { useState } from "react";\nimport { Calendar, ChevronRight } from "lucide-react";\nimport { motion, AnimatePresence } from "framer-motion";\n\nexport ` + calendarCode;
    fs.writeFileSync(path.join(__dirname, 'src', 'components', 'Admin', 'PremiumCalendar.tsx'), calendarFileContent);

    // Create PrintLayout.tsx
    const printFileContent = `"use client";\nimport React from "react";\n\nexport ` + printCode;
    fs.writeFileSync(path.join(__dirname, 'src', 'components', 'Admin', 'PrintLayout.tsx'), printFileContent);

    // Remove from page.tsx and add imports
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        if (i >= calendarStart && i <= calendarEnd) continue;
        if (i >= printStart && i <= printEnd) continue;
        newLines.push(lines[i]);
    }

    const finalContent = newLines.join('\n').replace(
        'import { motion, AnimatePresence } from "framer-motion";',
        'import { motion, AnimatePresence } from "framer-motion";\nimport { PremiumCalendar } from "@/components/Admin/PremiumCalendar";\nimport { PrintLayout } from "@/components/Admin/PrintLayout";'
    );

    fs.writeFileSync(filePath, finalContent);
    console.log("Extraction successful!");
} else {
    console.log("Could not find components!", { calendarStart, calendarEnd, printStart, printEnd });
}
