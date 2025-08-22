import { supabase } from "../utils/supabase-client";

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

  if (error) {
    // eslint-disable-next-line no-console
    console.error("마음온도 조회 실패:", error.message);
    return [];
  }

  return data as TemperatureRecord[];
}
