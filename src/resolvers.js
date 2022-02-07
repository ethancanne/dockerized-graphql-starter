import { Post } from "./models/Post";
export const resolvers = {
  Query: {
    hello: () => "hello There",
    getAllPosts: async () => {
      return await Post.find();
    },
    getPost: async (_, { id }) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, body } = args.post;
      const post = new Post({ title, body });
      return await post.save();
    },

    deletePost: async (_, { id }) => {
      await Post.findByIdAndDelete(id);
      return "Post deleted";
    },

    updatePost: async (_, args) => {
      const { id } = args;
      const { title, body } = args;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }
      if (body !== undefined) {
        updates.body = body;
      }

      await Post.findByIdAndUpdate(id, updates);
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      return post;
    },
  },
};
