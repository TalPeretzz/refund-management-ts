export interface IRequest {
  id?: string;
  date?: string;
  title: string;
  description: string;
  amount: number;
  attachment: string | null;
  status?: "Pending" | "Approved" | "Rejected" | "Manager Approved";
  employeeId: string;
}

export interface IRequestResponse extends IRequest {
  employeeName: string;
}

export const transformRequest = (data: any): IRequest => {
  const date = new Date(data.createdAt);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;

  return {
    id: data.id,
    date: formattedDate,
    title: data.title,
    description: data.description,
    amount: data.amount,
    attachment: data.attachment,
    status: data.status,
    employeeId: data.employeeId,
  };
};
