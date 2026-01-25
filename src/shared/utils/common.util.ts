export const formatDollarAmount = (amount: number | null): string => {
  if (amount === null) return "-";

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const convertQueryParams = (params: Record<string, unknown> | undefined): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== null && v !== undefined && v !== "") {
          searchParams.append(key, String(v));
        }
      });
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export const normalizeParams = (params: Record<string, any>) => {
  return Object.keys(params)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = params[key];
        return acc;
      },
      {} as Record<string, any>
    );
};
