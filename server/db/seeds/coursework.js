/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('coursework').del()
  await knex('coursework').insert([
    {
      title: 'Design a relational DB - (Assignment)',
      unit: 'Unit 5 - Databases',
      status: 'Submitted - Awaiting results',
      priority: 'High',
      due_date: '2026-04-05',
      notes: 'Submitted late, Jatin is aware.',
    },
    { title: 'JWT challenge polish (for assignment)',
      unit: 'Unit 6 - JWT and Auth',
      status: 'Incomplete',
      priority: 'High',
      due_date: '2026-05-17',
      notes: 'Read assignment card (WD05) in assessment tracker and polish jwt-auth for submission.',
    },
    {
      title: 'dreamfest polish (for assignment)',
      unit: 'Unit 6 - JWT and Auth',
      status: 'Incomplete',
      priority: 'High',
      due_date: '2026-05-17',
      notes: 'Read assignment card (CP02) in assessment tracker and polish dreamfest for submission.',
    }
  ]);
};
