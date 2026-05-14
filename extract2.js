const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'admin', 'page.tsx');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

const formStart = lines.findIndex(l => l.startsWith('const FormView = ('));
const formEnd = lines.findIndex((l, i) => i > formStart && l.startsWith('};') && lines[i-1].includes(');'));

if (formStart !== -1 && formEnd !== -1) {
    const formCode = lines.slice(formStart, formEnd + 1).join('\n');

    // Create FormView.tsx
    const formFileContent = `"use client";\nimport React, { useState } from "react";\nimport { FileText, UserCircle, FileBox, CreditCard, ShieldCheck, ChevronDown } from "lucide-react";\nimport { PremiumCalendar } from "./PremiumCalendar";\nimport { supabase } from "@/lib/supabase";\nimport { PrintLayout } from "./PrintLayout";\n\ntype FieldType = { \n  label: string; \n  type: "text" | "select" | "date" | "file"; \n  options?: string[]; \n  value?: string;\n  onChange?: (val: string) => void;\n};\n\nconst CLASS_FEES: Record<string, number> = {\n  "Nursery": 6500, "LKG": 6800, "UKG": 7000,\n  "1st": 8500, "2nd": 8800, "3rd": 9000, "4th": 9500, "5th": 10000,\n  "6th": 11000, "7th": 11500, "8th": 12000, "9th": 14000, "10th": 15500\n};\n\nexport ` + formCode;
    fs.writeFileSync(path.join(__dirname, 'src', 'components', 'Admin', 'FormView.tsx'), formFileContent);

    // Remove from page.tsx and add import
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        if (i >= formStart && i <= formEnd) continue;
        newLines.push(lines[i]);
    }

    const finalContent = newLines.join('\n').replace(
        'import { PremiumCalendar } from "@/components/Admin/PremiumCalendar";',
        'import { PremiumCalendar } from "@/components/Admin/PremiumCalendar";\nimport { FormView } from "@/components/Admin/FormView";'
    );

    fs.writeFileSync(filePath, finalContent);
    console.log("Extraction successful!");
} else {
    console.log("Could not find FormView!", { formStart, formEnd });
}
