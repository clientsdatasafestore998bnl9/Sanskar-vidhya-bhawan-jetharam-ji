"use client";
import React from "react";

export const PrintLayout = ({ data, student, photoFile }: { data?: any, student?: any, photoFile?: File | null }) => {
  const info = data || student;
  const photoPreviewUrl = photoFile ? URL.createObjectURL(photoFile) : (student?.photo_url || null);
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const admDate = info?.["Admission Date"] ? new Date(info["Admission Date"]).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : today;

  const Row = ({ label, value, full, labelWidth = '130px' }: { label: string; value?: string; full?: boolean; labelWidth?: string }) => (
    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: '5px', marginBottom: '5px', alignItems: 'flex-start', gap: '8px', gridColumn: full ? '1/-1' : undefined }}>
      <span style={{ flex: `0 0 ${labelWidth}`, fontSize: '9px', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: '1px' }}>{label}</span>
      <span style={{ flex: 1, fontSize: '10.5px', fontWeight: 800, color: '#111827', wordBreak: 'break-word', letterSpacing: '0.02em' }}>{value || '—'}</span>
    </div>
  );

  const SecHead = ({ title, color = '#1e3a8a' }: { title: string; color?: string }) => (
    <div style={{ background: color, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '4px', height: '4px', background: '#93c5fd', borderRadius: '50%', flexShrink: 0 }} />
      <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{title}</span>
    </div>
  );

  return (
    <div
      id="svb-print-hub"
      style={{
        display: 'none',
        position: 'fixed', left: 0, top: 0,
        width: '100%', height: '100%',
        zIndex: 999999,
        background: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
        color: '#111827', boxSizing: 'border-box',
        flexDirection: 'column', overflow: 'hidden',
      }}
      className="print:flex"
    >
      {/* TOP ACCENT */}
      <div style={{ height: '6px', background: 'linear-gradient(90deg,#1e3a8a,#3b82f6,#1e3a8a)', flexShrink: 0 }} />

      {/* HEADER */}
      <div style={{ background: '#1e3a8a', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', flexShrink: 0 }}>
            <img src="/logo.png" alt="SVB" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.1 }}>Sanskar Vidya Bhavan</div>
            <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#93c5fd', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>Shiksha • Sanskar • Sewa — Est. 1995</div>
            <div style={{ fontSize: '9px', color: '#bfdbfe', marginTop: '2px', fontWeight: 500 }}>CBSE / State Board Affiliated • Recognised by Govt. of India</div>
          </div>
        </div>
        <div style={{ width: '85px', height: '105px', border: '3px solid #93c5fd', borderRadius: '4px', overflow: 'hidden', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {photoPreviewUrl
            ? <img src={photoPreviewUrl} alt="Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <div style={{ textAlign: 'center', fontSize: '8px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', lineHeight: 1.5 }}>Passport<br/>Photo</div>
          }
        </div>
      </div>

      {/* TITLE BAR WITH SR NUMBER */}
      <div style={{ background: '#eff6ff', borderTop: '2px solid #3b82f6', borderBottom: '2px solid #3b82f6', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '22px', background: '#1e3a8a', borderRadius: '2px' }} />
          <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e3a8a', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Student Admission Form</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {info?.["SR Number"] && (
            <div style={{ background: '#1e3a8a', color: '#fff', borderRadius: '4px', padding: '4px 12px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              SR No: {info["SR Number"]}
            </div>
          )}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admission Date</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e3a8a' }}>{admDate}</div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>

        {/* SECTION 1: Personal Info */}
        <div style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
          <SecHead title="Personal Information" />
          <div style={{ padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
            <div style={{ gridColumn: '1/-1' }}><Row label="Student's Full Name" value={info?.["Student Full Name"]} full /></div>
            <Row label="Date of Birth" value={info?.["Date of Birth"] ? String(info["Date of Birth"]).split('-').reverse().join('-') : undefined} />
            <Row label="Gender" value={info?.["Gender"]} />
            <Row label="Category / Caste" value={info?.["Category"]} />
            <Row label="Aadhar Number" value={info?.["Aadhar Number"]} />
            <Row label="Contact Number" value={info?.["Contact Number"]} />
            <Row label="Admission Type" value={info?.["Admission Type"]} />
          </div>
        </div>

        {/* SECTION 2: Academic Details */}
        <div style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
          <SecHead title="Academic Details" />
          <div style={{ padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
            <Row label="Class Admitted" value={info?.["Class Enrollment"]} />
            <Row label="Medium" value={info?.["Medium Preference"]} />
            <Row label="Academic Year" value="2024-25" />
            <Row label="Session" value="Annual" />
            <Row label="Roll Number" value={info?.roll_number || info?.["Roll Number"] || 'To be assigned'} />
            <Row label="SR / Reg Number" value={info?.["SR Number"] || info?.sr_number} />
          </div>
        </div>

        {/* SECTION 3: Parents Info */}
        <div style={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
          <SecHead title="Parent / Guardian Information" />
          <div style={{ padding: '12px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
            <Row label="Father's Name" value={info?.["Father's Name"]} />
            <Row label="Mother's Name" value={info?.["Mother's Name"]} />
            <Row label="Father's Occupation" value={info?.["Father's Occupation"]} />
            <Row label="Mother's Occupation" value={info?.["Mother's Occupation"]} />
            <Row label="Annual Income" value={info?.["Annual Income"] || 'As declared'} />
            <Row label="Emergency Contact" value={info?.["Contact Number"]} />
          </div>
        </div>

        {/* ROW: Fee + Rules side by side */}
        <div style={{ display: 'flex', gap: '12px', flex: '1 1 auto', minHeight: '0' }}>
          {/* Fee */}
          <div style={{ flex: '0 0 240px', border: '2px solid #1e3a8a', borderRadius: '8px', overflow: 'hidden', background: '#eff6ff', display: 'flex', flexDirection: 'column' }}>
            <SecHead title="Fee Details" color="#1e40af" />
            <div style={{ padding: '12px 14px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#374151', textTransform: 'uppercase' }}>Annual Fee</span>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#1e3a8a' }}>
                  ₹{info?.["Calculated Fee"] ? Number(info["Calculated Fee"]).toLocaleString('en-IN') : '——'}
                </span>
              </div>
              <Row label="Category" value={info?.["Category"]} labelWidth="80px" />
              <Row label="Medium" value={info?.["Medium Preference"]} labelWidth="80px" />
              <Row label="Payment Mode" value="As agreed" labelWidth="80px" />
              <div style={{ marginTop: '12px', fontSize: '9px', color: '#4b5563', fontWeight: 600, textAlign: 'center' }}>
                Status: Pending • Session 2024-25
              </div>
            </div>
          </div>

          {/* School Rules */}
          <div style={{ flex: 1, border: '1.5px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <SecHead title="School Rules & Undertaking" />
            <div style={{ padding: '10px 14px', flex: 1 }}>
              <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '9px', color: '#374151', lineHeight: 1.8, fontWeight: 500 }}>
                <li>Student must follow all school rules and discipline code at all times.</li>
                <li>School uniform is mandatory on all working days as per schedule.</li>
                <li>Fee must be paid by the 10th of each month without fail.</li>
                <li>Absence of more than 3 days requires a written application.</li>
                <li>Mobile phones are strictly prohibited inside school premises.</li>
                <li>Parent/Guardian must attend all scheduled PTM meetings.</li>
                <li>Damage to school property shall be compensated by the student.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DECLARATION */}
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '10px 14px', flexShrink: 0 }}>
          <p style={{ margin: 0, fontSize: '9px', color: '#4b5563', lineHeight: 1.6, fontWeight: 500, textAlign: 'justify' }}>
            <strong style={{ color: '#1e3a8a', textTransform: 'uppercase', fontSize: '8.5px', letterSpacing: '0.1em' }}>Declaration: </strong>
            I hereby declare that all information provided above is true and correct. I/We agree to abide by all rules, regulations and fee commitments of Sanskar Vidya Bhavan for the academic session 2024-25. I understand that providing false information may result in cancellation of admission without refund.
          </p>
        </div>

        {/* SIGNATURES */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '16px', paddingBottom: '4px', flexShrink: 0 }}>
          {[
            { label: 'Parent / Guardian Signature', width: '160px' },
            { label: 'Class Teacher', width: '140px' },
            { label: 'Verified By (Office)', width: '140px' },
            { label: 'Principal / Administrator', width: '160px' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: s.width, height: '1.5px', background: '#94a3b8' }} />
              <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#1e3a8a', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: '8.5px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.05em' }}>📍 Sanskar Vidya Bhavan • School Campus • India</span>
        <span style={{ fontSize: '8.5px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.05em' }}>📞 Contact School Office for queries</span>
        <span style={{ fontSize: '8.5px', color: '#93c5fd', fontWeight: 600, letterSpacing: '0.05em' }}>🌐 sanskar-vidya-bhavan.vercel.app</span>
      </div>
      {/* BOTTOM ACCENT */}
      <div style={{ height: '5px', background: 'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)', flexShrink: 0 }} />
    </div>
  );
};