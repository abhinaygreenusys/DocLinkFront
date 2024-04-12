import { useState, useEffect } from "react";
import { api, myToast } from "../../components/utils";
import { Input, InputPassword, Button, Heading } from "../../components/common";
import { MdOutlineClose } from "react-icons/md";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [qualifications, setQualifications] = useState([
    {
      degree: "",
      passingYear: "",
      show: true,
    },
  ]);
  const [experience, setExperience] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  const getProfile = async () => {
    try {
      const {
        data: { result },
      } = await api.get("/profile");
      setName(result.name);
      setEmail(result.email);
      if (result.qualifications.length > 0)
        setQualifications(
          result.qualifications.map((qualification) => ({
            ...qualification,
            show: true,
          }))
        );
      setExperience(result.experience);
      setWorkingHours(result.workingHours);
    } catch (err) {
      myToast(err.response.data.message, "failure");
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = async (filteredQualifications) => {
    try {
      const { data } = await api.put("/profile", {
        name,
        email,
        password,
        newPassword,
        qualifications: filteredQualifications,
        experience,
        workingHours,
      });
      myToast(data.msg, "success");
    } catch (err) {
      myToast(err.response.data.error, "failure");
    }
  };
  const validateQualifications = () => {
    // remove all qualifications that have show as false
    const filteredQualifications = qualifications
      .filter((qualification) => qualification.show)
      .map(({ degree, passingYear }) => ({ degree, passingYear }));
    // check if any qualification key is empty
    return [
      filteredQualifications,
      filteredQualifications.every(
        (qualification) => qualification.degree && qualification.passingYear
      ),
    ];
  };

  return (
    <div>
      <Heading level={2} className="mb-4">
        Edit Profile
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [filteredQualifications, isValid] = validateQualifications();
          if (isValid) updateProfile(filteredQualifications);
          else myToast("Please fill all the qualification details", "failure");
        }}
        className="max-w-[30rem]"
      >
        <section className="flex flex-col gap-4 mb-6">
          <Heading level={4}>Account Details</Heading>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            label="Email"
            value={email}
            disabled
          />
          <InputPassword
            label="Current Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputPassword
            label="New Password (optional)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </section>
        <section className="flex flex-col gap-4 mb-6">
          <Heading level={4}>Professional Details</Heading>
          <Input
            label="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
          <Input
            label="Working Hours"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            required
          />
          {qualifications.map((qualification, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 w-full relative ${
                qualification.show ? "" : "hidden"
              }`}
            >
              <Input
                label="Degree"
                value={qualification.degree}
                onChange={(e) => {
                  const newQualifications = [...qualifications];
                  newQualifications[index].degree = e.target.value;
                  setQualifications(newQualifications);
                }}
                className="w-3/4"
              />
              <Input
                label="Passing Year"
                value={qualification.passingYear}
                onChange={(e) => {
                  const newQualifications = [...qualifications];
                  newQualifications[index].passingYear = e.target.value;
                  setQualifications(newQualifications);
                }}
                className="w-1/4"
              />
              <span
                className="absolute -right-10 text-black cursor-pointer p-2 scale-150"
                onClick={() => {
                  const newQualifications = [...qualifications];
                  newQualifications[index].show = false;
                  setQualifications(newQualifications);
                }}
              >
                <MdOutlineClose />
              </span>
            </div>
          ))}
          <Button
            className="w-full"
            theme="secondary"
            type="button"
            onClick={() => {
              setQualifications([
                ...qualifications,
                { degree: "", passingYear: "", show: true },
              ]);
            }}
          >
            Add Another Qualification
          </Button>
        </section>
        <Button className="w-full" type="submit">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
