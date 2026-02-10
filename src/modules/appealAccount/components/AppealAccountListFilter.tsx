import type { AppealAccountListParams } from "@/modules/appealAccount/types/appealAccount.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card/Card";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";

interface AppealAccountListFilterProps {
  params: AppealAccountListParams;
  setParams: React.Dispatch<React.SetStateAction<AppealAccountListParams>>;
}

export default function AppealAccountListFilter({ params, setParams }: AppealAccountListFilterProps) {
  const [searchInput, setSearchInput] = useState<string | undefined>(params.search);
  const [emailInput, setEmailInput] = useState<string | undefined>(params.email);
  const [uidInput, setUidInput] = useState<string | undefined>(params.uid);
  const [appealedByInput, setAppealedByInput] = useState<string | undefined>(params.appealedBy);
  const [usedByInput, setUsedByInput] = useState<string | undefined>(params.usedBy);
  const [appealPlatformInput, setAppealPlatformInput] = useState<string | undefined>(params.appealPlatform);
  const [rarityLevelInput, setRarityLevelInput] = useState<string | undefined>(params.rarityLevel);

  const searchDebounce = useDebounce(searchInput, 500);
  const emailDebounce = useDebounce(emailInput, 500);
  const uidDebounce = useDebounce(uidInput, 500);
  const appealedByDebounce = useDebounce(appealedByInput, 500);
  const usedByDebounce = useDebounce(usedByInput, 500);
  const appealPlatformDebounce = useDebounce(appealPlatformInput, 500);
  const rarityLevelDebounce = useDebounce(rarityLevelInput, 500);

  useEffect(() => {
    setSearchInput(params.search);
  }, [params.search]);

  useEffect(() => {
    setEmailInput(params.email);
  }, [params.email]);

  useEffect(() => {
    setUidInput(params.uid);
  }, [params.uid]);

  useEffect(() => {
    setAppealedByInput(params.appealedBy);
  }, [params.appealedBy]);

  useEffect(() => {
    setUsedByInput(params.usedBy);
  }, [params.usedBy]);

  useEffect(() => {
    setAppealPlatformInput(params.appealPlatform);
  }, [params.appealPlatform]);

  useEffect(() => {
    setRarityLevelInput(params.rarityLevel);
  }, [params.rarityLevel]);

  useEffect(() => {
    if (searchDebounce !== params.search) {
      setParams((prev) => ({ ...prev, search: searchDebounce, page: 1 }));
    }
  }, [searchDebounce, params.search, setParams]);

  useEffect(() => {
    if (emailDebounce !== params.email) {
      setParams((prev) => ({ ...prev, email: emailDebounce, page: 1 }));
    }
  }, [emailDebounce, params.email, setParams]);

  useEffect(() => {
    if (uidDebounce !== params.uid) {
      setParams((prev) => ({ ...prev, uid: uidDebounce, page: 1 }));
    }
  }, [uidDebounce, params.uid, setParams]);

  useEffect(() => {
    if (appealedByDebounce !== params.appealedBy) {
      setParams((prev) => ({ ...prev, appealedBy: appealedByDebounce, page: 1 }));
    }
  }, [appealedByDebounce, params.appealedBy, setParams]);

  useEffect(() => {
    if (usedByDebounce !== params.usedBy) {
      setParams((prev) => ({ ...prev, usedBy: usedByDebounce, page: 1 }));
    }
  }, [usedByDebounce, params.usedBy, setParams]);

  useEffect(() => {
    if (appealPlatformDebounce !== params.appealPlatform) {
      setParams((prev) => ({ ...prev, appealPlatform: appealPlatformDebounce, page: 1 }));
    }
  }, [appealPlatformDebounce, params.appealPlatform, setParams]);

  useEffect(() => {
    if (rarityLevelDebounce !== params.rarityLevel) {
      setParams((prev) => ({ ...prev, rarityLevel: rarityLevelDebounce, page: 1 }));
    }
  }, [rarityLevelDebounce, params.rarityLevel, setParams]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lọc công việc</CardTitle>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
          <Input placeholder='Từ khóa' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <Input placeholder='Email' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
          <Input placeholder='UID' value={uidInput} onChange={(e) => setUidInput(e.target.value)} />
          <Input placeholder='Người kháng' value={appealedByInput} onChange={(e) => setAppealedByInput(e.target.value)} />
          <Input placeholder='Người sử dụng' value={usedByInput} onChange={(e) => setUsedByInput(e.target.value)} />
          <Input placeholder='Sàn kháng' value={appealPlatformInput} onChange={(e) => setAppealPlatformInput(e.target.value)} />
          <Input placeholder='Mức độ hiếm' value={rarityLevelInput} onChange={(e) => setRarityLevelInput(e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
