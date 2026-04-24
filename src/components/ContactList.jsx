import { useEffect, useState } from "react";
import { fetchContact } from "../api/contact.js";
import ContactMessage from "../components/ContactMessage.jsx";

export default function ContactList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cursorStack, setCursorStack] = useState([null]); // history
  const [currentIndex, setCurrentIndex] = useState(0);

  const [nextCursorMap, setNextCursorMap] = useState({});
  const [hasMoreMap, setHasMoreMap] = useState({});

  const size = 10;

  const loadMessages = async (cursor, index) => {
    setLoading(true);
    try {
      const res = await fetchContact(cursor, size);

      const { data, nextCursor, hasMore } = res.data;

      setMessages(data);
      setNextCursorMap((prev) => ({
        ...prev,
        [index]: nextCursor,
      }));

      // ✅ store hasMore per page
      setHasMoreMap((prev) => ({
        ...prev,
        [index]: hasMore,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cursor = cursorStack[currentIndex];
    loadMessages(cursor, currentIndex);
  }, [currentIndex, cursorStack]);

  // 🔹 Next
  const handleNext = () => {
    if (!hasMoreMap[currentIndex]) return;

    const nextCursor = nextCursorMap[currentIndex];

    setCursorStack((prev) => [...prev, nextCursor]);
    setCurrentIndex((prev) => prev + 1);
  };

  // 🔹 Previous
  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="p-6 bg-gray-600">
      <h2 className="text-xl font-bold mb-4 text-center text-white">
        All Messages
      </h2>

      {/* Messages */}
      <div className="space-y-4 flex gap-4 flex-wrap justify-center items-center">
        {messages.map((msg, index) => (
          <ContactMessage
            key={index}
            name={msg.name}
            email={msg.email}
            message={msg.message}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">Page {currentIndex + 1}</span>

        <button
          onClick={handleNext}
          disabled={!hasMoreMap[currentIndex]}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
        <br />
        <div>
          {loading && <p>Loading...</p>}
          {!loading && messages.length === 0 && <p>No messages found</p>}
        </div>
      </div>
    </div>
  );
}
