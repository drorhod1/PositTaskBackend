import express from "express";
import userRoutes from "./router/user.routes.js";
import ticketRoutes from "./router/ticket.routes.js";
import warehouseRoutes from "./router/warehouse.route.js";
import customerRoutes from "./router/customer.route.js";
import cors from "cors";

const app = express();
const port = "4000";
app.use(cors());

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/customers", customerRoutes);

app.listen(port, () => {
  console.log(`Server is online port ${port}`);
});
