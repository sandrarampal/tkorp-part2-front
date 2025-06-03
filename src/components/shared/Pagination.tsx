import styles from "../../styles/components/pagination.module.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useState } from "react";

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
  const [showAllPages, setShowAllPages] = useState(false);

  //Rendre les numéros de page visibles ou non 
  const renderPageNumbers = () => {
    if (totalPages <= 7 || showAllPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const maxVisiblePages = 3;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Toujours afficher la première page
    pages.push(1);

    // Calculer les pages autour de la page courante
    let startPage = Math.max(2, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

    // Ajuster si on est proche du début
    if (currentPage <= halfVisible + 1) {
      endPage = maxVisiblePages;
    }
    // Ajuster si on est proche de la fin
    if (currentPage >= totalPages - halfVisible) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    // Ajouter l'ellipse de début si nécessaire
    if (startPage > 2) {
      pages.push("...");
    }

    // Ajouter les pages du milieu
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ajouter l'ellipse de fin si nécessaire
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Toujours afficher la dernière page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

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
        {renderPageNumbers().map((page, index) => (
          page === "..." ? (
            <button
              key={`ellipsis-${index}`}
              onClick={() => setShowAllPages(!showAllPages)}
              className={styles.ellipsis}
            >
              {page}
            </button>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              disabled={loading}
              className={
                currentPage === page ? styles.focused : styles.unfocused
              }
            >
              {page}
            </button>
          )
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
