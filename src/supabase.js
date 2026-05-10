import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rpqfpzzgdlqxvnrslbcw.supabase.co";
const supabaseKey = "sb_publishable_5JXx3CdlyvufoUAIic_4KQ_Io_iEshp";

export const supabase = createClient(supabaseUrl, supabaseKey);
