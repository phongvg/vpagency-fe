import { selectStyles } from "@/shared/components/common/AsyncSelect/async-select.config";
import type { Meta } from "@/shared/types/common/apiResponse.type";
import type { SelectOption } from "@/shared/types/common/select-option.type";
import { type GroupBase } from "react-select";
import { AsyncPaginate, type LoadOptions } from "react-select-async-paginate";

interface AsyncSelectProps<T> {
  value?: SelectOption | SelectOption[] | null;
  onChange?: (value: SelectOption | SelectOption[] | null) => void;
  fetcher?: (params: { search: string; page: number }) => Promise<{
    items: T[];
    meta: Meta;
  }>;
  mapOption?: (item: T) => SelectOption;
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
}

export default function AsyncSelect<T>({ value, onChange, fetcher, mapOption, placeholder, disabled, isMulti }: AsyncSelectProps<T>) {
  const loadOptions: LoadOptions<SelectOption, GroupBase<SelectOption>, { page: number }> = async (search, _, additional) => {
    if (!fetcher || !mapOption) return { options: [], hasMore: false };

    const page = additional?.page ?? 1;

    const res = await fetcher({
      search,
      page,
    });

    return {
      options: res.items.map(mapOption),
      hasMore: res.meta.hasNext,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <AsyncPaginate
      styles={selectStyles}
      value={value}
      loadOptions={loadOptions}
      onChange={onChange}
      additional={{ page: 1 }}
      placeholder={placeholder}
      isClearable={false}
      isDisabled={disabled}
      isMulti={isMulti as any}
      loadingMessage={() => "ĐANG TẢI..."}
      noOptionsMessage={() => "KHÔNG CÓ DỮ LIỆU"}
    />
  );
}
