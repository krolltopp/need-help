import * as mongoose from 'mongoose';

interface IAccidentDoc extends mongoose.Document {
  type: string;
  severity: string;
  date: Date;
  user: mongoose.Types.ObjectId;
}

const accidentSchema = new mongoose.Schema({
  type: String,
  severity: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Types.ObjectId, ref: 'user'},
}, { timestamps: true });

const AccidentModel = mongoose.model<IAccidentDoc>('accident', accidentSchema);

export { IAccidentDoc, AccidentModel };
