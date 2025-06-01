import { useRouter } from "next/router";

interface PaginationProps {
  totalCount: number;
  currentPath: string;
  loading?: boolean;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  totalCount,
  currentPath,
  loading = false,
  currentPage,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Précédent
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={loading}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              backgroundColor: currentPage === page ? "#0070f3" : "#f0f0f0",
              color: currentPage === page ? "white" : "black",
              border: currentPage === page ? "1px solid #0070f3" : "1px solid #ccc",
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Suivant
        </button>
      </div>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Page {currentPage} sur {totalPages} {loading && "(Chargement...)"}
      </p>
    </>
  );
}
