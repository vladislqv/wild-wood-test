export const fetcher = (url: string, options?: RequestInit) =>
    fetch(url, options).then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
      return res.json();
    });
  