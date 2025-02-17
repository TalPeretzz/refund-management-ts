import UserService from "./UserService";
import ReportService from "./ReportService";
import { IEmployee } from "../types/IUser";
import RefundRequestService from "./RefundRequestService";
import { IRequest } from "../types/IRequest";

export class EmployeeService extends UserService {
  private refundRequestService: RefundRequestService;
  private employee?: IEmployee;
  private employees: IEmployee[] = [];
  constructor() {
    super();
    this.initializeEmployee();
    this.refundRequestService = new RefundRequestService();
  }

  async initializeEmployee() {
    if (this.employees.length === 0) {
      const users = await this.getAllUsers();
      const employees = users.map((user) => {
        return {
          UserId: user.UserId,
          FullName: user.FullName,
          Email: user.Email,
          Role: user.Role,
          IsActive: user.IsActive,
          ManagerId: user.ManagerId,
        };
      });
      this.employees = employees;
    }
  }

  async refundRequest(request: IRequest) {
    const { currentEmployee } = this.getEmployeeAndManager(request.employeeId);
    return this.refundRequestService.createRequest(request, currentEmployee);
  }

  async historyReport(startDate?: Date | null, endDate?: Date | null) {
    const requests = await this.refundRequestService.getAllRequests(
      startDate,
      endDate
    );

    return this.buildResponse(requests, this.employees);
  }

  async getEmployeeById(employeeId: string) {
    const user = await this.getAllUsers();
    const userFind = user.find((user) => user.UserId === employeeId);
    if (!userFind) {
      throw new Error("User not found");
    }
    this.employee = userFind;
    return this.employee;
  }

  async getEmployeeManagerByEmployeeId(employeeId: string) {
    // return this.getEmployeeManagerByEmployeeId(employeeId);
    const user = await this.getAllUsers();
    const userFind = user.find((user) => user.UserId === employeeId);
    if (!userFind) {
      throw new Error("User not found");
    }
    this.employee = userFind;
    return this.employee;
  }

  async getRequestsByEmployee(employeeId: string) {
    const requests = await this.refundRequestService.getRequestsByEmployee(
      employeeId
    );
    return this.buildResponse(requests, this.employees);
  }

  async getManagerPendingRequests(managerId: string) {
    const managerEmployee = this.employees.filter(
      (employee) => employee.ManagerId === managerId
    );

    const managerEmployeeIds = managerEmployee.map(
      (employee) => employee.UserId
    );

    const pendingRequest =
      await this.refundRequestService.getManagerPendingRequests(["Pending"]);

    const onlyRelevantEmployees = pendingRequest.filter((request) =>
      managerEmployeeIds.includes(request.employeeId)
    );
    return this.buildResponse(onlyRelevantEmployees, managerEmployee);
  }

  async getAccountManagerPendingRequests(accountManagerId: string) {
    const pendingRequest =
      await this.refundRequestService.getManagerPendingRequests([
        "Pending",
        "Manager Approved",
      ]);
    return this.buildResponse(pendingRequest, this.employees);
  }

  private buildResponse(requests: IRequest[], employee: IEmployee[]) {
    return requests.map((request) => {
      return {
        ...request,
        employee: employee.find((emp) => emp.UserId === request.employeeId),
      };
    });
  }

  private getEmployeeAndManager(employeeId: string) {
    const currentEmployee = this.employees.find(
      (employee) => employee.UserId === employeeId
    );
    if (!currentEmployee) {
      throw new Error("Employee not found");
    }
    const manager = this.employees.find(
      (employee) => employee.UserId === currentEmployee.ManagerId
    );

    return { currentEmployee, manager };
  }
}

export default EmployeeService;
