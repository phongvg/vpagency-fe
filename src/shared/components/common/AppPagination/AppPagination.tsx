import { getPaginationRange } from "@/shared/components/common/AppPagination/pagination.util";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { cn } from "@/shared/libs/utils";

interface PaginationProps {
  page?: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  align?: "left" | "center" | "right";
}

export default function AppPagination({ page = 1, totalPages, onPageChange, siblingCount = 1, align = "right" }: PaginationProps) {
  const pages = getPaginationRange({
    currentPage: page,
    totalPages,
    siblingCount,
  });

  return (
    <Pagination className={cn(align === "left" && "justify-start", align === "center" && "justify-center", align === "right" && "justify-end")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(page - 1)}
            className={cn("cursor-pointer", page === 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {pages.map((p, index) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${p}`} className='cursor-pointer'>
              <PaginationLink isActive={p === page} onClick={() => onPageChange(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(page + 1)}
            className={cn("cursor-pointer", page === totalPages && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
