import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ open, onClose }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className="relative bg-white rounded-xl p-4 w-100 max-w-lg shadow-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border border-gray-200 rounded px-3 py-2 outline-none text-black placeholder-gray-400"
          />

          <button type="submit" className="bg-black text-white px-4 rounded">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
