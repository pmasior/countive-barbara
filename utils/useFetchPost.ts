import { useState } from "react";

interface FetchPostReturn {
  error: boolean;
  json?: any;
  status?: number;
  text: string;
}

export const useFetchPOST = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPOST = async <ResponseType = any>(
    body: any
  ): Promise<FetchPostReturn> => {
    setLoading(true);
    try {
      const res = await runFetchPOST(body);
      setLoading(false);
      return await returnFetchResponse<ResponseType>(res);
    } catch (err) {
      setLoading(false);
      return {
        error: true,
        text: "Internet connection is probably lost",
      };
    }
  };

  const runFetchPOST = async (body: any): Promise<Response> =>
    await fetch(url, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

  const returnFetchResponse = async <ResponseType>(
    res: Response
  ): Promise<FetchPostReturn> => {
    const text = await res.text();
    return {
      error: !res.ok,
      json: tryParseTextToString<ResponseType>(text),
      status: res.status,
      text: text,
    };
  };

  const tryParseTextToString = <ResponseType>(
    text: string
  ): ResponseType | undefined => {
    try {
      return JSON.parse(text) as ResponseType;
    } catch (e) {
      return undefined;
    }
  };

  return { fetchPOST, loading };
};
