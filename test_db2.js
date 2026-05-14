const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://ospgfrmkkybdvadwxhng.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcGdmcm1ra3liZHZhZHd4aG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjIyNzgsImV4cCI6MjA5MzczODI3OH0.9DmxDotLaYg5ChrCV-guefZCbXlUCXU8_TgIbXs7DmU');

async function test() {
  const res1 = await supabase.from('admissions_inquiries').select('*').order('created_at', { ascending: false });
  console.log('admissions order created_at error:', res1.error);
  
  const res2 = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  console.log('contacts order created_at error:', res2.error);
}
test();
