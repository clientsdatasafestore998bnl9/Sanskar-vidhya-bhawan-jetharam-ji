const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://ospgfrmkkybdvadwxhng.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcGdmcm1ra3liZHZhZHd4aG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjIyNzgsImV4cCI6MjA5MzczODI3OH0.9DmxDotLaYg5ChrCV-guefZCbXlUCXU8_TgIbXs7DmU');

async function test() {
  const { data } = await supabase.from('admissions_inquiries').select('*');
  console.log('Admissions anon:', data?.length);

  // Sign up a fake user
  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email: 'test_anon_' + Date.now() + '@example.com',
    password: 'password123'
  });
  
  if (authData.session) {
    const { data: authDataQuery, error: qErr } = await supabase.from('admissions_inquiries').select('*');
    console.log('Admissions authenticated:', authDataQuery?.length, 'Error:', qErr?.message);
  } else {
    console.log('Auth error:', authErr?.message);
  }
}
test();
