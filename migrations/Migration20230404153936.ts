import { Migration } from "@mikro-orm/migrations";

export class Migration20230404153936 extends Migration {

  async up(): Promise<void> {
    this.addSql("create table \"roles\" (\"id\" bigserial primary key, \"created\" timestamptz(0) not null, \"updated\" timestamptz(0) not null, \"type\" smallint not null, \"name\" varchar(255) not null, \"permissions\" text[] not null, \"is_default\" boolean not null);");
    this.addSql("create index \"ix_roles_type\" on \"roles\" (\"type\");");
    this.addSql("create index \"ix_roles_default_role\" on \"roles\" (\"type\", \"is_default\");");
    this.addSql("alter table \"roles\" add constraint \"ix_roles_name\" unique (\"name\");");

    this.addSql("create table \"users\" (\"id\" uuid not null, \"created\" timestamptz(0) not null, \"updated\" timestamptz(0) not null, \"email\" varchar(255) not null, \"phone\" varchar(255) null, \"password\" varchar(255) not null, \"status\" text check (\"status\" in ('active', 'inactive')) not null, constraint \"users_pkey\" primary key (\"id\"));");
    this.addSql("create index \"ix_user_phone_acc\" on \"users\" (\"phone\", \"password\");");
    this.addSql("create index \"ix_user_email_acc\" on \"users\" (\"email\", \"password\");");
    this.addSql("alter table \"users\" add constraint \"ix_user_phone\" unique (\"phone\");");
    this.addSql("alter table \"users\" add constraint \"ix_user_email\" unique (\"email\");");

    this.addSql("create table \"user_roles\" (\"user_id\" uuid not null, \"role_id\" bigint not null, constraint \"user_roles_pkey\" primary key (\"user_id\", \"role_id\"));");

    this.addSql("alter table \"user_roles\" add constraint \"user_roles_user_id_foreign\" foreign key (\"user_id\") references \"users\" (\"id\") on update cascade;");
    this.addSql("alter table \"user_roles\" add constraint \"user_roles_role_id_foreign\" foreign key (\"role_id\") references \"roles\" (\"id\") on update cascade;");
  }

  async down(): Promise<void> {
    this.addSql("alter table \"user_roles\" drop constraint \"user_roles_role_id_foreign\";");

    this.addSql("alter table \"user_roles\" drop constraint \"user_roles_user_id_foreign\";");

    this.addSql("drop table if exists \"roles\" cascade;");

    this.addSql("drop table if exists \"users\" cascade;");

    this.addSql("drop table if exists \"user_roles\" cascade;");
  }

}
