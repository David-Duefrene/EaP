create table if not exists bloodlines (
	bloodline_id integer not null,
	charisma integer not null,
	corporation_id integer not null,
	description text not null,
	intelligence integer not null,
	memory integer not null,
	name text not null,
	perception integer not null,
	race_id integer not null,
	ship_type_id integer,
	willpower integer not null,
	
	primary key (bloodline_id)
);

create table if not exists races (
	alliance_id integer not null,
	description text not null,
	name text not null,
	race_id integer not null,

	primary key (race_id)
)
