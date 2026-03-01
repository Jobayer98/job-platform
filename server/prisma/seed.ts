import { prisma } from '../src/config/database';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create sample admin users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@jobplatform.com',
      password: hashedPassword,
      role: 'admin',
    },
  })


  // Create sample jobs with user relationships
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Senior Full Stack Developer',
        company: 'Tech Corp',
        location: 'Remote',
        category: 'Engineering',
        description:
          'We are looking for an experienced full stack developer to join our team. Must have 5+ years of experience with React, Node.js, and PostgreSQL.',
        userId: users.id,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Frontend Developer',
        company: 'Design Studio',
        location: 'New York, NY',
        category: 'Engineering',
        description:
          'Join our creative team as a frontend developer. Experience with React, TypeScript, and modern CSS frameworks required.',
        userId: users.id,
      },
    }),
    prisma.job.create({
      data: {
        title: 'DevOps Engineer',
        company: 'Cloud Solutions Inc',
        location: 'San Francisco, CA',
        category: 'Operations',
        description:
          'Seeking a DevOps engineer with experience in AWS, Docker, Kubernetes, and CI/CD pipelines.',
        userId: users.id,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Product Manager',
        company: 'Startup Ventures',
        location: 'Remote',
        category: 'Product',
        description:
          'Looking for a product manager to lead our product development efforts. Experience in agile methodologies required.',
        userId: users.id,
      },
    }),
    prisma.job.create({
      data: {
        title: 'Data Scientist',
        company: 'Analytics Pro',
        location: 'Boston, MA',
        category: 'Data',
        description:
          'Join our data science team. Must have strong Python skills and experience with machine learning frameworks.',
        userId: users.id,
      },
    }),
  ]);

  console.log(`Created ${jobs.length} jobs`);

  // Create sample applications
  const applications = await Promise.all([
    prisma.application.create({
      data: {
        jobId: jobs[0].id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        resumeLink: 'https://example.com/resumes/john-doe.pdf',
        coverNote:
          'I am very interested in this position and believe my experience aligns well with your requirements.',
      },
    }),
    prisma.application.create({
      data: {
        jobId: jobs[0].id,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        resumeLink: 'https://example.com/resumes/jane-smith.pdf',
        coverNote:
          'With 7 years of full stack development experience, I would be a great fit for this role.',
      },
    }),
    prisma.application.create({
      data: {
        jobId: jobs[1].id,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        resumeLink: 'https://example.com/resumes/mike-johnson.pdf',
      },
    }),
    prisma.application.create({
      data: {
        jobId: jobs[2].id,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        resumeLink: 'https://example.com/resumes/emily-davis.pdf',
        coverNote: 'I have 5 years of DevOps experience and would love to join your team.',
      },
    }),
  ]);

  console.log(`Created ${applications.length} applications`);
  console.log('\n=== Seed Summary ===');
  console.log(`Jobs: ${jobs.length}`);
  console.log(`Applications: ${applications.length}`);
  console.log('\n=== Test Credentials ===');
  console.log('  - admin@jobplatform.com / password123');
  console.log('  - john.smith@jobplatform.com / password123');
  console.log('  - sarah@jobplatform.com / password123');
  console.log('\nSeed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
