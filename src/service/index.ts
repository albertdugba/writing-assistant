type ApiResponse = {
  text: string;
};
export async function retrieveData<T>(payload: T): Promise<ApiResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return await response.json();
}

export async function explainTextApi<T>(payload: T): Promise<ApiResponse> {
  const response = await fetch("/api/explain", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return await response.json();
}
