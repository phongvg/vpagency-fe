import type { AppealedProxyListParams } from "@/modules/appealedProxy/types/appealedProxy.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/Card";
import { Input } from "@/shared/components/ui/input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";

interface AppealedProxyListFilterProps {
  params: AppealedProxyListParams;
  setParams: React.Dispatch<React.SetStateAction<AppealedProxyListParams>>;
}

export default function AppealedProxyListFilter({ params, setParams }: AppealedProxyListFilterProps) {
  const [searchInput, setSearchInput] = useState<string | undefined>(params.search);
  const [protocolInput, setProtocolInput] = useState<string | undefined>(params.protocol);
  const [countryInput, setCountryInput] = useState<string | undefined>(params.country);
  const [sourceInput, setSourceInput] = useState<string | undefined>(params.source);
  const [userInput, setUserInput] = useState<string | undefined>(params.user);

  const searchDebounce = useDebounce(searchInput, 500);
  const protocolDebounce = useDebounce(protocolInput, 500);
  const countryDebounce = useDebounce(countryInput, 500);
  const sourceDebounce = useDebounce(sourceInput, 500);
  const userDebounce = useDebounce(userInput, 500);

  useEffect(() => {
    if (searchDebounce !== params.search) setParams((prev) => ({ ...prev, search: searchDebounce, page: 1 }));
  }, [searchDebounce, params.search, setParams]);

  useEffect(() => {
    if (protocolDebounce !== params.protocol) setParams((prev) => ({ ...prev, protocol: protocolDebounce, page: 1 }));
  }, [protocolDebounce, params.protocol, setParams]);

  useEffect(() => {
    if (countryDebounce !== params.country) setParams((prev) => ({ ...prev, country: countryDebounce, page: 1 }));
  }, [countryDebounce, params.country, setParams]);

  useEffect(() => {
    if (sourceDebounce !== params.source) setParams((prev) => ({ ...prev, source: sourceDebounce, page: 1 }));
  }, [sourceDebounce, params.source, setParams]);

  useEffect(() => {
    if (userDebounce !== params.user) setParams((prev) => ({ ...prev, user: userDebounce, page: 1 }));
  }, [userDebounce, params.user, setParams]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lọc proxy</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Input placeholder='Tìm kiếm...' value={searchInput || ""} onChange={(e) => setSearchInput(e.target.value || undefined)} />
        <Input placeholder='Protocol' value={protocolInput || ""} onChange={(e) => setProtocolInput(e.target.value || undefined)} />
        <Input placeholder='Quốc gia' value={countryInput || ""} onChange={(e) => setCountryInput(e.target.value || undefined)} />
        <Input placeholder='Nguồn' value={sourceInput || ""} onChange={(e) => setSourceInput(e.target.value || undefined)} />
        <Input placeholder='Người dùng' value={userInput || ""} onChange={(e) => setUserInput(e.target.value || undefined)} />
      </CardContent>
    </Card>
  );
}
