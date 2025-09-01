import { supabase } from "../../utils/supabase-client";

export interface TemperatureRecord {
  id: number;
  created_at: string;
  emotion: number;
  content: string;
}

export async function getTemperatures(): Promise<TemperatureRecord[]> {
  const { data, error } = await supabase
    .from("마음온도")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as TemperatureRecord[];
}
