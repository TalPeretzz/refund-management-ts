import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import RefundRequestService from "../services/RefundRequestService";

class RefundRequestController {
  private refundRequestService: RefundRequestService;

  constructor(refundRequestService: RefundRequestService) {
    this.refundRequestService = refundRequestService;
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
      const requests = await this.refundRequestService.getAllRequests(
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
      const requests = await this.refundRequestService.getRequestsByEmployee(
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
      const requests =
        await this.refundRequestService.getManagerPendingRequests(managerId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching manager pending requests",
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
      const attachment = req.file ? req.file : null;
      const request = await this.refundRequestService.createRequest({
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
      const updatedRequest =
        await this.refundRequestService.updateRequestStatus(id, status);
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
