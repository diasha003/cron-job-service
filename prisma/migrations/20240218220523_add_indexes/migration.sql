-- CreateIndex
CREATE INDEX "Info_from_currency_idx" ON "Info" USING HASH ("from_currency");

-- CreateIndex
CREATE INDEX "Info_to_currency_idx" ON "Info" USING HASH ("to_currency");

-- CreateIndex
CREATE INDEX "Info_timestamp_idx" ON "Info" USING HASH ("timestamp");
