const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'dashboard', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

content = content.replace(
  "// --- EXPERT INSTITUTIONAL COMPONENTS ---\n\n\n  const [formData, setFormData] = useState<any>({});",
  "// --- EXPERT INSTITUTIONAL COMPONENTS ---\n\nconst FormView = ({ title, fields, onSuccess, onRefresh }: { title: string, fields: FieldType[], onSuccess?: () => void, onRefresh?: () => void }) => {\n  const [formData, setFormData] = useState<any>({});"
);

content = content.replace(
  "// --- EXPERT INSTITUTIONAL COMPONENTS ---\r\n\r\n\r\n  const [formData, setFormData] = useState<any>({});",
  "// --- EXPERT INSTITUTIONAL COMPONENTS ---\r\n\r\nconst FormView = ({ title, fields, onSuccess, onRefresh }: { title: string, fields: FieldType[], onSuccess?: () => void, onRefresh?: () => void }) => {\r\n  const [formData, setFormData] = useState<any>({});"
);

fs.writeFileSync(filePath, content);

const printPath = path.join(__dirname, 'src', 'components', 'Admin', 'PrintLayout.tsx');
let printContent = fs.readFileSync(printPath, 'utf-8');
printContent = printContent.replace(
  "  );\n};\nconst FormView = ({ title, fields, onSuccess, onRefresh }: { title: string, fields: FieldType[], onSuccess?: () => void, onRefresh?: () => void }) => {",
  "  );\n};"
);
printContent = printContent.replace(
  "  );\r\n};\r\nconst FormView = ({ title, fields, onSuccess, onRefresh }: { title: string, fields: FieldType[], onSuccess?: () => void, onRefresh?: () => void }) => {",
  "  );\r\n};"
);
printContent = printContent.replace(
  "  );\n};const FormView = ({ title, fields, onSuccess, onRefresh }: { title: string, fields: FieldType[], onSuccess?: () => void, onRefresh?: () => void }) => {",
  "  );\n};"
);
printContent = printContent.replace(
  "  );\r\n};const FormView = ({ title, fields, onSuccess, onRefresh }: { title: string, fields: FieldType[], onSuccess?: () => void, onRefresh?: () => void }) => {",
  "  );\r\n};"
);

fs.writeFileSync(printPath, printContent);
