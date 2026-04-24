import AdminUser from "../components/AdminUser.jsx";
import PostCard from "../components/PostCard.jsx";
import ContactMessages from "../components/ContactList.jsx";

export default function Dashboard() {
  return (
    <>
      <div>
        <PostCard />
        <AdminUser />
        <ContactMessages />
      </div>
    </>
  );
}
