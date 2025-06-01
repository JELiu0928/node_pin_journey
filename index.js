import express from "express";
import cors from "cors";
import travelLogsRoutes from "./routes/travelLogs.js"; // 引入你的路由檔案
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
const port = 3000;

const app = express();
// console.log(cors)
// 允許來自所有網域的跨域請求 (僅用於開發環境)
app.use(cors());
app.use(express.json()); // 解析 JSON 請求體

// 只允許來自特定網域的跨域請求 (生產環境)
// const corsOptions = {
// 	origin: "https://jeliu0928.github.io",
// };
// app.use(cors(corsOptions));
const allowedOrigins = ["https://jeliu0928.github.io", "http://localhost:5173"];

const corsOptions = {
	origin: function (origin, callback) {
		// 如果是沒有來源（像 Postman、server 端請求），也允許
        // Postman 或 server 端發出請求，通常沒有這個 Origin 標頭，所以 origin 會是 undefined 或 null。
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};
app.use(cors(corsOptions));
app.use("/api", travelLogsRoutes);

app.listen(process.env.PORT || 3000, () => {
	console.log("server已啟動");
});
