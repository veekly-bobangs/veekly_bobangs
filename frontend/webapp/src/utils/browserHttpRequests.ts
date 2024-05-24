export async function fetchGet(url: string) {
  try {
      const res = await fetch(url);

      // Check if the HTTP response is successful
      if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
  } catch (error: any) {
      return { error: error.message || "Unknown error" };
  }
}

export async function fetchPost(url: string, body: any) {
  try {
      const res = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
      });

      // Check if the HTTP response is successful
      if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
  } catch (error: any) {
      return { error: error.message || "Unknown error" };
  }
}
