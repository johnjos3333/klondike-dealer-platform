import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jprqptrtskfjyuqceann.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcnFwdHJ0c2tmanl1cWNlYW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MjI5MDcsImV4cCI6MjA5MjE5ODkwN30.uh44pjb6AGT3qd9Fm9mh027WBgmw1LsPtulFeWdrS0Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
