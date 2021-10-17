import api from "../../axios";
import useSWR from "swr";
import AdminLayout from "../../components/AdminLayout";
import withAuth from "../../HOC/withAuth";
import withAdmin from "../../HOC/withAdmin";

const fetcher = (url) => api.get(url).then((res) => res.data);

const Dashboard = () => {
  const { data, error } = useSWR("/user/profile", fetcher);

  return (
    <AdminLayout>
      <div>
        <main>Admin Dashboard</main>
        <pre>{data ? JSON.stringify(data) : ""}</pre>
        {error && <p>wrong</p>}
      </div>
    </AdminLayout>
  );
};

export default withAdmin(withAuth(Dashboard));
