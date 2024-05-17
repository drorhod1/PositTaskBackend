import { PrismaClient } from "@prisma/client";

export class DbService {
  static dbService;
  constructor() {}

  static getInstance() {
    if (this.dbService) {
      return this.dbService;
    } else {
      return (this.dbService = new PrismaClient());
    }
  }
}
