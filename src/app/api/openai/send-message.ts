export default async function sendMessage(
  messages: { role: string; content: string }[],
) {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      `API 요청 실패: ${res.status} ${res.statusText}\n${JSON.stringify(
        errorData,
      )}`,
    );
  }

  const data = await res.json();
  return data.content ?? "(빈 응답)";
}
