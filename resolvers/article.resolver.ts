import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
  //TẤT CẢ CÁC ĐOẠN CODE NÀY DÙNG ĐỂ VIẾT RA CÁC HÀM LẤY RA CÁC BÀI VIẾT
  Query: {
    getListArticle: async (_, args) => {
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItems,
        filterKey,
        filterValue,
        keyword,
      } = args;

      const find = {
        deleted: false,
      };

      // Sắp xếp
      const sort = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      // Hết Sắp xếp

      // Phân trang
      const skip: number = (currentPage - 1) * limitItems;
      // Hết Phân trang

      // Bộ Lọc
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }
      // Hết Bộ Lọc

      // Tìm kiếm
      if (keyword) {
        const regex = new RegExp(keyword, "i");
        find["title"] = regex;
      }
      // Hết Tìm kiếm

      const articles = await Article.find(find)
        .sort(sort)
        .limit(limitItems)
        .skip(skip);
      return articles;
    },

    getArticle: async (_, args) => {
      const { id } = args;
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
  },
  Article: {
    category: async (article) => {
      const record = await Category.findOne({
        _id: article.categoryId,
        deleted: false,
      });
      return record;
    },
  },
  //TẤT CẢ CÁC ĐOẠN CODE NÀY DÙNG ĐỂ THÊM SỬA XÓA
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;

      const record = new Article(article);
      await record.save();

      return record;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;

      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      return "ĐÃ XÓA!";
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;

      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        article
      );
      const newArticle = await Article.findOne({
        _id: id,
        deleted: false,
      });
      return newArticle;
    },
  },
};
