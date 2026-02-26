import ChangePasswordModal from "@/modules/user/components/ChangePasswordModal";
import EditUserModal from "@/modules/user/components/EditUserModal";
import UserTable from "@/modules/user/components/UserTable";
import type { UserListParams } from "@/modules/user/types/user.type";
import SearchInput from "@/shared/components/SearchInput";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Fragment, useEffect, useState } from "react";

export default function UserListPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [params, setParams] = useState<UserListParams>({
    page: 1,
    limit: 10,
    search: undefined,
  });
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  const debounceSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setParams((prev) => ({ ...prev, search: debounceSearch, page: 1 }));
  }, [debounceSearch]);

  const handleOpenEdit = (id: string) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setSelectedUserId(null);
  };

  const handleOpenChangePassword = (id: string) => {
    setSelectedUserId(id);
    setIsChangePasswordModalOpen(true);
  };

  const handleCloseChangePassword = () => {
    setSelectedUserId(null);
    setIsChangePasswordModalOpen(false);
  };

  return (
    <Fragment>
      <div className='mb-2'>
        <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} placeholder='Tìm kiếm theo tên đăng nhập, email' />
      </div>

      <UserTable params={params} setParams={setParams} onOpenEdit={handleOpenEdit} onOpenChangePassword={handleOpenChangePassword} />

      <EditUserModal open={isEditModalOpen} onClose={handleCloseEdit} userId={selectedUserId} />

      <ChangePasswordModal open={isChangePasswordModalOpen} onClose={handleCloseChangePassword} userId={selectedUserId} />
    </Fragment>
  );
}
