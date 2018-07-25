const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({
  name: String,
  description: String,
  features: Object,
  typesOfApartments: Array,
  videoUrl: String,
  image360Url: String,
  images: Array,
  address: Object,
  date: Date,
  star: Boolean,
  type: String
});

const ourProjects = mongoose.model('ourProjects', projectsSchema);

module.exports = ourProjects;
