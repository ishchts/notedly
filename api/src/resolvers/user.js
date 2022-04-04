module.exports = {
  notes: async (user, args, { models }) => {
    return await models.Note.find({ author: user._id }).sort({ _id: -1 })
  },
  favorites: async (user, args, { models }) => {
    return await models.Note.find({ favoriteBy: user._id }).sort({ _id: -1 })
  }
}
