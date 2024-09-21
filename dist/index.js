"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const tweet_routes_1 = __importDefault(require("./routes/tweet.routes"));
const follower_routes_1 = __importDefault(require("./routes/follower.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const reply_routes_1 = __importDefault(require("./routes/reply.routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use('/users', (0, user_routes_1.default)());
app.use('/auth', (0, auth_routes_1.default)());
app.use('/tweet', (0, tweet_routes_1.default)());
app.use('/follower', (0, follower_routes_1.default)());
app.use('/likes', (0, like_routes_1.default)());
app.use('/replies', (0, reply_routes_1.default)());
