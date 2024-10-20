import { generateRandomString } from "../helpers/generate.helper";
import User from "../models/user.model";
import md5 from "md5";
export const resolversUser = {
  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args;
      const existUser = await User.findOne({
        email: user.email,
        deleted: false,
      });

      if (existUser) {
        return {
          code: 400,
          message: "Email đã tồn tại!",
        };
      }

      const token = generateRandomString(30);

      const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: md5(user.password),
        token: token,
      };

      const newUser = new User(dataUser);
      await newUser.save();

      return {
        code: 200,
        message: "Đăng ký thành công!",
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        token: newUser.token,
      };
    },
    login: async (_, args) => {
      const { user } = args;
      const email: string = user.email;
      const password: string = user.password;
      const existUser = await User.findOne({
        email: email,
        deleted: false,
      });
      if (!existUser) {
        return {
          code: 400,
          message: "Email không tồn tại!",
        };
      }
      if (md5(password) != existUser.password) {
        return {
          code: 400,
          message: "Sai mật khẩu!",
        };
      }
      return {
        id: existUser.id,
        fullName: existUser.fullName,
        email: existUser.email,
        token: existUser.token,
        code: 200,
        message: "Đăng nhập thành công!",
      };
    },
  },
};
