import type { AppealAccountListParams } from "@/modules/appealAccount/types/appealAccount.type";

interface AppealAccountListFilterProps {
  params: AppealAccountListParams;
  setParams: React.Dispatch<React.SetStateAction<AppealAccountListParams>>;
}

export default function AppealAccountListFilter({ params, setParams }: AppealAccountListFilterProps) {
  return <div>AppealAccountListFilter</div>;
}
