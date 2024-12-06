export interface Department {
  id: number;
  name: string;
  description: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: Department;
}
export type TeacherRequest = Omit<Teacher, "department"> & {
  departmentId: number;
};
