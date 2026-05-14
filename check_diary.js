const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.rpc('get_tables');
  if (error) console.log(error);
  // fallback if rpc fails
  const { data: d1 } = await supabase.from('diary').select('*').limit(1);
  console.log("Diary exists?", !d1?.error);
}
check();
