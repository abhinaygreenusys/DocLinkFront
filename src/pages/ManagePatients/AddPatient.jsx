import { useState } from "react";
import { api, myToast } from "../../components/utils";
import {
  Input,
  Button,
  Heading,
  TextArea,
  Select,
} from "../../components/common";

const AddPatient = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const addPatient = async () => {
    try {
      const { data } = await api.post("/patient", {
        name,
        email,
        phone,
        age,
        status,
        note,
      });
      myToast(data.msg, "success");
    } catch (err) {
      myToast(err.response.data.error, "failure");
    }
  };

  return (
    <div>
      <Heading level={2} className="mb-4">
        Add Patient
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPatient();
        }}
        className="max-w-[30rem]"
      >
        <section className="flex flex-col gap-4 mb-6">
          <Heading level={4}>Account Details</Heading>
          <p>
            The password will be randomly generated and sent to the
            patient&apos;s email address (which can be changed later by the patient)
          </p>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Age"
            value={age}
            onChange={(e) => {
              const age = e.target.value;
              if (!isNaN(age) && age.length <= 60) setAge(age);
            }}
            required
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="tel"
            label="Phone"
            value={phone}
            onChange={(e) => {
              const phone = e.target.value;
              if (!isNaN(phone) && phone.length <= 10) setPhone(phone);
            }}
            required
          />
        </section>
        <section className="flex flex-col gap-4 mb-6">
          <Heading level={4}>Patient Details</Heading>
          <p className="text-sm text-black">
            Prescriptions and other patient-specific data can be added later via
            &quot;Manage Patients&quot; section.
          </p>
          <Heading level={6}>
            Please categorize the patient based on their current status
          </Heading>
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </section>
        <Button className="w-full" type="submit">
          Add Patient
        </Button>
      </form>
    </div>
  );
};

export default AddPatient;
