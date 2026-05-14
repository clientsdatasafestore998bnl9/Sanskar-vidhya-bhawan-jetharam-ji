# 🎓 Sanskar Vidya Bhawan - Admin Panel Master Guide 🚀

Yeh ek expert-level, step-by-step manual hai jo poore **Admin Portal** ke A to Z features, workflows, aur database functionalities ko detail me samjhata hai. Pura system **Supabase Backend** se live connected hai, jiska matlab hai har ek action real-time me update hota hai.

---

## 1. 📊 Dashboard Overview (Main Home Page)
**Kya Hai?** Yeh apka command center hai jahan aapko poore school ka helicopter view milta hai.
* **Live Stats:** "Total Revenue", "Active Students", "New Admissions Today", aur "Total Staff" ke cards live database se calculate hokar aate hain. Koi fake data nahi hai. Agar database khali hai toh sab '0' dikhega.
* **Analytics Chart:** Fees kab aayi aur kharcha kab hua, iska visual graph.

---

## 2. 👨‍🎓 Student Management (Students Tab)
**Kya Hai?** School ke bachho ki a-to-z life cycle control karne ka section.

### A. New Student Registration (Add Student)
* **Process:** Aap student ka naam, class, medium, aadhar, DOB aur baki details fill karte hain.
* **Photo Upload:** Upload ki gayi photo seedha `student_photos` cloud storage me jaati hai aur permanently safe ho jati hai.
* **Auto-Magic (Workflow):** Jaise hi aap 'Register Student' dabate hain:
  1. System automatically ek **SR Number (Login ID)** generate karta hai.
  2. Ek secure **6-Digit Login PIN** banta hai jisse student apne portal me login karega.
  3. Registration ke turant baad ek **Welcome Slip / ID Card** screen par aati hai jise aap direct print kar sakte hain.

### B. Student Discovery & Inspector (Edit / Delete)
* **Search:** Aap Roll No, SR Number, ya Class + Medium ke filter se kisi bhi bachhe ki profile khoj sakte hain.
* **Edit Profile:** Profile open karke "Edit Profile" par click karein. Aap text details (Name, Class, Phone) change kar sakte hain. Photo par `(+)` icon aayega jisse aap purani photo hata kar nayi upload kar sakte hain. "Save Changes" dabate hi database turant update ho jayega.
* **Delete:** Ek laal rang ka "Delete" button hai. Is par click karte hi double confirmation aayega, aur yes karne par bachhe ka pura record school system se permanently delete ho jayega.
* **Financial Ledger:** Har student ki profile me dikhta hai ki uski "Total Fee" kitni tay hui thi, "Paid Amount" kitna hai, aur "Pending Balance" kitna bacha hai.

---

## 3. 👨‍🏫 Teacher / Staff Control (Teachers Tab)
**Kya Hai?** Teachers ki joining se lekar unki details manage karne ka module.

### A. Add Teacher
* Student ki tarah hi, teacher ki basic details, role, qualifications aur photo daali jati hai.
* **Workflow:** Submit karte hi ek Employee ID (e.g., TCHxxxx) aur 6-digit PIN ban jata hai. Isi id/pin se teacher apne portal par attendance lene ke liye login karta hai.

### B. Staff Inspector
* Teachers ko unke naam ya ID se search kar sakte hain.
* **Edit & Delete:** Student ki tarah hi, teacher ki photo aur text details edit karna aur profile ko delete karna 100% functional hai.

---

## 4. 💰 Financial Control (Fees & Revenue Tab)
**Kya Hai?** School ke paiso ka aana aur jaana (Income & Expense) track karna.

### A. Inward Payments (Fee Collection)
* **Workflow:** Aapko sirf bachhe ka **Roll Number / SR Number** dalna hai aur "Fetch" par click karna hai. System database se uska naam aur pending fees nikal kar layega.
* Payment Amount enter karke submit karne par:
  1. Amount `fees` table me record ho jayega.
  2. Student ki main profile me `paid_amount` badh jayega aur `fee_status` (jaise "Paid" ya "Pending") auto-calculate ho jayega. Student apne portal me turant ye payment dekh payega.

### B. Outward Payments (Expenses)
* School ke maintenance, bijli bill, ya functions ke kharchon ko yahan log kiya jata hai. Yeh record main dashboard ke profit/loss calculations me se amount ghata deta hai.

---

## 5. 📢 Academics & Notice Board (Notices Tab)
**Kya Hai?** School-wide announcements karne ka system.
* **Workflow:** Admin jab bhi koi naya Notice ya Circular banata hai, wo live server par push ho jata hai.
* Agle hi second, jab bhi koi Student ya Teacher apna portal kholta hai, toh unke dashboard par wo notice prominently blink karta hai. Ye paperless communication ka best tarika hai.

---

## 6. 📞 Enquiries & Admissions Desk
**Kya Hai?** Website Visitors aur leads ka management.
* Website ke front-page (public facing site) par jab bhi koi parent "Online Admission Form" bharta hai, toh wo form yahan **Admissions** tab me flash hota hai.
* Jab koi "Contact Us" ka form bharta hai, toh wo yahan **Contact Messages** tab me aa jata hai.
* Admin ye saari live leads ko direct dashboard se dekh aur handle kar sakta hai bina website ka email khole.

---

## 🔄 Cross-Portal Workflows (System Ek Sath Kaise Kaam Karta Hai?)

1. **The Core Principle:** Teeno portals (Admin, Teacher, Student) ek hi "Supabase Brain" se jude hain.
2. **Attendance Flow:** 
   - **Teacher Portal:** Teacher class me login karke "Live Attendance" lagata hai. (Save to DB)
   - **Admin Portal:** Admin Analytics me dekh sakta hai aaj kitne bachhe aaye hain.
   - **Student Portal:** Student ghar jaa kar dekhta hai ki uski aaj ki attendance P hai ya A.
3. **Fee Transparency Flow:**
   - **Admin Portal:** Admin fees receive karta hai.
   - **Student Portal:** Student ke portal me "Fees Status" red se green (Paid) ho jata hai aur pending balance kam ho jata hai.
4. **Security & Data:** Kisi bhi portal me koi dummy button ya fake array nahi hai. Agar internet connected hai aur button daba hai, toh action Database tak zarur gaya hai.

---
### 💡 Expert Tip for Super Admins:
Humesha nayi details (Admissions/Fees) dalte waqt dhyan rakhein ki internet connectivity sahi ho, taaki photo aur details bina lag ke direct cloud storage me push ho jayein. Happy Administrating! 🚀
