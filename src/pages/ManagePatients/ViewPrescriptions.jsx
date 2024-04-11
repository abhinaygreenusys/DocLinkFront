import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api, myToast, dateFormatter } from "../../components/utils";
import { Button, Heading } from "../../components/common";

const ViewPrescriptions = () => {
  const { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([
    {
      createdAt: new Date(),
      medicines: [
        {
          name: "",
          dosage: "",
        },
      ],
      exercises: [
        {
          name: "",
          instructions: "",
          partOfDay: "", // morning, evening
        },
      ],
      diet: [
        {
          name: "",
          partOfDay: "", // breakfast, lunch, dinner
        },
      ],
      refrainFrom: "",
      note: "",
    },
  ]);

  const getPatientPrescriptions = async () => {
    try {
      const {
        data: { result },
      } = await api.get("/patient/" + id + "/prescriptions");
      setPrescriptions([...result, ...result]);
    } catch (err) {
      myToast(err.response.data.message, "failure");
    }
  };
  useEffect(() => {
    getPatientPrescriptions();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Heading level={2}>View Patient Prescriptions</Heading>
        <div className="flex items-center gap-4">
          <Link to={`/patients/edit-patient/${id}/add-prescription`}>
            <Button>Add Prescription</Button>
          </Link>
        </div>
      </div>
      {prescriptions.length === 0 && (
        <Heading level={6}>No prescriptions found</Heading>
      )}
      {prescriptions.map((patient) => (
        <div
          className="border border-grey rounded-2xl p-8 mb-8"
          key={patient._id}
        >
          <section className="mb-6">
            <Heading level={4}>
              Prescription added on {dateFormatter(patient.createdAt)}
            </Heading>
          </section>
          <section className="mb-6">
            <Heading level={4}>Medicines</Heading>
            <ul>
              {patient.medicines.map((medicine, index) => (
                <li key={index} className="my-2 ml-4 list-disc text-black">
                  <p className="font-medium leading-4">{medicine.name}</p>
                  <p className="text-sm">{medicine.dosage}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-6">
            <Heading level={4}>Exercises</Heading>
            <ul>
              {patient.exercises.map((exercise, index) => (
                <li key={index} className="my-2 ml-4 list-disc text-black">
                  <p className="font-medium leading-4">
                    {exercise.name} ({exercise.partOfDay})
                  </p>
                  <p className="text-sm">{exercise.instructions}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-6">
            <Heading level={4}>Diet</Heading>
            <ul>
              {patient.diet.map((diet, index) => (
                <li key={index} className="my-2 ml-4 list-disc text-black">
                  <p className="font-medium leading-4 capitalize">
                    {diet.partOfDay}
                  </p>
                  <p className="text-sm">{diet.name}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-6">
            <Heading level={4}>Refrain From</Heading>
            <p className="my-2 ml-4 text-black text-sm">
              {patient.refrainFrom}
            </p>
          </section>
          <section className="mb-6">
            <Heading level={4}>Note</Heading>
            <p className="my-2 ml-4 text-black text-sm">{patient.note}</p>
          </section>
        </div>
      ))}
    </div>
  );
};

export default ViewPrescriptions;
