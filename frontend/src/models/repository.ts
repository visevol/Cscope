export default interface Repository {
  id: number;
  name: string;
  domain: string;
  path: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  last_synced_at: Date;
}
