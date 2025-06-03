import styles from "../../styles/components/pagination.module.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface PaginationProps {
  totalCount: number;
  loading?: boolean;
  currentPage: number;
  itemsPerPage: number;
  //Fonction de changement de page en props
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  totalCount,
  loading = false,
  currentPage,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  //Calcul du nombre de pages
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || loading}
        className={styles.pageButton}
      >
        <MdNavigateBefore />
      </button>

      <div className={styles.pageNumbers}>
        {/* Génération des boutons de pagination */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={loading}
            className={
              currentPage === page ? `${styles.focused}` : `${styles.unfocused}`
            }
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || loading}
        className={styles.pageButton}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
}
