const fs = require('fs');
let schema = fs.readFileSync('frontend/prisma/schema.prisma', 'utf8');

schema = schema.replace(
  '  memberName  String           @map("member_name")',
  '  tallySubmissionId String     @unique @map("tally_submission_id")\n  memberName  String           @map("member_name")'
);

fs.writeFileSync('frontend/prisma/schema.prisma', schema);
