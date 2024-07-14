import { useAllStateContext } from "@/context/AllStateContext";
import { useSuggestionDataContext } from "@/context/SuggestionDataContext";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

const AdminReportView = () => {
  const { allSuggestion } = useAllStateContext();
  const { exportToPdf } = useSuggestionDataContext();

  return (
    <div className="p-1.5">
      <table className="table mt-1 border rounded">
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th>NIK</th>
            <th>Nama</th>
            <th>Judul</th>
            <th className="text-center">Tanggal</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {allSuggestion.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="text-center ">{index + 1}</td>
              <td>{item.nik}</td>
              <td>{item.name}</td>
              <td>{item.title}</td>
              <td className="text-center ">
                {format(Date(item.date), "dd/MM/yyyy")}
              </td>
              <td className="text-center">
                <div
                  className={`badge ${
                    item.status === "ACC"
                      ? "badge-primary"
                      : item.status === "Disapprove"
                      ? "badge-accent"
                      : "badge-secondary"
                  }`}>
                  {item.status}
                </div>
              </td>
              <td className="text-center">
                <button
                  onClick={() => exportToPdf(item.id)}
                  className="btn btn-sm">
                  <FontAwesomeIcon icon={faFileExport} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminReportView;
