import UserService from "./UserService";
import ReportService from "./ReportService";

export class EmployeeService extends UserService {
  private report: ReportService;
  constructor(report: ReportService) {
    super();
    this.report = report;
  }

  async refundRequest() {}

  async historyReport() {}
}

export default EmployeeService;
