import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  api,
  myToast,
  dateFormatter,
  useDistinctStatuses,
} from "../../components/utils";
import {
  Button,
  Heading,
  Table,
  Pagination,
  Select,
  Input,
} from "../../components/common";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [status, setStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const getPatients = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { result, totalPages },
      } = await api.get(
        `/patient?page=${page}&status=${status.toLowerCase()}&searchText=${searchText}`
      );
      setPatients(result);
      setTotalPages(totalPages);
    } catch (err) {
      myToast(err.response.data.error, "failure");
    } finally {
      setLoading(false);
    }
  }, [page, status, searchText]);
  useEffect(() => {
    let timeoutID = setTimeout(() => {
      getPatients();
    }, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [page, status, searchText, getPatients]);

  const deletePatient = async (id) => {
    try {
      await api.delete(`/patient/${id}`);
      getPatients();
      myToast("Patient deleted successfully", "success");
    } catch (err) {
      myToast(err.response.data.message, "failure");
    }
  };
  const statuses = useDistinctStatuses();
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading level={2}>
          Manage Patients
        </Heading>
        <div className="flex items-center gap-4">
          <Input
            label="Search Patient"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            label="Filter By Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            {statuses.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status}
              </option>
            ))}
          </Select>
          <Link to="/patients/add-patient">
            <Button>Add Patient</Button>
          </Link>
        </div>
      </div>
      <Table
        tHead={[
          "Name",
          "Age",
          "Contact Info",
          "Created At",
          "Updated At",
          "Actions",
        ]}
        loading={loading}
      >
        {patients.map((patient) => (
          <tr key={patient._id}>
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>
              <div className="flex flex-col">
                <a
                  className="hover:text-secondary"
                  href={`mailto:${patient.email}`}
                >
                  {patient.email}
                </a>
                <a
                  className="hover:text-secondary"
                  href={`tel:${patient.phone}`}
                >
                  +91 {patient.phone}
                </a>
              </div>
            </td>
            <td className="w-36">{dateFormatter(patient.createdAt)}</td>
            <td className="w-36">{dateFormatter(patient.updatedAt)}</td>
            <td>
              <div className="flex">
                <span
                  className="p-2 hover:text-primary cursor-pointer"
                  onClick={() => deletePatient(patient._id)}
                >
                  <RiDeleteBin6Line />
                </span>
                <Link
                  className="p-2 hover:text-primary"
                  to={`/patients/edit-patient/${patient._id}`}
                >
                  <RiEditBoxLine />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </Table>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ManagePatients;
