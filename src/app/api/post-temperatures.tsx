import { supabase } from "../../utils/supabase-client";

export interface TemperatureRecord {
  id: number;
  created_at: string;
  emotion: number;
  content: string;
}

export async function addTemperature(
  record: Omit<TemperatureRecord, "id" | "created_at">,
): Promise<TemperatureRecord | null> {
  const { data, error } = await supabase
    .from("마음온도")
    .insert([record])
    .select()
    .single();

  if (error) {
    // eslint-disable-next-line no-console
    console.error("마음온도 추가 실패:", error.message);
    return null;
  }

  return data as TemperatureRecord;
}
