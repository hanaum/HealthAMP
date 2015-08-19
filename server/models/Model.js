var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  weight: Number,
  tracked_weight: Number,
  plans: [{type: Schema.Types.ObjectId, ref: 'Plan'}],
  created_at: {type: Date, default: new Date},
  updated_at: {type: Date, default: new Date}
}, {versionKey: false});

var PlanSchema = new mongoose.Schema({
  _user: {type: Schema.ObjectId, ref: 'User'},
  title: String,
  description: String,
  todo: [{type: Schema.Types.ObjectId, ref: 'Todo'}],
  created_at: {type: Date, default: new Date},
  updated_at: {type: Date, default: new Date}
}, {versionKey: false});

var TodoSchema = new mongoose.Schema({
  _plan: {type: Schema.ObjectId, ref: 'Plan'},
  _goal: {type: Schema.ObjectId, ref: 'Goal'},
  title: String,
  description: String,
  created_at: {type: Date, default: new Date},
  updated_at: {type: Date, default: new Date}
}, {versionKey: false});

var GoalSchema = new mongoose.Schema({
  todo: [{type: Schema.ObjectId, ref: 'Todo'}],
  created_at: {type: Date, default: new Date},
  updated_at: {type: Date, default: new Date}
}, {versionKey: false});

mongoose.model('User', UserSchema);
mongoose.model('Plan', PlanSchema);
mongoose.model('Todo', TodoSchema);
mongoose.model('Goal', GoalSchema);

