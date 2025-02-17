import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import RefundRequestService from "../services/RefundRequestService";
import EmployeeService from "../services/EmployeeService";

class RefundRequestController {
  private refundRequestService: RefundRequestService;
  private employeeService: EmployeeService;

  constructor(
    refundRequestService: RefundRequestService,
    employeeService: EmployeeService
  ) {
    this.refundRequestService = refundRequestService;
    this.employeeService = employeeService;
  }

  /**
   * Get all refund requests
   */
  async getAllRequests(req: AuthRequest, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      //   const { user } = req.user;
      const parsedStartDate = startDate ? new Date(startDate as string) : null;
      const parsedEndDate = endDate ? new Date(endDate as string) : null;
      const requests = await this.employeeService.historyReport(
        parsedStartDate,
        parsedEndDate
      );
      res.json(requests);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching requests",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Get refund requests for a specific employee
   */
  async getRequestsByEmployee(req: AuthRequest, res: Response) {
    try {
      const { employeeId } = req.params;

      const requests = await this.employeeService.getRequestsByEmployee(
        employeeId
      );
      res.json(requests);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching employee requests",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Get refund requests pending manager approval
   */

  async getManagerPendingRequests(req: AuthRequest, res: Response) {
    try {
      const { managerId } = req.params;
      const requests = await this.employeeService.getManagerPendingRequests(
        managerId
      );

      res.json(requests);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching manager pending requests",
        error: (error as Error).message,
      });
    }
  }

  /**
   *
   * @param req
   * @param res
   * Get refund requests pending account manager approval
   */
  async getAccountManagerPendingRequests(req: AuthRequest, res: Response) {
    try {
      const { managerId } = req.params;
      const requests =
        await this.employeeService.getAccountManagerPendingRequests(managerId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching account manager pending requests",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Create a new refund request
   */
  async createRequest(req: AuthRequest, res: Response) {
    try {
      const { title, description, amount, employeeId } = req.body;
      const attachment = req.file ? req.file.path : null;
      const request = await this.employeeService.refundRequest({
        title,
        description,
        amount: parseFloat(amount),
        attachment,
        employeeId,
      });
      res.status(201).json(request);
    } catch (error) {
      res.status(500).json({
        message: "Error creating request",
        error: (error as Error).message,
      });
    }
  }

  /**
   * Update refund request status (approve/reject)
   */
  async updateRequestStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (status === "Rejected") {
        const updatedRequest = await this.refundRequestService.rejectRequest(
          id
        );
        res.json(updatedRequest);
        return;
      }

      const updatedRequest = await this.refundRequestService.approveRequest(
        id,
        status
      );
      res.json(updatedRequest);
    } catch (error) {
      res.status(500).json({
        message: "Error updating request status",
        error: (error as Error).message,
      });
    }
  }
}

export default RefundRequestController;
