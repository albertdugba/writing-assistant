type ApiResponse = {
  text: string;
};
export async function rewriteRequest<T>(payload: T): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}

export async function explainTextApi<T>(payload: T): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Failed to explain text");
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}
