export function formatKoreanDate(raw: string) {
  const date = new Date(raw);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Seoul",
  }).format(date);
}
