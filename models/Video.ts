import mongoose, { model, models } from "mongoose";

export const Video_Dimension = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoURL: string;
  controls?: boolean;
  thumbnailURL: string;
  transformation?: {
    width: number;
    height: number;
    quality: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    thumbnailURL: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: {
        type: Number,
        default: Video_Dimension.height,
      },
      width: {
        type: Number,
        default: Video_Dimension.width,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  { timestamps: true }
);

export const videoModel = models.Video || model<IVideo>("Video", videoSchema);
