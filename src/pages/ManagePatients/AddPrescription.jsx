import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  Input,
  TextArea,
  Button,
  Select,
} from "../../components/common";
import { api, myToast } from "../../components/utils";
import { MdOutlineClose } from "react-icons/md";

const AddPrescription = () => {
  const { id } = useParams();
  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      show: true,
    },
  ]);
  const [exercises, setExercises] = useState([
    {
      name: "",
      instructions: "",
      partOfDay: "", // morning, evening
      show: true,
    },
  ]);
  const [diet, setDiet] = useState([
    {
      name: "",
      partOfDay: "", // breakfast, lunch, dinner
      show: true,
    },
  ]);
  const [refrainFrom, setRefrainFrom] = useState("");
  const [note, setNote] = useState("");

  const addPrescription = async () => {
    const filteredData = {
      medicines: medicines
        .filter((m) => m.name && m.dosage)
        .map((m) => ({ name: m.name, dosage: m.dosage })),
      exercises: exercises
        .filter((e) => e.name && e.instructions && e.partOfDay)
        .map((e) => ({
          name: e.name,
          instructions: e.instructions,
          partOfDay: e.partOfDay,
        })),
      diet: diet
        .filter((d) => d.name && d.partOfDay)
        .map((d) => ({ name: d.name, partOfDay: d.partOfDay })),
      refrainFrom,
      note,
    };
    try {
      const { data } = await api.post(`/patient/${id}/prescription`, filteredData);
      myToast(data.msg, "success");
    } catch (error) {
      myToast(error?.response?.data?.msg, "failure");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPrescription();
      }}
      className="max-w-[30rem] mb-6"
    >
      <Heading level={2} className="mb-4">
        Add Prescription
      </Heading>
      <section className="mb-8">
        <Heading level={4}>Medicines</Heading>
        <div>
          {medicines.map((medicine, index) => (
            <div
              key={index}
              className={
                medicine.show
                  ? "flex flex-col gap-4 p-2 border-dashed border rounded-lg my-2"
                  : "hidden"
              }
            >
              <div className="flex justify-between items-center gap-4">
                <Heading level={6}>Please fill medicine data group</Heading>
                <span
                  onClick={() => {
                    const newMedicines = [...medicines];
                    newMedicines[index].show = false;
                    setMedicines(newMedicines);
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  <MdOutlineClose />
                </span>
              </div>
              <Input
                type="text"
                label="Medicine Name"
                value={medicine.name}
                onChange={(e) => {
                  const newExercises = [...medicines];
                  newExercises[index].name = e.target.value;
                  setMedicines(newExercises);
                }}
              />
              <Input
                type="text"
                label="Dosage"
                value={medicine.dosage}
                onChange={(e) => {
                  const newExercises = [...medicines];
                  newExercises[index].dosage = e.target.value;
                  setMedicines(newExercises);
                }}
              />
            </div>
          ))}
          <Button
            theme="secondary"
            className="w-full"
            onClick={() =>
              setMedicines([
                ...medicines,
                { name: "", dosage: "", duration: "", show: true },
              ])
            }
          >
            Add Medicine
          </Button>
        </div>
      </section>
      <section className="mb-8">
        <Heading level={4}>Exercises</Heading>
        <div>
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className={
                exercise.show
                  ? "flex flex-col gap-4 p-2 border-dashed border rounded-lg my-2"
                  : "hidden"
              }
            >
              <div className="flex justify-between items-center gap-4">
                <Heading level={6}>Please fill exercise data group</Heading>
                <span
                  onClick={() => {
                    const newExercises = [...exercises];
                    newExercises[index].show = false;
                    setExercises(newExercises);
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  <MdOutlineClose />
                </span>
              </div>
              <Input
                type="text"
                label="Exercise Name"
                value={exercise.name}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index].name = e.target.value;
                  setExercises(newExercises);
                }}
              />
              <Input
                type="text"
                label="Instructions"
                value={exercise.instructions}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index].instructions = e.target.value;
                  setExercises(newExercises);
                }}
              />
              <Select
                label="Part of Day"
                value={exercise.partOfDay}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index].partOfDay = e.target.value;
                  setExercises(newExercises);
                }}
              >
                <option value="">Select Part of Day</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </Select>
            </div>
          ))}
          <Button
            theme="secondary"
            className="w-full"
            onClick={() =>
              setExercises([
                ...exercises,
                { name: "", instructions: "", partOfDay: "", show: true },
              ])
            }
          >
            Add Exercise
          </Button>
        </div>
      </section>
      <section className="mb-8">
        <Heading level={4} className="mb-2">
          Diet
        </Heading>
        <div>
          {diet.map((d, index) => (
            <div
              key={index}
              className={
                d.show
                  ? "flex flex-col gap-4 p-2 border-dashed border rounded-lg my-2"
                  : "hidden"
              }
            >
              <div className="flex justify-between items-center gap-4">
                <Heading level={6}>Please fill diet data group</Heading>
                <span
                  onClick={() => {
                    const newDiet = [...diet];
                    newDiet[index].show = false;
                    setDiet(newDiet);
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  <MdOutlineClose />
                </span>
              </div>
              <Input
                type="text"
                label="Diet Name"
                value={d.name}
                onChange={(e) => {
                  const newDiet = [...diet];
                  newDiet[index].name = e.target.value;
                  setDiet(newDiet);
                }}
              />
              <Select
                label="Part of Day"
                value={d.partOfDay}
                onChange={(e) => {
                  const newDiet = [...diet];
                  newDiet[index].partOfDay = e.target.value;
                  setDiet(newDiet);
                }}
              >
                <option value="">Select Part of Day</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="other">Other</option>
              </Select>
            </div>
          ))}
          <Button
            theme="secondary"
            className="mt-4 w-full"
            onClick={() =>
              setDiet([...diet, { name: "", partOfDay: "", show: true }])
            }
          >
            Add Diet
          </Button>
        </div>
      </section>
      <section className="mb-8">
        <Heading level={4} className="mb-2">
          Other information
        </Heading>
        <TextArea
          label="Refrain From"
          value={refrainFrom}
          onChange={(e) => setRefrainFrom(e.target.value)}
          className="mb-4"
        />
        <TextArea
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </section>
      <Button type="submit" className="w-full">
        Add Prescription
      </Button>
    </form>
  );
};

export default AddPrescription;
