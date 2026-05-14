const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://ospgfrmkkybdvadwxhng.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcGdmcm1ra3liZHZhZHd4aG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjIyNzgsImV4cCI6MjA5MzczODI3OH0.9DmxDotLaYg5ChrCV-guefZCbXlUCXU8_TgIbXs7DmU');

async function test() {
  console.log('Testing admissions_inquiries...');
  const res1 = await supabase.from('admissions_inquiries').select('*');
  console.log('admissions_inquiries error:', res1.error);
  console.log('admissions_inquiries count:', res1.data?.length);

  console.log('Testing contact_messages...');
  const res2 = await supabase.from('contact_messages').select('*');
  console.log('contact_messages error:', res2.error);
  console.log('contact_messages count:', res2.data?.length);
}
test();
