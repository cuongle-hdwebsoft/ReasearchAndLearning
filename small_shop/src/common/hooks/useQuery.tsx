import queryString from "query-string";

export default function useQuery<T extends object>() {
  const url = window.location.href;
  const parser = queryString.parseUrl(url);

  const updateUrlShallow = (query: { [key: string]: string | number | boolean }) => {
    console.log(query);
    const newUrl = queryString.stringifyUrl({ url: parser.url, query });
    window.history.replaceState(null, "", newUrl);
  };

  return {
    query: parser.query as unknown as T,
    updateUrlShallow,
    url,
  };
}
