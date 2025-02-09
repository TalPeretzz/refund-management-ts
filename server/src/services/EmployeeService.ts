import UserService from "./UserService";
import ReportService from "./ReportService";

export class EmployeeService extends UserService {
  // private report: ReportService;

  constructor() {
    super();
  }

  async refundRequest() {}

  async historyReport() {}

  async getEmployeeById(employeeId: string) {
    // return this.getEmployeeById(employeeId);
  }

  async getEmployeeManagerByEmployeeId(employeeId: string) {}
}

export default EmployeeService;
