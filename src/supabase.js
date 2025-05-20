import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knnpbuguvmsotlawdsbb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubnBidWd1dm1zb3RsYXdkc2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NzA1MTgsImV4cCI6MjA2MzM0NjUxOH0.nxD9kqIB8LdDlffXXHC74PgUskELdIS42mf5DFZpl4I';
export const supabase = createClient(supabaseUrl, supabaseKey);