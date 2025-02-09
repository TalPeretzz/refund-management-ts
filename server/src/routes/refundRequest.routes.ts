import express from "express";
import RefundRequestController from "../controllers/RefundRequestController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import RefundRequestService from "../services/RefundRequestService";
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();
const refundRequestService = new RefundRequestService();
const refundRequestController = new RefundRequestController(
  refundRequestService
);

router.get("/", authenticateJWT, (req, res) =>
  refundRequestController.getAllRequests(req, res)
);
router.get("/:employeeId", authenticateJWT, (req, res) =>
  refundRequestController.getRequestsByEmployee(req, res)
);
router.get("/:managerId/manager-pending", authenticateJWT, (req, res) =>
  refundRequestController.getManagerPendingRequests(req, res)
);
router.post("/", authenticateJWT, upload.single("attachment"), (req, res) =>
  refundRequestController.createRequest(req, res)
);
router.put("/:id", authenticateJWT, (req, res) =>
  refundRequestController.updateRequestStatus(req, res)
);

export default router;
