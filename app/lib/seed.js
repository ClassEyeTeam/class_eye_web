import axios from "axios";

const API_ENDPOINT = `http://localhost:8088/UNIVERSITY-SERVICE/departments`;

const departments = [
  { name: "Computer Science", description: "Department of Computer Science" },
  { name: "Mathematics", description: "Department of Mathematics" },
  { name: "Physics", description: "Department of Physics" },
  // Add more departments as needed
];

const seedDepartments = async () => {
  try {
    for (const department of departments) {
      const response = await axios.post(API_ENDPOINT, department);
      console.log(`Created department: ${response.data.name}`);
    }
    console.log("Seeding completed successfully.");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error seeding departments:", error.response.data);
    } else {
      console.error("Error seeding departments:", error);
    }
  }
};

seedDepartments();
