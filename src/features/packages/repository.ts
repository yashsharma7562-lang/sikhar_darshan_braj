import type { PackageRecord } from "./types";
export interface PackageRepository {
  listVerified(): Promise<readonly PackageRecord[]>;
  getBySlug(slug: string): Promise<PackageRecord | null>;
}
class EmptyVerifiedPackageRepository implements PackageRepository {
  async listVerified() {
    return [];
  }
  async getBySlug() {
    return null;
  }
}
export const packageRepository: PackageRepository =
  new EmptyVerifiedPackageRepository();
