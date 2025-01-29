import mongoose from 'mongoose';

const subTodoSchema = new mongoose.Schema({
   content: {
      type: String,
      required: true
   },
   complete: {
      type: Boolean,
      default: false
   },
   todo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
      required: true
   },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   }
}, { timestamps: true });

export const SubTodo = mongoose.model('SubTodo', subTodoSchema);
