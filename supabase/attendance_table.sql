-- =============================================
-- SVB Portal: Attendance Table
-- Run this in Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS attendance (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id  uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  date        date NOT NULL,
  status      varchar(1) NOT NULL CHECK (status IN ('P', 'A')),
  reason      text,
  marked_by   uuid REFERENCES teachers(id) ON DELETE SET NULL,
  created_at  timestamptz DEFAULT now(),

  -- Prevent duplicate records for same student on same day
  UNIQUE(student_id, date)
);

-- Index for fast queries by date or student
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);

-- Enable Row Level Security
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Teachers can read/write attendance for their class
CREATE POLICY "Teachers can manage attendance"
  ON attendance FOR ALL
  USING (true)
  WITH CHECK (true);

-- =============================================
-- Also ensure students table has required cols
-- =============================================
ALTER TABLE students
  ADD COLUMN IF NOT EXISTS dob date,
  ADD COLUMN IF NOT EXISTS contact_number varchar(15),
  ADD COLUMN IF NOT EXISTS blood_group varchar(5);

-- =============================================
-- Ensure teachers table has required cols
-- =============================================
ALTER TABLE teachers
  ADD COLUMN IF NOT EXISTS subject varchar(100),
  ADD COLUMN IF NOT EXISTS medium varchar(20) DEFAULT 'Hindi';
