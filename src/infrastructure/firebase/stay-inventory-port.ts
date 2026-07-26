import type { InventoryReservationRepository } from "@/features/stays/inventory";
export interface FirebaseTransactionRunner {
  runTransaction<T>(operation: () => Promise<T>): Promise<T>;
}
export interface StayInventoryProviderFactory {
  create(
    transactionRunner: FirebaseTransactionRunner,
  ): InventoryReservationRepository;
}
