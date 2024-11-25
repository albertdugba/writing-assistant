import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HistoryItem } from "~/hooks/useRewrite";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadHistory(history: HistoryItem[]) {
  const formattedHistory = history
    .map((item) => {
      const formattedDate = item.timestamp.toLocaleString();
      return `[${formattedDate}]\n${item.text}\n\n`;
    })
    .join("");

  const blob = new Blob([formattedHistory], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "history.txt";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
