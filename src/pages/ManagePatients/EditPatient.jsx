import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api, myToast } from "../../components/utils";
import { Button, Heading, TextArea, Select } from "../../components/common";

const EditPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    status: "",
    note: "",
  });

  const getPatient = async () => {
    try {
      const { data } = await api.get("/patient/" + id);
      setPatient(data.result);
    } catch (err) {
      myToast(err.response.data.message, "failure");
    }
  };
  useEffect(() => {
    getPatient();
  }, []);

  const updatePatient = async () => {
    try {
      const { data } = await api.patch("/patient/" + id, {
        status: patient.status,
        note: patient.note,
      });
      myToast(data.msg, "success");
    } catch (err) {
      myToast(err.response.data.error, "failure");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading level={2}>Edit Patient</Heading>
        <div className="flex items-center gap-4">
          <Link to="./view-prescriptions">
            <Button theme="secondary">View Past Prescriptions</Button>
          </Link>
          <Link to="./add-prescription">
            <Button>Add Prescription</Button>
          </Link>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePatient();
        }}
        className="max-w-[30rem]"
      >
        <section className="flex flex-col gap-4 mb-6">
          <Heading level={4}>Account Details</Heading>
          <p className="flex gap-4 text-black">
            <span className="text-sm font-medium w-20">Account ID:</span>
            <span className="text-sm">{id}</span>
          </p>
          <p className="flex gap-4 text-black">
            <span className="text-sm font-medium w-20">Name:</span>
            <span className="text-sm">{patient.name}</span>
          </p>
          <p className="flex gap-4 text-black">
            <span className="text-sm font-medium w-20">Age:</span>
            <span className="text-sm">{patient.age}</span>
          </p>
          <p className="flex gap-4 text-black">
            <span className="text-sm font-medium w-20">Phone:</span>
            <span className="text-sm">{patient.phone}</span>
          </p>
          <p className="flex gap-4 text-black">
            <span className="text-sm font-medium w-20">Email:</span>
            <span className="text-sm">{patient.email}</span>
          </p>
        </section>
        <section className="flex flex-col gap-4 mb-6">
          <Heading level={4}>Patient Details</Heading>
          <Heading level={6}>
            Please categorize the patient based on their current status
          </Heading>
          <Select
            label="Status"
            value={patient.status}
            onChange={(e) => setPatient({ ...patient, status: e.target.value })}
            required
          >
            <option value="">Select Status</option>
            <option value="pregnancy">Pregnancy</option>
            <option value="menstrual">Menstrual</option>
          </Select>
          <Heading level={6}>
            Any other notes you would like to add about the patient
          </Heading>
          <TextArea
            label="Additional Notes"
            value={patient.note}
            onChange={(e) =>
              setPatient({
                ...patient,
                note: e.target.value,
              })
            }
            rows={6}
            className="resize-none"
          />
        </section>
        <Button className="w-full" type="submit">
          Update Patient
        </Button>
      </form>
    </div>
  );
};

export default EditPatient;