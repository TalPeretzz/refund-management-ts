import db from "../models";
import { Op } from "sequelize";
import { IRequest, transformRequest } from "../types/IRequest";
import Logger from "../utils/logget";
import NotificationService from "./NotificationService";
import EmployeeService from "./EmployeeService";

class RefundRequestService {
  private requests: IRequest[] = [];
  private employeeService: EmployeeService;

  constructor() {
    this.initializeRequests();
    this.employeeService = new EmployeeService();
  }

  private async initializeRequests() {
    this.requests = await this.getAllRequests();
  }

  /**
   * Get all refund requests
   */
  async getAllRequests(startDate?: Date | null, endDate?: Date | null) {
    const whereClause: any = {};

    if (startDate) {
      whereClause.createdAt = { [Op.gte]: startDate };
    }
    if (endDate) {
      whereClause.createdAt = { ...whereClause.createdAt, [Op.lte]: endDate };
    }
    const dbResponse = await db.RefundRequest.findAll({ where: whereClause });
    const transformedRequests = dbResponse.map(transformRequest);
    return transformedRequests;
  }

  /**
   * Get requests for a specific employee
   */
  async getRequestsByEmployee(employeeId: string) {
    console.log("employeeId", employeeId);
    const dbResponse = await db.RefundRequest.findAll({
      where: { employeeId },
    });
    console.log("dbResponse", dbResponse);
    const transformedRequests = dbResponse.map(transformRequest);
    return transformedRequests;
  }

  /**
   * Create a new refund request
   */
  async createRequest(data: {
    title: string;
    description: string;
    amount: number;
    attachment: Express.Multer.File | null;
    employeeId: string;
  }) {
    const createdRequest = await db.RefundRequest.create(data);
    const transformedRequests = transformRequest(createdRequest);
    this.requests.push();
    const employee = this.employeeService.getEmployeeById(data.employeeId);
    const manager = this.employeeService.getEmployeeManagerByEmployeeId(
      data.employeeId
    );
    NotificationService.sendNewRequestNotification(
      "fdsf@fsdf.fa",
      "fds",
      data.title
    );
    return transformedRequests;
  }

  async rejectRequest(id: string) {
    const request = await this.updateRequestStatus(id, "Rejected");
    Logger.info(`Request ${id} rejected`);
    return transformRequest(request);
  }

  async approveRequest(id: string) {
    const request = await this.updateRequestStatus(id, "Approved");
    Logger.info(`Request ${id} approved`);
    return transformRequest(request);
  }

  /**
   * Update request status (approve/reject)
   */
  async updateRequestStatus(id: string, status: "Approved" | "Rejected") {
    const request = await db.RefundRequest.findByPk(id);
    if (!request) throw new Error("Request not found");

    request.status = status;
    await request.save();
    return request;
  }

  async getManagerPendingRequests(managerId: string) {
    return await db.RefundRequest.findAll({
      where: { status: "Pending" },
    });
  }
}

export default RefundRequestService;
