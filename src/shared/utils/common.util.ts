import toast from "react-hot-toast";

export const formatDollarAmount = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return formatDollarAmount(0);

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  const words = fullName.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  if (words.length === 2) {
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }

  return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
};

export const fixedNumber = (num: number | null | undefined, fractionDigits = 2) => {
  if (num === null || num === undefined) return 0;

  try {
    return Number(num.toFixed(fractionDigits));
  } catch {
    return 0;
  }
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success("Đã sao chép vào clipboard");
    },
    () => {
      toast.error("Sao chép thất bại");
    }
  );
};

export const addDash = (str: string | null | undefined): string => {
  if (!str) return "";

  try {
    const digits = str.replace(/\D/g, "");

    const limited = digits.slice(0, 10);

    return limited.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
  } catch {
    return str || "";
  }
};

export const removeDash = (str: string) => {
  try {
    if (!str.includes("-")) return str;

    return str.replace(/-/g, "");
  } catch {
    return str || "";
  }
};

export const copyTextToClipboard = (text: string | null | undefined) => {
  navigator.clipboard.writeText(text || "").then(
    () => {
      toast.success("Đã sao chép vào clipboard");
    },
    () => {
      toast.error("Sao chép thất bại");
    }
  );
};
