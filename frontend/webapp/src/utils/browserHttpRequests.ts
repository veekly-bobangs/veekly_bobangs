interface BrowserHttpResponse {
  error?: string | undefined;
  data?: any | undefined;
}

export async function fetchGet(url: string): Promise<BrowserHttpResponse> {
  try {
      const res = await fetch(url);
      const data = await res.json();
      // Check if the HTTP response is successful
      if (!res.ok) {
        throw new Error(`${res.status}: ${data.error || "Unknown error"}`);
      }
      return { data };
  } catch (error: any) {
      return { error: error.message || "Unknown error" };
  }
}

export async function fetchPost(url: string, body: any): Promise<BrowserHttpResponse> {
  try {
      const res = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      });

      const data = await res.json();
      // Check if the HTTP response is successful
      if (!res.ok) {
        throw new Error(`${res.status}: ${data.error || "Unknown error"}`);
      }
      return { data };
  } catch (error: any) {
      return { error: error.message || "Unknown error" };
  }
}
