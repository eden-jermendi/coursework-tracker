/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('coursework', (table) => {
    table.increments('id').primary()

    table.string('title').notNullable()
    table.string('unit').notNullable()
    table.string('status').notNullable()
    table.string('priority').notNullable()

    table.date('due_date')
    table.text('notes')

    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('coursework')
};
