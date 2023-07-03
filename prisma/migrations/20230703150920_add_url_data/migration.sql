-- CreateTable
CREATE TABLE "UrlData" (
    "id" TEXT NOT NULL,
    "displayId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "creator_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UrlData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlData_displayId_key" ON "UrlData"("displayId");

-- AddForeignKey
ALTER TABLE "UrlData" ADD CONSTRAINT "UrlData_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
