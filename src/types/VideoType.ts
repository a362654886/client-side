export type Video = {
  _id: string;
  userId: string;
  anime: string;
  link: string;
  title: string;
  type: VideoType;
  uploadTime: Date;
  userAvatar: string;
  userName: string;
  userCountry?: string;
  hide: boolean;
};

export enum VideoType {
  Embed = "Embed",
  Link = "Link",
  LinkError = "LinkError",
}
