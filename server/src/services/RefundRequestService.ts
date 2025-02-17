import db from "../models";
import { Op } from "sequelize";
import { IRequest, transformRequest } from "../types/IRequest";
import Logger from "../utils/logget";
import NotificationService from "./NotificationService";
import EmployeeService from "./EmployeeService";
import { IEmployee } from "../types/IUser";

class RefundRequestService {
  private requests: IRequest[] = [];

  constructor() {
    this.initializeRequests();
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
  async createRequest(data: Omit<IRequest, "id">, employee: IEmployee) {
    const createdRequest = await db.RefundRequest.create(data);
    const transformedRequests = transformRequest(createdRequest);
    this.requests.push();

    NotificationService.sendNewRequestNotification(
      employee.Email,
      employee.FullName,
      data.title
    );
    return transformedRequests;
  }

  async rejectRequest(id: string) {
    const request = await this.updateRequestStatus(id, "Rejected");
    Logger.info(`Request ${id} rejected`);
    return transformRequest(request);
  }

  async approveRequest(
    id: string,
    status: "Approved" | "Rejected" | "Manager Approved"
  ) {
    const request = await this.updateRequestStatus(id, status);
    Logger.info(`Request ${id} approved`);
    return transformRequest(request);
  }

  /**
   * Update request status (approve/reject)
   */
  async updateRequestStatus(
    id: string,
    status: "Approved" | "Rejected" | "Manager Approved"
  ) {
    const request = await db.RefundRequest.findByPk(id);
    if (!request) throw new Error("Request not found");

    request.status = status;
    this.requests = this.requests.map((req) => {
      if (req.id === id) {
        req.status = status;
      }
      return req;
    });
    this.requests = await this.getAllRequests();

    await request.save();
    return request;
  }

  async getManagerPendingRequests(statuses: string[]) {
    this.requests = await this.getAllRequests();
    return this.requests.filter((request) =>
      statuses.includes(request.status!)
    );
  }
}

export default RefundRequestService;
