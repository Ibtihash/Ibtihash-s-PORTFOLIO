
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
