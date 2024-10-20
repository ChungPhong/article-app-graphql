import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
  //TẤT CẢ CÁC ĐOẠN CODE NÀY DÙNG ĐỂ VIẾT RA CÁC HÀM LẤY RA CÁC BÀI VIẾT
  Query: {
    getListArticle: async (_, args) => {
      const { sortKey, sortValue } = args;
      // Sắp xếp
      const sort = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      // Hết Sắp xếp
      const articles = await Article.find({
        deleted: false,
      }).sort(sort);
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
