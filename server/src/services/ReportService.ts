import exp from "constants";
import { Op } from "sequelize";
import db from "../models";
import { transformRequest } from "../types/IRequest";

export class ReportService {
  constructor() {}

  async exportReport() {
    // Export report
  }

  async generateReport(startDate?: Date | null, endDate?: Date | null) {
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
}

export default ReportService;
