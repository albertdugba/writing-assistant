export async function retrieveData<T>(payload: T) {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify(payload),
    next: { revalidate: 0 },
  });

  return await response.json();
}
