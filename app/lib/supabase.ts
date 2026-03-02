import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://Elcroc-panel.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_7flcB_VqT45HW67kHVgYcQ_KUpRWk65'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)