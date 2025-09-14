import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-10">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "px-3 py-2 rounded-md border text-sm transition",
          currentPage === 1
            ? "cursor-not-allowed text-gray-400 border-gray-200"
            : "text-gray-700 border-gray-300 hover:bg-amber-100 hover:border-amber-300"
        )}
      >
        Prev
      </button>

      {pages.map((page) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "px-3 py-2 rounded-md border text-sm transition",
            currentPage === page
              ? "bg-amber-300 text-gray-900 border-amber-400 font-semibold"
              : "text-gray-700 border-gray-300 hover:bg-amber-100 hover:border-amber-300"
          )}
        >
          {page}
        </motion.button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "px-3 py-2 rounded-md border text-sm transition",
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400 border-gray-200"
            : "text-gray-700 border-gray-300 hover:bg-amber-100 hover:border-amber-300"
        )}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
