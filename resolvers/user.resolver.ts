import { generateRandomString } from "../helpers/generate.helper";
import User from "../models/user.model";
import md5 from "md5";
export const resolversUser = {

  Query: {
    getUser: async (_, args) => {
      try {
        const { id } = args;
        const user = await User.findOne({
          _id: id,
          deleted: false
        });
        if(user) {
          return {
            code: 200,
            message: "Lấy thông tin thành công!",
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            token: user.token,
          }
        } else {
          return {
            code: 400,
            message: "Id không tồn tại!"
          }
        }
      } catch (error) {
        return {
          code: 400,
          message: "Id không đúng định dạng!"
        }
      }
    }
  },

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
