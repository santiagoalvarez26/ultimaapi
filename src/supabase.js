import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvedgkhdlvzromagdiww.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2ZWRna2hkbHZ6cm9tYWdkaXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2ODAwNjksImV4cCI6MjA2MzI1NjA2OX0.WKrcJwxldf3akap58wQYoac40EqHQo7oTQ35nG28RPg';
export const supabase = createClient(supabaseUrl, supabaseKey);