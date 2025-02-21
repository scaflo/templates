import mongoose from "mongoose";
import { Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    userType: string;
    userStatus: string;
    profilePhoto: string;
    token: string;
}
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.model.d.ts.map