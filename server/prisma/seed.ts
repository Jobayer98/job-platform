import {prisma} from "../src/config/database"

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();

  // Create sample jobs
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Senior Full Stack Developer',
        company: 'Tech Corp',
        location: 'Remote',
        category: 'Engineering',
        description: 'We are looking for an experienced full stack developer to join our team. Must have 5+ years of experience with React, Node.js, and PostgreSQL.',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Frontend Developer',
        company: 'Design Studio',
        location: 'New York, NY',
        category: 'Engineering',
        description: 'Join our creative team as a frontend developer. Experience with React, TypeScript, and modern CSS frameworks required.',
      },
    }),
    prisma.job.create({
      data: {
        title: 'DevOps Engineer',
        company: 'Cloud Solutions Inc',
        location: 'San Francisco, CA',
        category: 'Operations',
        description: 'Seeking a DevOps engineer with experience in AWS, Docker, Kubernetes, and CI/CD pipelines.',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Product Manager',
        company: 'Startup Ventures',
        location: 'Remote',
        category: 'Product',
        description: 'Looking for a product manager to lead our product development efforts. Experience in agile methodologies required.',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Data Scientist',
        company: 'Analytics Pro',
        location: 'Boston, MA',
        category: 'Data',
        description: 'Join our data science team. Must have strong Python skills and experience with machine learning frameworks.',
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
        coverNote: 'I am very interested in this position and believe my experience aligns well with your requirements.',
      },
    }),
    prisma.application.create({
      data: {
        jobId: jobs[0].id,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        resumeLink: 'https://example.com/resumes/jane-smith.pdf',
        coverNote: 'With 7 years of full stack development experience, I would be a great fit for this role.',
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
  ]);

  console.log(`Created ${applications.length} applications`);
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
