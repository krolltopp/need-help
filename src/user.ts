import * as mongoose from 'mongoose';

interface IUserDoc extends mongoose.Document {
  userName: string;
  locationDate?: Date;
  location?: number[];
  accident?: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  locationDate: { type: Date },
  location: {
    type: [Number], // lng, lat
    index: '2dsphere',
  },
  accident: { type: mongoose.Schema.Types.ObjectId, ref: 'accident'},
}, { timestamps: true });

const UserModel = mongoose.model<IUserDoc>('user', userSchema);

export { IUserDoc, UserModel };
