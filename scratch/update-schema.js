const fs = require('fs');
let schema = fs.readFileSync('frontend/prisma/schema.prisma', 'utf8');

// 1. Add CommunityTier and MembershipStatus enums
const enums = `
enum CommunityTier {
  included_trial
  monthly
  six_month
  annual
}

enum MembershipStatus {
  pending_payment
  active
  lapsed
  cancelled
}

model CommunityMembership {
  id          String           @id @default(uuid())
  memberName  String           @map("member_name")
  memberEmail String           @map("member_email")
  memberPhone String           @map("member_phone")
  tier        CommunityTier
  status      MembershipStatus @default(pending_payment)
  startedAt   DateTime?        @map("started_at")
  renewsAt    DateTime?        @map("renews_at")
  createdAt   DateTime         @default(now()) @map("created_at")
  updatedAt   DateTime         @updatedAt @map("updated_at")

  payment     Payment?

  @@map("community_memberships")
}
`;

// 2. Modify Payment model to make bookingId optional and add membershipId
schema = schema.replace(
  '  bookingId                String        @unique @map("booking_id")\n  booking                  Booking       @relation(fields: [bookingId], references: [id])',
  `  bookingId                String?       @unique @map("booking_id")\n  booking                  Booking?      @relation(fields: [bookingId], references: [id])\n  membershipId             String?       @unique @map("membership_id")\n  membership               CommunityMembership? @relation(fields: [membershipId], references: [id])`
);

// Append the new models at the end
schema += enums;

fs.writeFileSync('frontend/prisma/schema.prisma', schema);
