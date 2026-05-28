
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const supabaseUrl = 'https://qtqfpafhwnfjtecpnjjh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cWZwYWZod25manRlY3BuampoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NzU5MzEsImV4cCI6MjA4MTE1MTkzMX0.59PFvxO_bPPmBG3Tp0em5LvdssVa_ARlVLnYPhfaRHc';

export const supabase = createClient(supabaseUrl, supabaseKey);
