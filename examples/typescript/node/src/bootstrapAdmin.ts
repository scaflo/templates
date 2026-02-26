// import bcrypt from "bcrypt";
// // import { USER_ROLE, USER_STATUS } from "./constants/user.constant.js";
// import envConfig from "./config/env.config.js";
// import { UserModel } from "$/models/User.model.js";

// export const bootstrapAdmin = async (): Promise<void> => {
//   try {
//     // Check if super admin exists
//     const existingAdmin = await UserModel.findOne({
//       role: USER_ROLE.SUPER_ADMIN,
//     });
//     if (existingAdmin) {
//       console.log("Super Admin already exists ✅");
//       return;
//     }

//     const email = envConfig.SUPER_ADMIN_EMAIL;
//     const password = envConfig.SUPER_ADMIN_PASSWORD;
//     const name = "Super Admin";
//     const phone = envConfig.SUPER_ADMIN_PHONE;

//     if (!email || !password) {
//       console.error(
//         "SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD is missing in env",
//       );
//       process.exit(1);
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const adminUser = await UserModel.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: USER_ROLE.SUPER_ADMIN,
//       userStatus: USER_STATUS.ACTIVE,
//       refreshTokens: [],
//     });

//     console.log("Super Admin CREATED ✅", adminUser);
//     console.log(`Admin email: ${email}`);
//   } catch (err) {
//     console.error("Error bootstrapping super admin:", err);
//     process.exit(1);
//   }
// };
