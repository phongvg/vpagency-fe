type PaginationRange = (number | "ellipsis")[];

interface GetPaginationRangeParams {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
}

export const getPaginationRange = ({ currentPage, totalPages, siblingCount }: GetPaginationRangeParams): PaginationRange => {
  const totalNumbers = siblingCount * 2 + 5; // 1 current + 2*sibling + 2 (first & last) + 2 ellipsis

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  // Case 1: No left ellipsis, show right ellipsis
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", lastPageIndex];
  }

  // Case 2: Show left ellipsis, no right ellipsis
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => lastPageIndex - rightItemCount + 1 + i);
    return [firstPageIndex, "ellipsis", ...rightRange];
  }

  // Case 3: Show both ellipsis
  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
    return [firstPageIndex, "ellipsis", ...middleRange, "ellipsis", lastPageIndex];
  }

  return [];
};
