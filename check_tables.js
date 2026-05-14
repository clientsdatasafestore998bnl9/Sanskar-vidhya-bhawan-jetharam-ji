const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const t1 = await supabase.from('exams').select('*').limit(1);
  const t2 = await supabase.from('marks').select('*').limit(1);
  const t3 = await supabase.from('routine').select('*').limit(1);
  const t4 = await supabase.from('notes').select('*').limit(1);
  console.log("Exams:", t1.error ? "Error" : "Exists");
  console.log("Marks:", t2.error ? "Error" : "Exists");
  console.log("Routine:", t3.error ? "Error" : "Exists");
  console.log("Notes:", t4.error ? "Error" : "Exists");
}
check();
