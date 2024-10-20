import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  //TẤT CẢ CÁC ĐOẠN CODE NÀY DÙNG ĐỂ VIẾT RA CÁC HÀM LẤY RA CÁC BÀI VIẾT
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false,
      });
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
    getListCategory: async () => {
      const category = await Category.find({
        deleted: false,
      });
      return category;
    },
    getCategory: async (_, args) => {
      const { id } = args;
      const category = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },
  Article: {
    category: async (article) => {
      const record = await Category.findOne({
        _id: article.categoryId,
        deleted: false
      });
      return record;
    }
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
    createCategory: async (_, args) => {
      const { category } = args;
      const record = new Category(category);
      await record.save();
      return record;
    },
    updateCategory: async (_, args) => {
      const { id, category } = args;
      await Category.updateOne(
        {
          _id: id,
          deleted: false,
        },
        category
      );
      const newCategory = await Category.findOne({
        _id: id,
        deleted: false,
      });
      return newCategory;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;

      await Category.updateOne(
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
  },
};
