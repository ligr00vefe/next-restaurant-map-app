/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Store";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" SERIAL NOT NULL,
    "phone" TEXT,
    "gugun" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "name" TEXT,
    "category" TEXT,
    "menu" TEXT,
    "description" TEXT,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "like" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "refresh_token_expires_in" INTEGER,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "like_userId_storeId_idx" ON "like"("userId", "storeId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
