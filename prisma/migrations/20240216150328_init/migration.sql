-- CreateTable
CREATE TABLE "Info" (
    "id" UUID NOT NULL,
    "from_currency" TEXT NOT NULL,
    "to_currency" TEXT NOT NULL,
    "buy" DECIMAL(25,15) NOT NULL,
    "sell" DECIMAL(25,15) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id","from_currency")
)  PARTITION BY HASH ("from_currency");


CREATE TABLE "Info_part_1" PARTITION OF "Info"
    FOR VALUES WITH (modulus 3, remainder 0);

CREATE TABLE "Info_part_2"  PARTITION OF "Info"
    FOR  VALUES WITH (modulus 3, remainder 1);

CREATE TABLE "Info_part_3"  PARTITION OF "Info"
     FOR VALUES WITH (modulus 3, remainder 2);
