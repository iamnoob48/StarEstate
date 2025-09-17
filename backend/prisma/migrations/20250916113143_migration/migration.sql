-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "area" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "balconies" INTEGER,
ADD COLUMN     "bathrooms" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bedrooms" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "floor" INTEGER,
ADD COLUMN     "furnishing" TEXT,
ADD COLUMN     "parking" TEXT,
ADD COLUMN     "totalFloors" INTEGER;
