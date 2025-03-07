-- CreateTable
CREATE TABLE "Change" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "externalKey" TEXT,
    "externalNodeId" TEXT,
    "title" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "resolution" TEXT,
    "creatorId" INTEGER NOT NULL,
    "externalUrl" TEXT NOT NULL,
    "externalCreatedAt" INTEGER NOT NULL,
    "externalUpdatedAt" INTEGER NOT NULL,
    "externalResolvedAt" INTEGER,
    "branchNameHead" TEXT,
    "branchNameBase" TEXT,
    "repositoryId" INTEGER,
    "sourceId" INTEGER NOT NULL,
    "resolutionTime" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Change_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "People" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Change_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Change_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "SourceTool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "language" TEXT,
    "defaultBranch" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "People" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "externalUrl" TEXT,
    "name" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SourceTool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_ChangeToLabel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ChangeToLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "Change" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ChangeToLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "Label" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Change_externalId_key" ON "Change"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Change_externalKey_key" ON "Change"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "Change_externalNodeId_key" ON "Change"("externalNodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Change_externalUrl_key" ON "Change"("externalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_externalId_key" ON "Repository"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_fullName_key" ON "Repository"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_url_key" ON "Repository"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- CreateIndex
CREATE UNIQUE INDEX "People_externalId_key" ON "People"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "SourceTool_name_key" ON "SourceTool"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ChangeToLabel_AB_unique" ON "_ChangeToLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_ChangeToLabel_B_index" ON "_ChangeToLabel"("B");
