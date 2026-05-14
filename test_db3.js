const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://ospgfrmkkybdvadwxhng.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcGdmcm1ra3liZHZhZHd4aG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjIyNzgsImV4cCI6MjA5MzczODI3OH0.9DmxDotLaYg5ChrCV-guefZCbXlUCXU8_TgIbXs7DmU');

async function test() {
  const { data, error } = await supabase.rpc('get_policies'); // or just query pg_policies
  console.log('Policies error:', error);
}
test();
