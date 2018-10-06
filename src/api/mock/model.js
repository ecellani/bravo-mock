import mongoose, { Schema } from 'mongoose'

const mockSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    // type: String
    type: Schema.Types.Mixed
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

mockSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy.view(full),
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  },
  customView (full) {
    const view = this.body
    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Mock', mockSchema)

export const schema = model.schema
export default model
